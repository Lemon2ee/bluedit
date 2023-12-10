import {NextRequest} from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
    req: NextRequest,
    {
        params,
    }: {
        params: { profileID: string };
    },
) {
    const targetProfileID = params.profileID;
    const body = await req.json();
    const {currentProfileID} = body;
    try {
        const updatedFollower = await prisma.profile.update({
            where: {
                id: targetProfileID, // The ID of the profile that is following someone
            },
            data: {
                follower: {
                    push: currentProfileID,
                },
            },
        });
        const updatedFollowing = await prisma.profile.update({
            where: {
                id: currentProfileID, // The ID of the profile that is following someone
            },
            data: {
                following: {
                    push: targetProfileID,
                },
            },
        });
        return Response.json({status: 200});
    } catch (e) {
        return Response.json(
            {message: "Error following others", error: e},
            {status: 500},
        );
    }
}

export async function DELETE(
    req: NextRequest,
    {
        params,
    }: {
        params: { profileID: string };
    },
) {
    const targetProfileID = params.profileID;
    const body = await req.json();
    const {currentProfileID} = body;
    try {
        const currentProfile = await prisma.profile.findUnique({
            where: {id: currentProfileID},
            select: {following: true},
        });

        if (currentProfile && currentProfile.following) {
            // Remove unfollowedId from the following array
            const updatedFollowing = currentProfile.following.filter(id => id !== targetProfileID);

            // Update the following array for the unfollower
            await prisma.profile.update({
                where: {id: currentProfileID},
                data: {following: updatedFollowing},
            });
        }

        // Fetch current followers array for the unfollowed user
        const targetProfile = await prisma.profile.findUnique({
            where: {id: targetProfileID},
            select: {follower: true},
        });

        if (targetProfile && targetProfile.follower) {
            // Remove unfollowerId from the followers array
            const updatedFollowers = targetProfile.follower.filter(id => id !== currentProfileID);

            // Update the followers array for the unfollowed user
            await prisma.profile.update({
                where: {id: targetProfileID},
                data: {follower: updatedFollowers},
            });
        }
        return Response.json({status: 200});
    } catch (e) {
        return Response.json(
            {message: "Error unfollowing others", error: e},
            {status: 500},
        );
    }
}

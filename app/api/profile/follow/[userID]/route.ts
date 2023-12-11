import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prisma";
import {getToken} from "next-auth/jwt";

export async function POST(
    req: NextRequest,
    {
        params,
    }: {
        params: { userID: string };
    },
) {
    const targetUserID = params.userID;
    const token = await getToken({req});
    if (!token || !token.sub)
        return NextResponse.json(
            {
                message: "User is not logged in",
            },
            {
                status: 401,
            },
        );
    const userID = token?.sub;

    try {
        const currentUserProfile = await prisma.profile.findUnique({
            where: {
                userId: userID,
            },
        });

        if (!currentUserProfile) {
            return Response.json(
                {message: "No profile page found"},
                {status: 404},
            );
        }


        const updatedFollower = await prisma.profile.update({
            where: {
                userId: targetUserID,
            },
            data: {
                follower: {
                    push: currentUserProfile.id,
                },
            },
        });

        console.log("processed");

        const updatedFollowing = await prisma.profile.update({
            where: {
                userId: userID,
            },
            data: {
                following: {
                    push: updatedFollower.id,
                },
            },
        });
        return Response.json({status: 200});
    } catch (e) {
        console.log(e);
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
        params: { userID: string };
    },
) {
    const targetUserID = params.userID;
    const token = await getToken({req});
    if (!token || !token.sub)
        return NextResponse.json(
            {
                message: "User is not logged in",
            },
            {
                status: 401,
            },
        );
    const userID = token?.sub;

    try {
        const currentProfile = await prisma.profile.findUnique({
            where: {userId: userID},
            select: {
                id: true,
                following: true,
            },
        });
        const targetProfile = await prisma.profile.findUnique({
            where: {userId: targetUserID},
            select: {
                id: true,
                follower: true,
            },
        });


        if (currentProfile && currentProfile.following) {
            // Remove unfollowedId from the following array
            const updatedFollowing = currentProfile.following.filter(
                (id) => id !== targetProfile?.id,
            );

            // Update the following array for the unfollower
            await prisma.profile.update({
                where: {userId: userID},
                data: {following: updatedFollowing},
            });
        }

        // Fetch current followers array for the unfollowed user

        if (targetProfile && targetProfile.follower) {
            // Remove unfollowerId from the followers array
            const updatedFollowers = targetProfile.follower.filter(
                (id) => id !== currentProfile?.id,
            );

            // Update the followers array for the unfollowed user
            await prisma.profile.update({
                where: {userId: targetUserID},
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

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: { profileID: string };
  },
) {
  const targetProfileID = params.profileID;
  const token = await getToken({ req });
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
        { message: "No profile page found" },
        { status: 404 },
      );
    }

    console.log(targetProfileID);

    const updatedFollower = await prisma.profile.update({
      where: {
        userId: targetProfileID,
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
    return Response.json({ status: 200 });
  } catch (e) {
    console.log(e);
    return Response.json(
      { message: "Error following others", error: e },
      { status: 500 },
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
  const token = await getToken({ req });
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
      where: { userId: userID },
      select: {
        id: true,
        following: true,
      },
    });

    if (currentProfile && currentProfile.following) {
      // Remove unfollowedId from the following array
      const updatedFollowing = currentProfile.following.filter(
        (id) => id !== targetProfileID,
      );

      // Update the following array for the unfollower
      await prisma.profile.update({
        where: { userId: userID },
        data: { following: updatedFollowing },
      });
    }

    // Fetch current followers array for the unfollowed user
    const targetProfile = await prisma.profile.findUnique({
      where: { id: targetProfileID },
      select: { follower: true },
    });

    if (targetProfile && targetProfile.follower) {
      // Remove unfollowerId from the followers array
      const updatedFollowers = targetProfile.follower.filter(
        (id) => id !== currentProfile?.id,
      );

      // Update the followers array for the unfollowed user
      await prisma.profile.update({
        where: { id: targetProfileID },
        data: { follower: updatedFollowers },
      });
    }
    return Response.json({ status: 200 });
  } catch (e) {
    return Response.json(
      { message: "Error unfollowing others", error: e },
      { status: 500 },
    );
  }
}

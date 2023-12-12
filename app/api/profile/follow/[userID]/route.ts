import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: { userID: string };
  },
) {
  // the targetUserID would be the user id of the user that the current user wants to follow
  const targetUserID = params.userID;
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

  // this user id would be the current user's id. who wants to follow the target user
  const userID = token?.sub;

  try {
    const currentUserProfile = await prisma.profile.findUnique({
      where: {
        userId: userID,
      },
    });

    const followUserProfile = await prisma.profile.findUnique({
      where: {
        userId: targetUserID,
      },
    });

    if (!currentUserProfile || !followUserProfile) {
      return Response.json(
        {
          message:
            "No profile page found for current user or request follow user",
        },
        { status: 404 },
      );
    }

    if (targetUserID === userID) {
      return Response.json(
        { message: "Cannot follow yourself" },
        { status: 400 },
      );
    }

    // we will be storing the profile id of both user in the following and follower array.
    if (currentUserProfile.following.includes(followUserProfile.id)) {
      return Response.json({ message: "Already following" }, { status: 400 });
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

    await prisma.profile.update({
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
    params: { userID: string };
  },
) {
  const targetUserID = params.userID;
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
    const targetProfile = await prisma.profile.findUnique({
      where: { userId: targetUserID },
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
        where: { userId: userID },
        data: { following: updatedFollowing },
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
        where: { userId: targetUserID },
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

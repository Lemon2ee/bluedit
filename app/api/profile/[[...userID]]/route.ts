import { getToken } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ProfileData } from "@/lib/type";

const prisma = new PrismaClient();

async function handler(
  req: NextRequest,
  {
    params,
  }: {
    params: { userID: string[] };
  },
) {
  const token = await getToken({ req });

  if (req.method === "GET") {
    let profileUserID = "";

    if (params.userID == undefined) {
      // fetching for logged-in user profile
      if (!token || !token.sub)
        return NextResponse.json(
          {
            message: "User is not logged in",
          },
          {
            status: 401,
          },
        );
      profileUserID = token?.sub;
    } else if (params.userID.length == 1) {
      // get for public profile
      profileUserID = params.userID[0];
    } else if (params.userID.length > 1) {
      // invalid parameters count
      return NextResponse.json(
        {
          message: "Invalid URL parameters count, expecting 0 or 1",
        },
        {
          status: 400,
        },
      );
    }

    if (profileUserID == "") {
      return NextResponse.json(
        {
          message: "Error to update the profile user id",
        },
        {
          status: 500,
        },
      );
    }

    const profile = await prisma.profile.findUnique({
      where: {
        userId: profileUserID,
      },
    });
    return Response.json(profile);
  }

  if (req.method === "POST") {
    const body = await req.json();
    if (!token)
      return NextResponse.json(
        {
          message: "Updating profile is only allowed for logged in user",
        },
        {
          status: 401,
        },
      );

    const userID = token.sub;

    if (!body) {
      return NextResponse.json(
        {
          message: "Bad Request",
        },
        {
          status: 400,
        },
      );
    }

    const updateData: ProfileData = body;

    try {
      const updatedProfile = await prisma.profile.update({
        where: {
          userId: userID,
        },
        data: updateData,
      });

      return NextResponse.json(updatedProfile, { status: 200 });
    } catch (error) {
      console.error("Failed to update profile:", error);
      return NextResponse.json(
        {
          message: "Internal Server Error",
        },
        {
          status: 500,
        },
      );
    }
  }
}

export { handler as GET, handler as POST };

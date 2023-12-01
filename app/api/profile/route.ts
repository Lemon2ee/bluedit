import { getToken } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ProfileData } from "@/lib/type";

const prisma = new PrismaClient();

async function handler(req: NextRequest) {
  const token = await getToken({ req });
  const userID = token?.sub;

  if (req.method === "GET") {
    const profile = await prisma.profile.findUnique({
      where: {
        userId: userID,
      },
    });
    return Response.json(profile);
  } else if (req.method === "POST") {
    const body = await req.json();

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

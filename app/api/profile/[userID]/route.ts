import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";
import { ProfileData } from "@/lib/type";

export async function GET(
  _req: Request,
  {
    params,
  }: {
    params: {
      userID: string;
    };
  },
) {
  const userID = params.userID;
  if (!userID) return null;
  const profile = await prisma.profile.findUnique({
    where: {
      userId: userID,
    },
  });

  const role = await prisma.user.findUnique({
    where: {
      id: userID,
    },
    select: {
      role: true,
    },
  });

  if (!role)
    return NextResponse.json(
      {
        message: "Unable to fetch user role",
      },
      {
        status: 500,
      },
    );

  const isAdmin = role.role === Role.ADMIN;

  const profileData: ProfileData = {
    ...profile,
    edit: isAdmin,
  };

  return NextResponse.json(profileData, { status: 200 });
}

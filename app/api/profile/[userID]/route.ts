import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";
import { ProfileData } from "@/lib/type";

async function handler(
  req: Request,
  {
    params,
  }: {
    params: {
      userID: string;
    };
  },
) {
  if (req.method === "GET") {
    const userID = params.userID;
    if (!userID)
      return Response.json(
        {
          message: "No user id provided",
        },
        {
          status: 400,
        },
      );
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
      return Response.json(
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

    return Response.json(profileData, { status: 200 });
  }
}

export { handler as GET };

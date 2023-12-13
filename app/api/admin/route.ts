import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/prisma";
import { UserRoleAndProfile } from "@/types/user";

async function handler(req: NextRequest) {
  const token = await getToken({ req });

  if (!token || !token.sub) {
    return Response.json({ message: "User is not logged in" }, { status: 401 });
  }

  const userId = token.sub;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      role: true,
    },
  });

  if (!user) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }

  if (user.role !== "ADMIN") {
    return Response.json({ message: "User is not admin" }, { status: 403 });
  }

  if (req.method === "GET") {
    const users: UserRoleAndProfile[] = await prisma.user.findMany({
      select: {
        id: true,
        role: true,
        profile: {
          select: {
            displayName: true,
            profilePicture: true,
          },
        },
      },
    });

    return Response.json(users);
  } else if (req.method === "POST") {
    const body = await req.json();
    if (!body) {
      return Response.json({ message: "No body provided" }, { status: 400 });
    }
    const usersToUpdate: UserRoleAndProfile[] = body;

    if (!usersToUpdate || usersToUpdate.length === 0) {
      return Response.json(
        { message: "No users provided for update" },
        { status: 400 },
      );
    }

    try {
      const updatedUsers = await Promise.all(
        usersToUpdate.map(async (user) => {
          return prisma.user.update({
            where: { id: user.id },
            data: { role: user.role },
          });
        }),
      );

      return Response.json({
        message: "User roles updated successfully",
        users: updatedUsers,
      });
    } catch (error) {
      if (error instanceof Error) {
        return Response.json(
          { message: "Error updating user roles", error: error.message },
          { status: 500 },
        );
      }
    }
  }
}

export { handler as GET, handler as POST };

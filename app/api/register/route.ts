import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  const { username, password } = body;

  // check if username and password are present
  if (!username || !password) {
    return Response.json({ message: "Missing username or password" });
  }

  // check if username is already taken in database
  const existingUser = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  // if user exists, return error
  if (existingUser) {
    return Response.json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username: username,
      password: hashedPassword,
    },
  });

  const profile = await prisma.profile.create({
    data: {
      user: {
        connect: {
          id: user.id,
        },
      },
      bio: "",
      bannerPicture:
        "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      profilePicture:
        "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg",
      displayName: username,
    },
  });

  if (!profile) {
    return Response.json(
      { message: "Failed to create profile" },
      { status: 500 },
    );
  }

  return Response.json(user);
}

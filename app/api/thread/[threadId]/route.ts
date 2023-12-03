import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  {
    params,
  }: {
    params: { threadID: string };
  },
) {
  const threadId = params.threadID;

  try {
    const thread = await prisma.thread.findUnique({
      where: {
        id: threadId,
      },
      include: {
        author: true,
        comments: true,
      },
    });
    if (thread) {
      return Response.json(thread);
    } else {
      return Response.json({ message: "Post not found" }, { status: 404 });
    }
  } catch (e) {
    return Response.json(
      { message: "Error retrieving post", error: e },
      { status: 500 },
    );
  }
}

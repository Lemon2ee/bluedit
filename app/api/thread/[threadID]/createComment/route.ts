import {getToken} from "next-auth/jwt";
import {NextRequest} from "next/server";
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest,
                           {
                               params,
                           }: {
                               params: { threadID: string };
                           },) {
    const threadID = params.threadID;
    const body = await req.json();
    const {content} = body;
    const token = await getToken({req});
    const userID = token?.sub;

    if (!content) {
        return Response.json({message: 'Unfinished comment, please try again'}, {status: 400});
    }


    try {
        const newComment = await prisma.comment.create({
            data: {
                content: content,
                author: {
                    connect: {id: userID},
                },
                thread: {
                    connect: {id: threadID}
                }
            },
        });
        return Response.json(newComment);
    } catch (error) {
        // Handle or log the error
        return Response.json({message: 'Failed to create new comment'}, {status: 500});
    }
}
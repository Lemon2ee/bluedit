import {getToken} from "next-auth/jwt";
import {NextRequest} from "next/server";
import prisma from '@/lib/prisma';
export async function POST(req: NextRequest) {
    const body = await req.json();
    const {title, content, published} = body;
    const token = await getToken({ req });
    const userID = token?.sub;

    if (!title || !content) {
        return Response.json({message: 'Unfinished thread, please try again'}, {status:400});
    }


    try {
        const newThread = await prisma.thread.create({
            data: {
                title: title,
                content: content,
                published: published,
                author: {
                    connect: { id: userID },
                },
            },
        });
        return Response.json(newThread);
    } catch (error) {
        // Handle or log the error
        return Response.json({message: 'Failed to create new thread'}, {status: 500});
    }
}
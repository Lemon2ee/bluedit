import {NextRequest} from "next/server";
import prisma from '@/lib/prisma';

export async function PUT(
    req: NextRequest,
    {
        params,
    }: {
        params: { threadID: string };
    },) {
    const threadID = params.threadID;
    const body = await req.json();
    const {title, content, published} = body;
    console.log(body)
    try {
        const newThread = await prisma.thread.update({
            where: {
                id: threadID,
            },
            data: {
                title: title,
                content: content,
                published: published,
            },
        })
        return Response.json(newThread);
    } catch (error) {
        // Handle or log the error
        return Response.json({message: 'Failed to update new thread'}, {status: 500});
    }
}
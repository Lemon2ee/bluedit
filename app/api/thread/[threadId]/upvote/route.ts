
import {NextRequest} from "next/server";
import prisma from '@/lib/prisma';

export async function POST(
    _req: NextRequest,
                           {
                               params,
                           }: {
                               params: { threadId: string};
                           },) {
    const threadId = params.threadId;

    try {
        const newThread = await prisma.thread.update({
            where: {
                id: threadId,
            },
            data:{
                upvote: {
                    increment: 1,
    },
            },
            })
        return Response.json({status: 200});
    } catch (error) {
        // Handle or log the error
        return Response.json({message: 'Failed to create new thread'}, {status: 500});
    }
}
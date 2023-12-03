import {NextRequest} from "next/server";
import prisma from '@/lib/prisma';

export async function POST(
    _req: NextRequest,
    {
        params,
    }: {
        params: { threadID: string };
    },) {
    const threadID = params.threadID;

    try {
        const newThread = await prisma.thread.update({
            where: {
                id: threadID,
            },
            data: {
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
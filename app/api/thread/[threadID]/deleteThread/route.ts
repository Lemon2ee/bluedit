import {NextRequest} from "next/server";
import prisma from '@/lib/prisma';

export async function DELETE(
    _req: NextRequest,
    {
        params,
    }: {
        params: { threadID: string };
    },) {
    const threadID = params.threadID;

    try {
        const response = await prisma.thread.delete({
            where: {
                id: threadID,
            },
        })
        return Response.json(response);
    } catch (error) {
        // Handle or log the error
        return Response.json({message: 'Failed to delete this thread'}, {status: 500});
    }
}
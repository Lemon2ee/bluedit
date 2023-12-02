import { PrismaClient } from '@prisma/client';

import {NextRequest} from "next/server";

const prisma = new PrismaClient();

export async function GET(
    req: NextRequest,
    {
        params,
    }: {
        params: { threadId: string};
    },
) {
        const threadId = params.threadId;

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
                return Response.json({ message: 'Post not found' }, {status: 404});
            }
        } catch (e) {
            return Response.json({ message: 'Error retrieving post', error: e}, {status: 500});
        }
    }
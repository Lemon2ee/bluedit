import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Provide a paginated threads based on keyword search.
 * @param req request contains keyword, pageSize, pageRequested. pageRequested starts from 0.
 */
export async function GET(req: Request) {
    const body = await req.json();
    console.log(`Received Search Request: ${body}`)

    const {keyword, pageSize, pageRequested} = body

    const skip = pageRequested * pageSize

    const threads = await prisma.thread.findMany({
        where: {
            title: {
                contains: keyword,
                mode: 'insensitive',
            },
        },
        skip: skip,
        take: pageSize,
    });

    return Response.json(threads)
}
import prisma from '@/lib/prisma';

/**
 * Provide a paginated threads based on keyword search.
 * @param req request contains keyword, pageSize, pageRequested. pageRequested starts from 0.
 */
export async function GET(req: Request) {
    const url = new URL(req.url)
    const keyword = url.searchParams.get('keyword') as string;
    const pageSize = parseInt(url.searchParams.get('pageSize') as string);
    const pageRequested = parseInt(url.searchParams.get('pageRequested') as string);

    const skip = pageRequested * pageSize

    const threads = await prisma.thread.findMany({
        where: {
            title: {
                contains: keyword,
                mode: 'insensitive',
            },
        },
        include: {
            author: {
                include: {
                    profile: true,
                },
            },
        },
        skip: skip,
        take: pageSize,
    });

    return Response.json(threads)
}
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Count the total number of threads matching the keyword search.
 */
export async function GET(req: Request) {
    // Extract the keyword from the query parameters
    const keyword = new URL(req.url).searchParams.get('keyword') as string;
    console.log(`Received Search Request for keyword: ${keyword}`);

    // Use the keyword to count the matching threads
    const count = prisma.thread.count({
        where: {
            title: {
                contains: keyword,
                mode: 'insensitive',
            },
        },
    });
    return Response.json({count: count})
}
import prisma from '@/lib/prisma';

/**
 * Count the total number of threads matching the keyword search.
 */
export async function GET(req: Request) {
    // Extract the keyword from the query parameters
    const keyword = new URL(req.url).searchParams.get('keyword') as string;
    console.log(`Received Search Request for keyword: ${keyword}`);

    // Use the keyword to count the matching threads
    const count = await prisma.thread.count({
        where: {
            AND: [
                {
                    title: {
                        contains: keyword,
                        mode: 'insensitive',
                    },
                },
                {
                    published: true,
                }
            ]
        },
    });

    return Response.json({count})
}
import bcrypt from 'bcrypt';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();
export async function POST(req: Request) {
    const body = await req.json();
    const {title, content, published, authorId} = body;
    console.log(body);

    // check if username and password are present
    if (!title || !content || !authorId) {
        return Response.json({message: 'Unfinished thread, please try again'});
    }


    try {
        const newThread = await prisma.thread.create({
            data: {
                title: title,
                content: content,
                published: published,
                author: {
                    connect: { id: authorId },
                },
            },
        });
        return Response.json(newThread);
    } catch (error) {
        // Handle or log the error
        return Response.json({message: 'Failed to create new thread'});
    }
}
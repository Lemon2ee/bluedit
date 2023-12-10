import {prismaMock} from "./singleton";
import prisma from "./client";

interface CreateThread {
    id: string;
    title: string;
    content: string;
    published: boolean;
    authorId: string;
    upvote: number;
}

interface UpdateThread {
    title?: string;
    content?: string;
    published?: boolean;
}

async function createThread(thread: CreateThread) {
    return prisma.thread.create({
        data: thread,
    });
}

async function getThread(id: string) {
    return prisma.thread.findUnique({
        where: {id},
    });
}

async function updateThread(id: string, data: UpdateThread) {
    return prisma.thread.update({
        where: {id},
        data,
    });
}

async function deleteThread(id: string) {
    return prisma.thread.delete({
        where: {id},
    });
}

describe("thread Tests", () => {
    const currentDate = new Date();
    const thread = {
        id: "thread_id",
        createdAt: currentDate, // Add this line
        title: "Sample thread",
        content: "This is a sample thread",
        published: false,
        authorId: "author_id",
        upvote: 1,
    };

    test("should create new thread", async () => {
        prismaMock.thread.create.mockResolvedValue(thread);
        await expect(createThread(thread)).resolves.toEqual(thread);
    });

    test("should retrieve a thread", async () => {
        prismaMock.thread.findUnique.mockResolvedValue(thread);
        await expect(getThread(thread.id)).resolves.toEqual(thread);
    });

    test("should update a thread", async () => {
        const updatedthreadData = {...thread, title: "Updated Title"};
        prismaMock.thread.update.mockResolvedValue(updatedthreadData);
        await expect(
            updateThread(thread.id, {title: "Updated Title"}),
        ).resolves.toEqual(updatedthreadData);
    });

    test("should deleteThread a thread", async () => {
        prismaMock.thread.delete.mockResolvedValue(thread);
        await expect(deleteThread(thread.id)).resolves.toEqual(thread);
    });

    test("should deleteThread a thread and not find it", async () => {
        const threadId = "thread_id";

        prismaMock.thread.delete.mockResolvedValue(thread);

        await deleteThread(threadId);

        const result = await getThread(threadId);

        expect(result).toBeUndefined();
    });
});

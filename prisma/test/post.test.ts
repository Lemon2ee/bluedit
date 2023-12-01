import { prismaMock } from "./singleton";
import prisma from "./client";

interface CreatePost {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
}

interface UpdatePost {
  title?: string;
  content?: string;
  published?: boolean;
}

async function createPost(post: CreatePost) {
  return prisma.post.create({
    data: post,
  });
}

async function getPost(id: string) {
  return prisma.post.findUnique({
    where: { id },
  });
}

async function updatePost(id: string, data: UpdatePost) {
  return prisma.post.update({
    where: { id },
    data,
  });
}

async function deletePost(id: string) {
  return prisma.post.delete({
    where: { id },
  });
}

describe("Post Tests", () => {
  const currentDate = new Date();
  const post = {
    id: "post_id",
    createdAt: currentDate, // Add this line
    title: "Sample Post",
    content: "This is a sample post",
    published: false,
    authorId: "author_id",
  };

  test("should create new post", async () => {
    prismaMock.post.create.mockResolvedValue(post);
    await expect(createPost(post)).resolves.toEqual(post);
  });

  test("should retrieve a post", async () => {
    prismaMock.post.findUnique.mockResolvedValue(post);
    await expect(getPost(post.id)).resolves.toEqual(post);
  });

  test("should update a post", async () => {
    const updatedPostData = { ...post, title: "Updated Title" };
    prismaMock.post.update.mockResolvedValue(updatedPostData);
    await expect(
      updatePost(post.id, { title: "Updated Title" }),
    ).resolves.toEqual(updatedPostData);
  });

  test("should delete a post", async () => {
    prismaMock.post.delete.mockResolvedValue(post);
    await expect(deletePost(post.id)).resolves.toEqual(post);
  });

  test("should delete a post and not find it", async () => {
    const postId = "post_id";

    prismaMock.post.delete.mockResolvedValue(post);

    await deletePost(postId);

    const result = await getPost(postId);

    expect(result).toBeUndefined();
  });
});

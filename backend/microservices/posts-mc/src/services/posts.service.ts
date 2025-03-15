import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getPosts() {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      content: true,
      createdAt: true,
      author: {
        select: {
          id: true,
          username: true,
          name: true,
        },
      },
      likes: true,
    },
  });
  return posts.map((post) => ({
    ...post,
    likes: post.likes.length,
  }));
}

export async function createPost(content: string, authorId: number) {
  return prisma.post.create({
    data: {
      content,
      authorId,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  });
}
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class PostsQueryFilters {
  authorId?: number;
  id?: number;
};

export async function getPosts(
  filters: PostsQueryFilters = {},
) {
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
      updatedAt: true,
    },
    where: {
      ...filters,
      wasDeleted: false,
    },
    orderBy: {
      createdAt: 'desc',
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

export async function getPost(postId: number) {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
      wasDeleted: false,
    },
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
      updatedAt: true,
    },
  });
  if (!post) {
    throw new Error('Post not found');
  }
  return {
    ...post,
    likes: post.likes.length,
  };
}

export async function updatePost(postId: number, content: string) {
  await getPost(postId);
  return prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      content,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  });
}

export async function deletePost(postId: number) {
  await getPost(postId);
  return prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      wasDeleted: true,
    },
  });
}

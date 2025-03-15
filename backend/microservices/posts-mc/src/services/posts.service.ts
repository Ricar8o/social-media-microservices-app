import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PostsQueryFilters {
  authorId?: number;
  id?: number;
  limit?: number;
  offset?: number;
};

export async function getPosts(
  filters: PostsQueryFilters = {},
) {
  filters = cleanQueryFilters(filters);
  const { limit, offset, ...qryFilters  } = filters;
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
      ...qryFilters,
      wasDeleted: false,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: limit,
    skip: offset
  });
  return posts.map((post: any) => ({
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

export async function getFeed(
  userId: number,
  filters: PostsQueryFilters = {},
) {
  filters = cleanQueryFilters(filters);
  const { limit, offset } = filters;
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
      wasDeleted: false,
      authorId: {
        not: userId,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: limit,
    skip: offset
  });
  return posts.map((post: any) => ({
    ...post,
    likes: post.likes.length,
  }));
}

function cleanQueryFilters(filters: any) {
  const cleanedFilters: any = {};
  const validKeys = [
    'authorId',
    'id',
    'limit',
    'offset',
  ];
  for (const key in filters) {
    if (validKeys.includes(key)) {
      cleanedFilters[key] = +filters[key];
    }
  }
  return cleanedFilters as PostsQueryFilters;
}

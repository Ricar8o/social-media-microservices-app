import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function likePost(postId: number, userId: number) {

  const like = await prisma.like.findFirst({
    where: {
      postId,
      userId,
    },
  });

  if (like) {
    return;
  }
  await prisma.like.create({
    data: {
      postId,
      userId,
    },
  });
}

export async function unlikePost(postId: number, userId: number) {
  await prisma.like.deleteMany({
    where: {
      postId,
      userId,
    },
  });
}
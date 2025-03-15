import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      username: true,
      name: true,
      createdAt: true,
      biography: true,
    },
  });
}

export async function getUser(id: number) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      name: true,
      createdAt: true,
      biography: true,
    },
  });
}
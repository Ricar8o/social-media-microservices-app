import { PrismaClient } from '@prisma/client'
import * as authService from '../services/auth.service';

const prisma = new PrismaClient()


async function main() {
  const hashedPassword = await authService.hashPassword('password');
  const alice = await prisma.user.upsert({
    where: { username: 'alice' },
    update: {},
    create: {
      name: 'Alice',
      username: 'alice',
      passwordHash: hashedPassword,
      posts: {
        createMany: {
          data: [
            { content: 'Hello, World! This is my first post' },
            { content: 'This is my second post' },
            { content: 'This is my third post' },
          ]
        }
      },
    },
  });
  const bob = await prisma.user.upsert({
    where: { username: 'bob' },
    update: {},
    create: {
      name: 'Bob',
      username: 'bob',
      passwordHash: hashedPassword,
      posts: {
        createMany: {
          data: [
            { content: 'Today is a great day!' },
            { content: 'I am new here now!!!' },
          ]
        }
      },
    },
  });
  const charlie = await prisma.user.upsert({
    where: { username: 'charlie' },
    update: {},
    create: {
      name: 'Charlie',
      username: 'charlie',
      passwordHash: hashedPassword,
      posts: {
        create: {
          content: 'I am new here!',
        },
      },
    },
  });

  const megan = await prisma.user.upsert({
    where: { username: 'megan' },
    update: {},
    create: {
      name: 'Megan',
      username: 'megan',
      passwordHash: hashedPassword,
      posts: {
        create: {
          content: 'I am new here!',
        },
      },
    },
  });
  console.log({ alice, bob, charlie, megan })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
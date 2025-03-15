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
        create: {
          content: 'Hello, World! This is my first post',
        },
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
        create: {
          content: 'This is my first post too!',
        },
      },
    },
  });
  console.log({ alice, bob })
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
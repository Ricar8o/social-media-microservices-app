import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY ?? '';

if (!SECRET_KEY) {
  throw new Error('SECRET_KEY is not defined');
}

export async function loginUser(username: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { username },
  });
  if (!user || !await bcrypt.compare(password, user.passwordHash)) {
    throw new Error('Invalid credentials');
  }
  return generateToken(user.id);
};

function generateToken(userId: number) {
  return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '24h' });
};
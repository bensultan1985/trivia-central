import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { prisma } from './prisma'

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required')
}

const SALT_ROUNDS = 10

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET!, { expiresIn: '7d' })
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET!) as { userId: string }
  } catch {
    return null
  }
}

export async function createSession(userId: string): Promise<string> {
  const token = generateToken(userId)
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 7) // 7 days from now
  
  await prisma.session.create({
    data: {
      token,
      userId,
      expiresAt,
    },
  })
  
  return token
}

export async function getSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  
  if (!token) {
    return null
  }
  
  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  })
  
  if (!session || session.expiresAt < new Date()) {
    return null
  }
  
  return session
}

export async function deleteSession(token: string) {
  await prisma.session.delete({
    where: { token },
  })
}

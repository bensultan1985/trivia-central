// DEPRECATED: This route is no longer used. Authentication is now handled by Clerk.
// Kept for backwards compatibility but should not be called by the UI.
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, createSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, username, password } = await request.json()
    
    if (!email || !username || !password) {
      return NextResponse.json(
        { error: 'Email, username, and password are required' },
        { status: 400 }
      )
    }
    
    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    })
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'Registration failed. Please try different credentials.' },
        { status: 409 }
      )
    }
    
    // Create user
    const hashedPassword = await hashPassword(password)
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    })
    
    // Create session
    const token = await createSession(user.id)
    
    // Set cookie
    const response = NextResponse.json(
      { 
        user: { 
          id: user.id, 
          email: user.email, 
          username: user.username 
        } 
      },
      { status: 201 }
    )
    
    response.cookies.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
    
    return response
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { Webhook } from 'svix'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    // Get the webhook secret from environment variables
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET

    if (!webhookSecret) {
      console.error('CLERK_WEBHOOK_SECRET is not set')
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      )
    }

    // Get the headers
    const svix_id = request.headers.get('svix-id')
    const svix_timestamp = request.headers.get('svix-timestamp')
    const svix_signature = request.headers.get('svix-signature')

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return NextResponse.json(
        { error: 'Missing svix headers' },
        { status: 400 }
      )
    }

    // Get the body
    const payload = await request.json()
    const body = JSON.stringify(payload)

    // Create a new Svix instance with your webhook secret
    const wh = new Webhook(webhookSecret)

    let evt: any

    // Verify the webhook signature
    try {
      evt = wh.verify(body, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      }) as any
    } catch (err) {
      console.error('Error verifying webhook:', err)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    // Handle the webhook
    const eventType = evt.type

    if (eventType === 'user.created') {
      const { id, email_addresses, username, first_name, last_name, image_url, phone_numbers } = evt.data

      // Extract primary email
      const primaryEmail = email_addresses?.find((email: any) => email.id === evt.data.primary_email_address_id)
      const emailAddress = primaryEmail?.email_address || email_addresses?.[0]?.email_address

      // Extract primary phone number
      const primaryPhone = phone_numbers?.find((phone: any) => phone.id === evt.data.primary_phone_number_id)
      const phoneNumber = primaryPhone?.phone_number || phone_numbers?.[0]?.phone_number

      // Generate a username if not provided
      const generatedUsername = username || emailAddress?.split('@')[0] || `user_${id.slice(-8)}`

      try {
        // Create user in database
        await prisma.user.create({
          data: {
            clerkUserId: id,
            email: emailAddress || `${id}@clerk.placeholder`,
            username: generatedUsername,
            firstName: first_name || null,
            lastName: last_name || null,
            photoUrl: image_url || null,
            phoneNumber: phoneNumber || null,
          },
        })

        console.log(`User created: ${id}`)
      } catch (error) {
        console.error('Error creating user in database:', error)
        // Don't return error to Clerk if it's a duplicate user
        // This can happen if the webhook is sent multiple times
        if ((error as any).code === 'P2002') {
          console.log('User already exists, skipping')
          return NextResponse.json({ received: true }, { status: 200 })
        }
        throw error
      }
    } else if (eventType === 'user.updated') {
      const { id, email_addresses, username, first_name, last_name, image_url, phone_numbers } = evt.data

      // Extract primary email
      const primaryEmail = email_addresses?.find((email: any) => email.id === evt.data.primary_email_address_id)
      const emailAddress = primaryEmail?.email_address || email_addresses?.[0]?.email_address

      // Extract primary phone number
      const primaryPhone = phone_numbers?.find((phone: any) => phone.id === evt.data.primary_phone_number_id)
      const phoneNumber = primaryPhone?.phone_number || phone_numbers?.[0]?.phone_number

      try {
        // Update user in database
        await prisma.user.update({
          where: { clerkUserId: id },
          data: {
            email: emailAddress || undefined,
            username: username || undefined,
            firstName: first_name || null,
            lastName: last_name || null,
            photoUrl: image_url || null,
            phoneNumber: phoneNumber || null,
          },
        })

        console.log(`User updated: ${id}`)
      } catch (error) {
        console.error('Error updating user in database:', error)
        throw error
      }
    } else if (eventType === 'user.deleted') {
      const { id } = evt.data

      try {
        // Delete user from database
        await prisma.user.delete({
          where: { clerkUserId: id },
        })

        console.log(`User deleted: ${id}`)
      } catch (error) {
        console.error('Error deleting user from database:', error)
        // Don't error if user doesn't exist
        if ((error as any).code === 'P2025') {
          console.log('User not found, skipping')
          return NextResponse.json({ received: true }, { status: 200 })
        }
        throw error
      }
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

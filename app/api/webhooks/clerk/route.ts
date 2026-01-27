import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

function isSchemaMismatchError(error: unknown): boolean {
  const code = (error as any)?.code;
  const message = String((error as any)?.message ?? "");
  // P2022: Column does not exist (DB not migrated / wrong DATABASE_URL)
  if (code === "P2022") return true;
  // Stale Prisma Client can throw messages like "Unknown argument `clerkUserId`".
  if (message.includes("Unknown argument `clerkUserId`")) return true;
  if (message.includes("Unknown field `clerkUserId`")) return true;
  if (message.includes("clerkUserId") && message.includes("Unknown"))
    return true;
  return false;
}

async function tryLinkExistingUserByEmail(params: {
  clerkUserId: string;
  emailAddress?: string;
  username: string;
  firstName?: string | null;
  lastName?: string | null;
  photoUrl?: string | null;
  phoneNumber?: string | null;
}): Promise<boolean> {
  const email = params.emailAddress;
  if (!email) return false;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (!existing) return false;

  await prisma.user.update({
    where: { id: existing.id },
    data: {
      clerkUserId: params.clerkUserId,
      username: params.username,
      firstName: params.firstName ?? null,
      lastName: params.lastName ?? null,
      photoUrl: params.photoUrl ?? null,
      phoneNumber: params.phoneNumber ?? null,
    },
  });

  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get the webhook secret from environment variables
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error("CLERK_WEBHOOK_SECRET is not set");
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 },
      );
    }

    // Get the headers
    const svix_id = request.headers.get("svix-id");
    const svix_timestamp = request.headers.get("svix-timestamp");
    const svix_signature = request.headers.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return NextResponse.json(
        { error: "Missing svix headers" },
        { status: 400 },
      );
    }

    // IMPORTANT: Svix signature verification must use the exact raw payload.
    // Using `request.json()` and re-stringifying can change ordering/spacing and break verification.
    const body = await request.text();

    // Create a new Svix instance with your webhook secret
    const wh = new Webhook(webhookSecret);

    let evt: any;

    // Verify the webhook signature
    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as any;
    } catch (err) {
      console.error("Error verifying webhook:", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Handle the webhook
    const eventType = evt.type;
    const clerkUserId = evt?.data?.id;
    const eventId = evt?.id;
    console.log("Clerk webhook received", { eventType, eventId, clerkUserId });

    // If Clerk didn't include an id, acknowledge to avoid retries.
    if (
      !clerkUserId &&
      (eventType === "user.created" ||
        eventType === "user.updated" ||
        eventType === "user.deleted")
    ) {
      console.error("Clerk webhook missing user id", { eventType, eventId });
      return NextResponse.json({ received: true }, { status: 200 });
    }

    if (eventType === "user.created") {
      const {
        id,
        email_addresses,
        username,
        first_name,
        last_name,
        image_url,
        phone_numbers,
      } = evt.data;

      // Extract primary email
      const primaryEmail = email_addresses?.find(
        (email: any) => email.id === evt.data.primary_email_address_id,
      );
      const emailAddress =
        primaryEmail?.email_address || email_addresses?.[0]?.email_address;

      // Extract primary phone number
      const primaryPhone = phone_numbers?.find(
        (phone: any) => phone.id === evt.data.primary_phone_number_id,
      );
      const phoneNumber =
        primaryPhone?.phone_number || phone_numbers?.[0]?.phone_number;

      // Generate a username if not provided (suffix ensures uniqueness)
      const usernameBase =
        username || emailAddress?.split("@")[0] || "clerk_user";
      const generatedUsername = username
        ? username
        : `${usernameBase}_${id.slice(-6)}`;

      // Use a more descriptive placeholder for missing emails
      const userEmail = emailAddress || `${id}@noemail.clerk.internal`;

      try {
        // Upsert so duplicates / out-of-order delivery doesn't 500.
        await prisma.user.upsert({
          where: { clerkUserId: id },
          create: {
            clerkUserId: id,
            email: userEmail,
            username: generatedUsername,
            firstName: first_name || null,
            lastName: last_name || null,
            photoUrl: image_url || null,
            phoneNumber: phoneNumber || null,
            password: null, // No password since using Clerk
          },
          update: {
            email: userEmail,
            username: generatedUsername,
            firstName: first_name || null,
            lastName: last_name || null,
            photoUrl: image_url || null,
            phoneNumber: phoneNumber || null,
          },
        });

        console.log(`User created: ${id}`);
      } catch (error) {
        const code = (error as any)?.code;
        console.error("Error creating user in database", {
          eventType,
          eventId,
          clerkUserId: id,
          code,
          message: (error as any)?.message,
          meta: (error as any)?.meta,
        });
        // Common: uniqueness conflicts (email/username) or duplicate delivery.
        if (code === "P2002") {
          try {
            const linked = await tryLinkExistingUserByEmail({
              clerkUserId: id,
              emailAddress,
              username: generatedUsername,
              firstName: first_name || null,
              lastName: last_name || null,
              photoUrl: image_url || null,
              phoneNumber: phoneNumber || null,
            });
            console.log("Resolved unique conflict", {
              eventType,
              eventId,
              clerkUserId: id,
              linked,
            });
          } catch (linkError) {
            console.error("Failed resolving unique conflict", {
              eventType,
              eventId,
              clerkUserId: id,
              code: (linkError as any)?.code,
              message: (linkError as any)?.message,
              meta: (linkError as any)?.meta,
            });
          }
          return NextResponse.json({ received: true }, { status: 200 });
        }
        // Common: webhook hitting a DB that hasn't been migrated yet, or stale Prisma Client.
        if (isSchemaMismatchError(error))
          return NextResponse.json({ received: true }, { status: 200 });
        throw error;
      }
    } else if (eventType === "user.updated") {
      const {
        id,
        email_addresses,
        username,
        first_name,
        last_name,
        image_url,
        phone_numbers,
      } = evt.data;

      // Extract primary email
      const primaryEmail = email_addresses?.find(
        (email: any) => email.id === evt.data.primary_email_address_id,
      );
      const emailAddress =
        primaryEmail?.email_address || email_addresses?.[0]?.email_address;

      // Extract primary phone number
      const primaryPhone = phone_numbers?.find(
        (phone: any) => phone.id === evt.data.primary_phone_number_id,
      );
      const phoneNumber =
        primaryPhone?.phone_number || phone_numbers?.[0]?.phone_number;

      const usernameBase =
        username || emailAddress?.split("@")[0] || "clerk_user";
      const generatedUsername = username
        ? username
        : `${usernameBase}_${id.slice(-6)}`;
      const userEmail = emailAddress || `${id}@noemail.clerk.internal`;

      try {
        // Upsert so "user.updated" doesn't fail if we missed "user.created".
        await prisma.user.upsert({
          where: { clerkUserId: id },
          create: {
            clerkUserId: id,
            email: userEmail,
            username: generatedUsername,
            firstName: first_name || null,
            lastName: last_name || null,
            photoUrl: image_url || null,
            phoneNumber: phoneNumber || null,
            password: null,
          },
          update: {
            email: userEmail,
            username: generatedUsername,
            firstName: first_name || null,
            lastName: last_name || null,
            photoUrl: image_url || null,
            phoneNumber: phoneNumber || null,
          },
        });

        console.log(`User updated: ${id}`);
      } catch (error) {
        const code = (error as any)?.code;
        console.error("Error updating user in database", {
          eventType,
          eventId,
          clerkUserId: id,
          code,
          message: (error as any)?.message,
          meta: (error as any)?.meta,
        });
        if (code === "P2002") {
          try {
            const linked = await tryLinkExistingUserByEmail({
              clerkUserId: id,
              emailAddress,
              username: generatedUsername,
              firstName: first_name || null,
              lastName: last_name || null,
              photoUrl: image_url || null,
              phoneNumber: phoneNumber || null,
            });
            console.log("Resolved unique conflict", {
              eventType,
              eventId,
              clerkUserId: id,
              linked,
            });
          } catch (linkError) {
            console.error("Failed resolving unique conflict", {
              eventType,
              eventId,
              clerkUserId: id,
              code: (linkError as any)?.code,
              message: (linkError as any)?.message,
              meta: (linkError as any)?.meta,
            });
          }
          return NextResponse.json({ received: true }, { status: 200 });
        }
        if (isSchemaMismatchError(error))
          return NextResponse.json({ received: true }, { status: 200 });
        throw error;
      }
    } else if (eventType === "user.deleted") {
      const { id } = evt.data;

      try {
        // Delete user from database
        await prisma.user.delete({
          where: { clerkUserId: id },
        });

        console.log(`User deleted: ${id}`);
      } catch (error) {
        const code = (error as any)?.code;
        console.error("Error deleting user from database", {
          eventType,
          eventId,
          clerkUserId: id,
          code,
          message: (error as any)?.message,
          meta: (error as any)?.meta,
        });
        // Don't error if user doesn't exist
        if (code === "P2025")
          return NextResponse.json({ received: true }, { status: 200 });
        if (isSchemaMismatchError(error))
          return NextResponse.json({ received: true }, { status: 200 });
        throw error;
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 },
    );
  }
}

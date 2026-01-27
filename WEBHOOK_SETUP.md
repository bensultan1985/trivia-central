# Clerk Webhook Setup - Database Synchronization

This guide explains how to configure Clerk webhooks to automatically store user data in your Postgres database when users register.

## Overview

When users sign up through Clerk, their data is stored in Clerk's systems. To also store this data in your local Postgres database, we use Clerk webhooks that notify our application whenever a user is created, updated, or deleted.

## What Data is Stored

When a user registers, the webhook automatically stores:
- **User ID** (from Clerk) - Required
- **Email address** - Required
- **Username** - Required (auto-generated if not provided)
- **First name** - Optional
- **Last name** - Optional
- **Photo URL** - Optional
- **Phone number** - Optional

## Setup Instructions

### 1. Run Database Migration

First, apply the database migration to add the new user fields:

```bash
# Make sure your DATABASE_URL is set in .env or .env.local
npx prisma migrate deploy
```

This will add the following fields to your User table:
- `clerkUserId` (unique identifier)
- `firstName`
- `lastName`
- `photoUrl`
- `phoneNumber`

### 2. Configure Clerk Webhook

1. **Log in to Clerk Dashboard**
   - Go to https://dashboard.clerk.com
   - Select your application

2. **Navigate to Webhooks**
   - In the left sidebar, go to **Configure** → **Webhooks**
   - Click **Add Endpoint**

3. **Set Webhook URL**
   - **Endpoint URL**: `https://your-domain.com/api/webhooks/clerk`
   - For development: `https://your-dev-domain.com/api/webhooks/clerk`
   
   > **Note**: For local development, you'll need to use a tunneling service like ngrok to expose your localhost to the internet:
   > ```bash
   > ngrok http 3000
   > ```
   > Then use: `https://your-ngrok-url.ngrok.io/api/webhooks/clerk`

4. **Subscribe to Events**
   - Select the following events:
     - ✅ `user.created` - When a new user registers
     - ✅ `user.updated` - When a user updates their profile
     - ✅ `user.deleted` - When a user account is deleted

5. **Save the Endpoint**
   - Click **Create**
   - Clerk will generate a signing secret

6. **Copy the Signing Secret**
   - After creating the endpoint, copy the **Signing Secret** (starts with `whsec_`)
   - You'll need this in the next step

### 3. Add Environment Variable

Add the webhook secret to your environment variables:

**In `.env` or `.env.local`:**
```env
CLERK_WEBHOOK_SECRET="whsec_your_secret_here"
```

**Important**: Restart your development server after adding this variable.

### 4. Test the Webhook

#### Option A: Test with Clerk Dashboard
1. In the Clerk dashboard, go to the webhook you just created
2. Click **Testing** tab
3. Send a test `user.created` event
4. Check your application logs to verify the webhook was received

#### Option B: Test with Real Registration
1. Start your application: `npm run dev`
2. Go to your sign-up page: `http://localhost:3000/sign-up`
3. Register a new user
4. Check your database to verify the user was created:
   ```sql
   SELECT * FROM "User" WHERE "clerkUserId" IS NOT NULL;
   ```

### 5. Verify Integration

Check that the webhook is working:

1. **Check Application Logs**
   - Look for: `User created: user_xxxxx`
   - If errors appear, check the error messages

2. **Check Database**
   - Query your User table
   - Verify new users have `clerkUserId` populated
   - Confirm optional fields are stored when provided

3. **Check Clerk Dashboard**
   - Go to Webhooks → Your endpoint
   - View the **Message Log** to see webhook delivery status
   - Green checkmarks = successful delivery
   - Red X = failed delivery (click to see error details)

## Webhook Security

The webhook handler includes several security measures:

1. **Signature Verification**: Uses Svix to verify that webhooks come from Clerk
2. **Secret Key**: Only processes webhooks signed with your CLERK_WEBHOOK_SECRET
3. **Public Route**: The webhook endpoint is publicly accessible but secured by signature verification

## Troubleshooting

### Webhook Not Receiving Events

1. **Check the URL is correct**
   - Ensure it matches your deployment URL
   - For local dev, use ngrok or similar

2. **Verify environment variable**
   ```bash
   echo $CLERK_WEBHOOK_SECRET
   ```

3. **Check webhook endpoint logs**
   - Look for 400/500 errors in your application logs

### Database Errors

1. **Migration not applied**
   ```bash
   npx prisma migrate status
   npx prisma migrate deploy
   ```

2. **Duplicate user errors**
   - The webhook handler already handles this gracefully
   - Check logs for "User already exists, skipping"

### Signature Verification Fails

1. **Wrong secret**: Double-check the CLERK_WEBHOOK_SECRET matches Clerk dashboard
2. **Clock skew**: Ensure your server time is synchronized (webhooks expire after 5 minutes)
3. **Body modification**: Don't parse or modify the request body before verification

## What Happens When...

### User Registers with Email
- `user.created` event fires
- Webhook stores: clerkUserId, email, username (from email), firstName, lastName

### User Registers with Phone
- `user.created` event fires
- Webhook stores: clerkUserId, phoneNumber, username (auto-generated)

### User Updates Profile
- `user.updated` event fires
- Webhook updates: firstName, lastName, photoUrl, etc.

### User Deletes Account
- `user.deleted` event fires
- Webhook removes user from database (cascade deletes sessions and training data)

## Advanced Configuration

### Handling Missing Fields

The webhook handler is designed to be flexible:
- **Required fields**: clerkUserId, email, username
- **Optional fields**: firstName, lastName, photoUrl, phoneNumber
- Missing optional fields are stored as `null`

### Multiple Webhook Endpoints

You can set up multiple webhook endpoints in Clerk for different environments:
- **Development**: `https://dev.yourapp.com/api/webhooks/clerk`
- **Staging**: `https://staging.yourapp.com/api/webhooks/clerk`
- **Production**: `https://yourapp.com/api/webhooks/clerk`

Each endpoint should have its own signing secret.

### Webhook Retry Logic

Clerk automatically retries failed webhooks:
- Initial retry: After 5 seconds
- Subsequent retries: Exponential backoff
- Maximum retries: Up to 65 attempts over 2 days

If your endpoint returns a 2xx status, Clerk considers it successful and won't retry.

## Related Files

- **Webhook Handler**: `app/api/webhooks/clerk/route.ts`
- **Prisma Schema**: `prisma/schema.prisma`
- **Database Migration**: `prisma/migrations/20260127024056_add_clerk_user_fields/migration.sql`
- **Middleware**: `middleware.ts` (makes webhook endpoint public)

## Support

For issues:
1. Check application logs for error messages
2. Check Clerk webhook message log in dashboard
3. Verify environment variables are set correctly
4. Ensure database migration has been applied
5. Check that the webhook URL is accessible from the internet

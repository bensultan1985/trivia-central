# Clerk Authentication Setup Guide

This application uses Clerk for authentication. Follow these steps to set up Clerk for your trivia-train application.

## 1. Create a Clerk Account

1. Go to [https://clerk.com](https://clerk.com)
2. Sign up for a free account
3. Create a new application

## 2. Configure Authentication Methods

In your Clerk dashboard:

1. Navigate to **User & Authentication** → **Email, Phone, Username**
2. Enable the following:
   - ✅ **Email address** (required)
   - ✅ **Username** (optional but recommended)
   - ✅ **Phone number** (optional)

3. Navigate to **User & Authentication** → **Social Connections**
4. Enable:
   - ✅ **Google** (OAuth)
   - ✅ **X (Twitter)** (OAuth)

## 3. Get Your API Keys

1. In your Clerk dashboard, go to **API Keys**
2. Copy your keys:
   - **Publishable Key** (starts with `pk_test_` or `pk_live_`)
   - **Secret Key** (starts with `sk_test_` or `sk_live_`)

## 4. Set Environment Variables

Create a `.env.local` file in the root of your project:

```env
# Database connection string
DATABASE_URL="postgresql://user:password@localhost:5432/trivia_train"

# OpenAI API key for trivia generation
OPENAI_API_KEY="your-openai-api-key-here"

# Clerk authentication keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_your_key_here"
CLERK_SECRET_KEY="sk_test_your_key_here"

# Clerk redirect URLs (these are configured automatically)
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/"
```

## 5. Configure User Profile Fields

In your Clerk dashboard:

1. Go to **User & Authentication** → **User Profile**
2. Ensure **First Name** is enabled (this is shown in the header)
3. Optionally enable **Last Name**

## 6. Customize Appearance (Optional)

You can customize the Clerk components to match your app's theme:

1. Go to **Customization** → **Theme**
2. Adjust colors, fonts, and layout to match your blue theme

## 7. Test Your Setup

1. Start your development server: `npm run dev`
2. Visit `http://localhost:3000`
3. Click **Register** to create a new account
4. Try signing in with:
   - Email and password
   - Username and password
   - Google (if configured)
   - X/Twitter (if configured)
5. Verify your name appears in the header
6. Test the logout functionality

## Authentication Features

✅ **Email/Password Authentication**: Users can register and login with email
✅ **Username/Password Authentication**: Users can register and login with username
✅ **Phone Number Authentication**: Users can register and login with phone number (if enabled)
✅ **Google OAuth**: One-click sign-in with Google
✅ **X (Twitter) OAuth**: One-click sign-in with X/Twitter
✅ **User Profile Display**: Shows first name or username in header
✅ **Logout**: UserButton component with sign-out option
✅ **Protected Routes**: Middleware protects authenticated routes
✅ **Session Management**: Automatic session handling by Clerk

## Troubleshooting

### Missing Environment Variables
If you see errors about missing Clerk keys, make sure:
- Your `.env.local` file exists in the root directory
- The keys are properly formatted (no quotes around values in the file)
- You've restarted your dev server after adding the keys

### Authentication Not Working
- Verify your Clerk application is active
- Check that your API keys are correct
- Ensure the authentication methods are enabled in Clerk dashboard
- Check the browser console for specific error messages

### OAuth Providers Not Showing
- Make sure you've enabled Google and X in the Clerk dashboard
- Complete the OAuth configuration for each provider (may require developer accounts with Google and Twitter)

## Additional Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk Next.js Integration](https://clerk.com/docs/quickstarts/nextjs)
- [Clerk Components](https://clerk.com/docs/components/overview)

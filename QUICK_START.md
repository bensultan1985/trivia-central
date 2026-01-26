# Quick Start Guide - Clerk Authentication

This guide will help you get the authentication system up and running quickly.

## Step 1: Create Clerk Account (5 minutes)

1. Go to https://clerk.com
2. Click "Sign Up" and create a free account
3. Create a new application
4. Choose "Next.js" as your framework

## Step 2: Enable Authentication Methods (3 minutes)

In your Clerk dashboard:

1. **Email & Username:**
   - Go to **Configure** → **User & Authentication** → **Email, Phone, Username**
   - Toggle ON: **Email address** (required)
   - Toggle ON: **Username** (recommended)
   - Toggle ON: **Phone number** (optional)
   - Click **Save**

2. **Social Connections:**
   - Go to **Configure** → **Social Connections**
   - Click **Add connection**
   - Enable **Google** (toggle ON)
   - Enable **X** (toggle ON)
   - Click **Save**

> **Note:** Google and X OAuth require additional setup with their developer consoles. You can skip this initially and test with email/username first.

## Step 3: Get Your API Keys (1 minute)

1. In Clerk dashboard, go to **API Keys**
2. Copy your **Publishable Key** (starts with `pk_test_`)
3. Copy your **Secret Key** (starts with `sk_test_`)

## Step 4: Configure Environment Variables (2 minutes)

Create a `.env.local` file in the root of your project:

```bash
# Copy from .env.example if it doesn't exist
cp .env.example .env.local
```

Edit `.env.local` and add your Clerk keys:

```env
# Database (use your existing database)
DATABASE_URL="postgresql://user:password@localhost:5432/trivia_train"

# Clerk Keys (REPLACE WITH YOUR ACTUAL KEYS)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_your_actual_key_here"
CLERK_SECRET_KEY="sk_test_your_actual_key_here"

# Optional (already configured in the app)
OPENAI_API_KEY="your-openai-api-key-here"
```

## Step 5: Start the App (1 minute)

```bash
# Install dependencies if you haven't already
npm install

# Start the development server
npm run dev
```

The app should start at http://localhost:3000

## Step 6: Test Authentication (5 minutes)

1. **Test Registration:**
   - Open http://localhost:3000
   - Click **Register** button in header
   - Fill in your email and password
   - Click **Sign up**
   - You should see a welcome message with your name in the header

2. **Test Logout:**
   - Click on your profile picture/avatar (UserButton) in the header
   - Click **Sign out**
   - You should be logged out and see Login/Register buttons

3. **Test Login:**
   - Click **Login** button
   - Enter your email and password
   - You should be logged back in

4. **Test Training (Optional):**
   - While logged in OR logged out, click on any training mode
   - Verify training works in both states

## Troubleshooting

### "Invalid publishable key" error
- Double-check you copied the full key from Clerk dashboard
- Make sure there are no extra spaces or quotes
- Verify the key starts with `pk_test_`

### Sign-in page shows error
- Restart your dev server after adding .env.local
- Clear browser cache and cookies
- Check browser console for specific error messages

### User name not showing
- Make sure you entered a first name or username during registration
- Try editing your profile in Clerk dashboard to add a name
- The header will show email as fallback if no name is set

### OAuth providers not showing
- Google and X require additional setup in their developer consoles
- For initial testing, just use email/password authentication
- See CLERK_SETUP.md for full OAuth setup instructions

## What's Next?

### For Testing:
- See `TESTING_AUTH.md` for comprehensive testing scenarios

### For Configuration:
- See `CLERK_SETUP.md` for detailed configuration options
- Customize Clerk theme to match your app
- Set up custom email templates
- Enable multi-factor authentication

### For Production:
1. Get production Clerk keys from dashboard
2. Add them to your production environment variables
3. Update allowed origins in Clerk dashboard
4. Deploy your application

## Need Help?

- **Setup Issues:** See `CLERK_SETUP.md`
- **Testing Guide:** See `TESTING_AUTH.md`
- **Technical Details:** See `IMPLEMENTATION_SUMMARY.md`
- **Clerk Docs:** https://clerk.com/docs
- **Clerk Support:** https://clerk.com/support

## Summary

You should now have:
✅ A Clerk account with an application
✅ Authentication methods enabled (email, username, phone, Google, X)
✅ API keys in your `.env.local` file
✅ A running app with working authentication
✅ Ability to register, login, and logout

Total setup time: ~15-20 minutes

Happy coding! 🎉

import { SignIn } from "@clerk/nextjs";
import { sanitizeReturnTo } from "@/lib/sanitizeReturnTo";

/**
 * Sign In Page
 *
 * This page uses Clerk's prebuilt <SignIn /> component which automatically
 * displays ALL authentication methods enabled in your Clerk Dashboard.
 *
 * To add/remove authentication methods (email, username, phone, Google, X):
 * 1. Go to your Clerk Dashboard at https://dashboard.clerk.com
 * 2. Navigate to Configure → User & Authentication
 * 3. Enable/disable the authentication methods you want
 * 4. The sign-in form will automatically update - no code changes needed!
 *
 * Current requirements (enable these in Clerk Dashboard):
 * - Email/Password
 * - Username/Password
 * - Phone/SMS
 * - Google OAuth
 * - X/Twitter OAuth
 */
export default function SignInPage({
  searchParams,
}: {
  searchParams?: { returnTo?: string };
}) {
  const returnTo = sanitizeReturnTo(searchParams?.returnTo, "/dashboard");

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-700 p-4">
      <div className="w-full max-w-md">
        <SignIn
          afterSignInUrl={returnTo}
          afterSignUpUrl={returnTo}
          redirectUrl={returnTo}
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "w-full shadow-2xl",
            },
          }}
        />
      </div>
    </div>
  );
}

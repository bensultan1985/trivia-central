"use client";

import { UserButton, useUser, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Header() {
  const { isSignedIn, user } = useUser();

  return (
    <header className="sticky top-0 z-50 border-b border-blue-900/10 bg-white text-blue-500 shadow-lg">
      <div className="flex items-center justify-between px-6 py-2">
        <h1 className="text-2xl font-bold tracking-tight">
          <Link href={isSignedIn ? "/dashboard" : "/"}>Trivia Central</Link>
        </h1>

        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <>
              <span className="text-sm text-gray-700">
                Welcome,{" "}
                {user.firstName ||
                  user.username ||
                  user.emailAddresses[0]?.emailAddress ||
                  "User"}
                !
              </span>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                  },
                }}
              />
            </>
          ) : (
            <div className="flex gap-2">
              <SignInButton mode="modal" forceRedirectUrl="/dashboard">
                <button className="rounded-md bg-white/10 px-4 py-2 text-sm font-semibold text-blue-500 ring-1 ring-blue-500/50 transition-colors hover:bg-blue-50">
                  Login
                </button>
              </SignInButton>
              <Link
                href="/sign-up"
                className="rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

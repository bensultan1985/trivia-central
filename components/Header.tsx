"use client";

import { UserButton, useUser, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { isSignedIn, user } = useUser();

  return (
    <header className="sticky top-0 z-50 border-b border-blue-900/10 bg-white text-blue-500 shadow-lg dark:border-white/10 dark:bg-slate-950 dark:text-indigo-200">
      <div className="flex items-center justify-between px-4 py-2 sm:px-6">
        {/* Mobile menu button */}
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="rounded-md p-2 transition-colors hover:bg-blue-50 dark:hover:bg-indigo-950 lg:hidden"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        )}

        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
          <Link href={isSignedIn ? "/dashboard" : "/"}>Trivia Central</Link>
        </h1>

        <div className="flex items-center gap-2 sm:gap-4">
          {isSignedIn ? (
            <>
              <span className="hidden text-sm text-gray-700 dark:text-gray-200 md:block">
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
                    avatarBox: "w-8 h-8 sm:w-10 sm:h-10",
                  },
                }}
              />
            </>
          ) : (
            <div className="flex gap-2">
              <SignInButton mode="modal" forceRedirectUrl="/dashboard">
                <button className="rounded-md bg-white/10 px-3 py-2 text-xs font-semibold text-blue-500 ring-1 ring-blue-500/50 transition-colors hover:bg-blue-50 dark:bg-white/5 dark:text-indigo-200 dark:ring-white/15 dark:hover:bg-indigo-950 sm:px-4 sm:text-sm">
                  Login
                </button>
              </SignInButton>
              <Link
                href="/sign-up"
                className="rounded-md bg-blue-500 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-600 dark:bg-indigo-600 dark:hover:bg-indigo-500 sm:px-4 sm:text-sm"
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

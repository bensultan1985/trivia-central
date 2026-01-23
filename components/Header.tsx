"use client";

import { useRouter } from "next/navigation";

interface HeaderProps {
  user?: {
    username: string;
    email: string;
  } | null;
}

export default function Header({ user }: HeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-blue-900/10 bg-white text-blue-500 shadow-lg">
      <div className="flex items-center justify-between px-6 py-">
        <h1 className="text-2xl font-bold tracking-tight">Trivia Train</h1>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-white/90">
                Welcome, {user.username}!
              </span>
              <button
                onClick={handleLogout}
                className="rounded-md bg-white/10 px-4 py-2 text-sm font-semiboldtext-blue-500 
                ring-1 ring-white/15 transition-colors hover:bg-white/15"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <a
                href="/login"
                className="rounded-md bg-white/10 px-4 py-2 text-sm font-semibold text-blue-500 ring-1 ring-white/15 transition-colors hover:bg-white/15"
              >
                Login
              </a>
              <a
                href="/register"
                className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-blue-500 transition-colors hover:bg-white/90"
              >
                Register
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

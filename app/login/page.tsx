"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const returnTo = params.get("returnTo") ?? "/dashboard";
    router.replace(`/sign-in?returnTo=${encodeURIComponent(returnTo)}`);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-700 p-4">
      <div className="text-white text-center">
        <p className="text-xl">Redirecting to sign in...</p>
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to new Clerk sign-in page
    router.replace("/sign-in");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-700 p-4">
      <div className="text-white text-center">
        <p className="text-xl">Redirecting to sign in...</p>
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to new Clerk sign-up page
    router.replace("/sign-up");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-700 p-4">
      <div className="text-white text-center">
        <p className="text-xl">Redirecting to sign up...</p>
      </div>
    </div>
  );
}

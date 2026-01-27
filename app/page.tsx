import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

import { IconBolt, IconCheck, IconGrid, IconTarget } from "@/components/icons";

export default async function HomePage() {
  const user = await currentUser();

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          Welcome to Trivia Train!{" "}
          <IconTarget className="inline-block h-8 w-8 align-middle" />
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
            Train Like a Champion
          </h2>
          {user ? (
            <>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Welcome,{" "}
                <span className="font-bold">
                  {user.firstName ||
                    user.username ||
                    user.emailAddresses[0]?.emailAddress ||
                    "User"}
                </span>
                ! Get ready to sharpen your trivia skills and dominate your next
                game show.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Choose a training mode from the sidebar to get started.
              </p>
            </>
          ) : (
            <>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Jump into training right away — no login required.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Want to save progress later?{" "}
                <Link href="/sign-in" className="font-semibold underline">
                  Log in
                </Link>{" "}
                or{" "}
                <Link href="/sign-up" className="font-semibold underline">
                  create an account
                </Link>
                .
              </p>
            </>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Link
            href="/training/target-practice"
            className="block md:col-span-3"
          >
            <div className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg p-8 text-white transition-transform hover:scale-[1.02]">
              <div className="flex items-center gap-4">
                <div className="shrink-0">
                  <IconTarget className="h-16 w-16" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Target Practice</h3>
                  <p className="text-base opacity-90">
                    Master multiple choice questions with our interactive
                    15-question game. Track your progress and improve your
                    accuracy!
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/training/speed" className="block">
            <div className="rounded-lg bg-blue-700 shadow-lg p-6 text-white transition-transform hover:scale-[1.02]">
              <div className="mb-3">
                <IconBolt className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-2">Speed Training</h3>
              <p className="text-sm opacity-90">
                Test your quick thinking with rapid-fire questions
              </p>
            </div>
          </Link>

          <Link href="/training/accuracy" className="block">
            <div className="rounded-lg bg-blue-600 shadow-lg p-6 text-white transition-transform hover:scale-[1.02]">
              <div className="mb-3">
                <IconCheck className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-2">Accuracy Training</h3>
              <p className="text-sm opacity-90">
                Focus on getting every answer right
              </p>
            </div>
          </Link>

          <Link href="/training/category" className="block">
            <div className="rounded-lg bg-blue-800 shadow-lg p-6 text-white transition-transform hover:scale-[1.02]">
              <div className="mb-3">
                <IconGrid className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-2">Category Training</h3>
              <p className="text-sm opacity-90">
                Master specific trivia categories
              </p>
            </div>
          </Link>
        </div>

        <div className="mt-8 rounded border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/40 dark:bg-blue-950/30">
          <h3 className="mb-2 font-bold text-blue-900 dark:text-blue-100">
            💡 Pro Tip
          </h3>
          <p className="text-sm text-blue-900/80 dark:text-blue-100/80">
            Consistent practice is key! Try to train for at least 15 minutes
            each day to see real improvement in your trivia skills.
          </p>
        </div>
      </div>
    </div>
  );
}

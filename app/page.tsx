import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

import {
  IconTarget,
  IconStrategyGuides,
  IconStudyGuides,
  IconGameBuilder,
  IconHostGame,
} from "@/components/icons";
import AnnouncementCard from "@/components/AnnouncementCard";
import FeatureCard from "@/components/FeatureCard";
import DailyFunFact from "@/components/DailyFunFact";

export default async function HomePage() {
  const user = await currentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    // <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
    <div className="min-h-screen  dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="px-4 py-12 md:px-8 md:py-12 lg:p-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1
              //   className="text-5xl md:text-6xl
              // font-black mb-4 bg-gradient-to-r
              // from-blue-600 via-purple-600 to-pink-600
              // bg-clip-text text-transparent"
              className="text-5xl md:text-6xl
            font-black mb-5 bg-linear-to-r
            from-blue-500 via-plue-500 to-blue-500
            bg-clip-text text-transparent"
            >
              Welcome to Trivia Central
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-medium">
              Your{" "}
              <span className="text-orange-500 text-md font-semibold">
                SECRET WEAPON
              </span>{" "}
              for{" "}
              <span className="text-emerald-500 text-md font-semibold">
                GAME SHOW PREP.
              </span>
            </p>
            <div className="mt-8">
              <p className="text-gray-600 dark:text-gray-400">
                Jump into training right away — no login required. Want to save
                progress?{" "}
                <Link
                  href="/sign-in"
                  className="font-bold text-blue-600 hover:text-blue-700 underline decoration-2"
                >
                  Log in
                </Link>{" "}
                or{" "}
                <Link
                  href="/sign-in?returnTo=%2Fdashboard"
                  className="font-bold text-purple-600 hover:text-purple-700 underline decoration-2"
                >
                  create an account
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="mb-8">
            <DailyFunFact />
          </div>

          {/* Announcements Section */}
          {/* <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 flex items-center gap-3">
              📢 Announcements
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <AnnouncementCard
                title="Target Practice"
                message="Quick rounds with tips and analytics"
                // date="Jan 2026"
              />
              <AnnouncementCard
                title="Strategy Guides"
                message="Learn about specific strategies for popular shows like Jeopardy!"
              />
              <AnnouncementCard
                title=" Builder (coming soon)"
                message="Create custom trivia games. Perfect for classrooms and parties!"
              />
            </div>
          </div> */}

          {/* Target Practice - Prominent Section */}
          <div className="mb-12">
            <Link
              href="/training/target-practice"
              aria-label="Navigate to Target Practice training mode"
              className="block"
            >
              <div className="rounded-2xl bg-linear-to-r from-blue-500 via-blue-500 to-blue-400 shadow-2xl p-8 md:p-12 text-white transition-all motion-safe:hover:scale-[1.02] hover:shadow-3xl border-4 border-blue-400">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="shrink-0">
                    <IconTarget className="h-24 w-24 md:h-32 md:w-32 motion-safe:animate-pulse" />
                  </div>
                  <div className="text-center md:text-left">
                    <div className="inline-block bg-yellow-400 text-blue-900 px-4 py-1 rounded-full text-sm font-bold mb-3">
                      ⭐ FEATURED
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black mb-3">
                      Target Practice
                    </h3>
                    <p className="text-lg md:text-xl opacity-95 mb-4">
                      Master multiple choice questions with our free interactive
                      trainer. Track your progress and improve your accuracy!
                    </p>
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full font-bold text-lg">
                      Play Now →
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Feature Grid */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
              Hot Features
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                href="/strategy-guides"
                title="Strategy Guides"
                description="Learn winning strategies for games like Jeopardy!; buzzing techniques, wagering strategies, and more!"
                icon={IconStrategyGuides}
                colorClasses="bg-gradient-to-br from-green-500 to-emerald-600"
                iconSize="h-12 w-12"
              />

              <FeatureCard
                href="/study-guides"
                title="Study Guides"
                description="Easy, broad overviews on history, pop culture, and more. Based on real past game show questions."
                icon={IconStudyGuides}
                colorClasses="bg-gradient-to-br from-purple-500 to-pink-600"
                iconSize="h-12 w-12"
              />

              {/* <FeatureCard
                href="/game-builder"
                title="Game Builder"
                description="Create custom trivia games with your own questions, categories, and rules. Perfect for hosting events!"
                icon={IconGameBuilder}
                colorClasses="bg-gradient-to-br from-orange-500 to-red-600"
                iconSize="h-12 w-12"
              />

              <FeatureCard
                href="/host-game"
                title="Host a Game"
                description="Host live trivia games with friends, family, or colleagues. Real-time scoring and multiplayer support!"
                icon={IconHostGame}
                colorClasses="bg-gradient-to-br from-yellow-500 to-orange-500"
                iconSize="h-12 w-12"
              /> */}
            </div>
          </div>

          {/* Pro Tip Section */}
          <div className="rounded-xl border-2 border-indigo-300 bg-linear-to-r from-indigo-50 to-purple-50 p-6 dark:border-indigo-800 dark:from-indigo-950/50 dark:to-purple-950/50 shadow-lg">
            <h3 className="mb-3 font-black text-2xl text-indigo-900 dark:text-indigo-100 flex items-center gap-2">
              💡 Pro Tip
            </h3>
            <p className="text-base text-indigo-900/90 dark:text-indigo-100/90 leading-relaxed">
              Registered users can toggle whether or not they want to see
              repeat-question in Target Practice. "Repeat" mode helps solidify
              concepts. "Non-repeat" mode exposes you to a wider variety of
              questions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

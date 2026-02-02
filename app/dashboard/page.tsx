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

export default async function DashboardPage() {
  return (
    // <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
    <div className="min-h-screen dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="px-4 py-1 md:px-8 md:py-1 lg:px-12 lg:py-1">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            {/* <h1 className="text-2xl md:text-3xl sm:text-2xl font-black mb-5  text-blue-500 bg-clip-text ">
              Dashboard
            </h1> */}
            {/* <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-medium">
              Your{" "}
              <span className="text-orange-500 text-md font-semibold">
                TRAINING HUB
              </span>{" "}
              for{" "}
              <span className="text-emerald-500 text-md font-semibold">
                GAME SHOW SUCCESS
              </span>
            </p> */}
          </div>

          {/* Announcements Section */}
          <div className="mb-12">
            {/* <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 flex items-center gap-3 sm:hidden">
              Announcements
            </h2> */}
            {/* <div
              className="
            // grid md:grid-cols-3 gap-4
            
            "
            ></div> */}
          </div>

          <div className="mb-8">
            <DailyFunFact />
          </div>

          {/* <AnnouncementCard
            title="Target Practice Live"
            message="Quick rounds with tips and analytics to sharpen your trivia skills!"
          /> */}
          {/* Target Practice - Prominent Section */}
          <div className="mb-12">
            <a
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
                      Master multiple choice questions with our interactive
                      trainer. Track your progress and improve your accuracy!
                    </p>
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full font-bold text-lg">
                      Start Training →
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* Feature Grid */}
          <div className="mb-12">
            {/* <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
              Training Features
            </h2> */}
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
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

              <FeatureCard
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
              />
            </div>
          </div>

          {/* Pro Tip Section */}
          {/* <div className="rounded-xl border-2 border-indigo-300 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 dark:border-indigo-800 dark:from-indigo-950/50 dark:to-purple-950/50 shadow-lg">
            <h3 className="mb-3 font-black text-2xl text-indigo-900 dark:text-indigo-100 flex items-center gap-2">
              💡 Pro Tip
            </h3>
            <p className="text-base text-indigo-900/90 dark:text-indigo-100/90 leading-relaxed">
              Registered users can toggle whether or not they want to see repeat
              questions in Target Practice. "Repeat" mode helps solidify
              concepts. "Non-repeat" mode exposes you to a wider variety of
              questions.
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

import { IconBolt } from "@/components/icons";

export default async function SpeedTrainingPage() {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 rounded-lg bg-blue-500 p-8 text-white shadow-lg">
          <div className="flex items-center gap-4 mb-4">
            <span className="shrink-0">
              <IconBolt className="h-16 w-16" />
            </span>
            <div>
              <h1 className="text-4xl font-bold">Speed Training</h1>
              <p className="mt-2 text-white/90">
                Test your quick thinking with rapid-fire questions
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Coming Soon!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Speed Training mode will help you develop lightning-fast recall and
            decision-making skills.
          </p>

          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">
                Quick Rounds
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Answer as many questions as possible in 60 seconds
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">
                Progressive Difficulty
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Questions get harder as you answer correctly
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">
                Leaderboards
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Compete with other players for the top score
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-lg bg-blue-50 p-4 dark:bg-blue-950/30">
            <p className="text-sm text-blue-900/80 dark:text-blue-100/80">
              💡 <strong>Pro Tip:</strong> Speed training is perfect for game
              shows with buzzer rounds where quick reflexes matter as much as
              knowledge.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

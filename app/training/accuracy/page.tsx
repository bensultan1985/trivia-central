import { IconCheck } from "@/components/icons";

export default async function AccuracyTrainingPage() {
  return (
    <div className="p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 rounded-lg bg-blue-500 p-8 text-white shadow-lg">
          <div className="mb-4 flex items-center gap-4">
            <span className="shrink-0">
              <IconCheck className="h-16 w-16" />
            </span>
            <div>
              <h1 className="text-4xl font-bold">Accuracy Training</h1>
              <p className="mt-2 text-white/90">
                Focus on getting every answer right
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Coming Soon!
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Accuracy Training mode will help you build precision and confidence
            in your answers.
          </p>

          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 py-2 pl-4">
              <h3 className="mb-1 font-semibold text-gray-800 dark:text-gray-100">
                Untimed Practice
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Take your time to think through each question carefully
              </p>
            </div>

            <div className="border-l-4 border-blue-500 py-2 pl-4">
              <h3 className="mb-1 font-semibold text-gray-800 dark:text-gray-100">
                Detailed Explanations
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Learn why answers are correct or incorrect
              </p>
            </div>

            <div className="border-l-4 border-blue-500 py-2 pl-4">
              <h3 className="mb-1 font-semibold text-gray-800 dark:text-gray-100">
                Progress Tracking
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Monitor your accuracy rate over time
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-lg bg-blue-50 p-4 dark:bg-blue-950/30">
            <p className="text-sm text-blue-900/80 dark:text-blue-100/80">
              💡 <strong>Pro Tip:</strong> Accuracy training is ideal for
              preparing for game shows where wrong answers have penalties or
              where precision is crucial.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

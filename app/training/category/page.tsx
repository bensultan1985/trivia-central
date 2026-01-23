export default async function CategoryTrainingPage() {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 rounded-lg bg-blue-500 p-8 text-white shadow-lg">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-6xl">📚</span>
            <div>
              <h1 className="text-4xl font-bold">Category Training</h1>
              <p className="mt-2 text-white/90">
                Master specific trivia categories
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Coming Soon!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Category Training mode will help you become an expert in specific
            knowledge areas.
          </p>

          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">
                Choose Your Categories
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Focus on History, Science, Sports, Entertainment, and more
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">
                Track Category Mastery
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                See your proficiency level in each category
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">
                Targeted Improvement
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Work on weak areas with personalized question sets
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-lg bg-blue-50 p-4 dark:bg-blue-950/30">
            <p className="text-sm text-blue-900/80 dark:text-blue-100/80">
              💡 <strong>Pro Tip:</strong> Category training helps you prepare
              for game shows where you can choose your categories or need
              balanced knowledge across topics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

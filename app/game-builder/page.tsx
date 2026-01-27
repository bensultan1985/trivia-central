import { IconGameBuilder } from "@/components/icons";

export default async function GameBuilderPage() {
  return (
    <div className="p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 rounded-lg bg-blue-500 p-8 text-white shadow-lg">
          <div className="mb-4 flex items-center gap-4">
            <span className="shrink-0">
              <IconGameBuilder className="h-16 w-16" />
            </span>
            <div>
              <h1 className="text-4xl font-bold">Game Builder</h1>
              <p className="mt-2 text-white/90">
                Create and configure custom trivia games
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Coming Soon!
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            This page will let you build a game by selecting categories, rules,
            and question counts.
          </p>
        </div>
      </div>
    </div>
  );
}

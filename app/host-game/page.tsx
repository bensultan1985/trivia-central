import { IconHostGame } from "@/components/icons";

export default async function HostGamePage() {
  return (
    <div className="p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 rounded-lg bg-blue-500 p-8 text-white shadow-lg">
          <div className="mb-4 flex items-center gap-4">
            <span className="shrink-0">
              <IconHostGame className="h-16 w-16" />
            </span>
            <div>
              <h1 className="text-4xl font-bold">Host Game</h1>
              <p className="mt-2 text-white/90">
                Run a live game for contestants
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Coming Soon!
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            This page will let you host a game session and control pacing.
          </p>
        </div>
      </div>
    </div>
  );
}

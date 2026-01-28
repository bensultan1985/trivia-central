import { IconStrategyGuides } from "@/components/icons";

export default async function StrategyGuidesPage() {
  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 rounded-lg bg-blue-500 p-6 text-white shadow-lg">
          <div className="flex items-center gap-4">
            <span className="shrink-0">
              <IconStrategyGuides className="h-12 w-12" />
            </span>
            <div>
              <h1 className="text-3xl font-bold">Strategy Guides</h1>
              <p className="text-white/90">Level up your gameplay</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Coming Soon!
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Strategy guides will live here.
          </p>
        </div>
      </div>
    </div>
  );
}

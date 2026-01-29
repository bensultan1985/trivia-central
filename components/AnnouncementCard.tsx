import { IconMegaphone } from "./icons";

interface AnnouncementCardProps {
  title: string;
  message: string;
  date?: string;
}

export default function AnnouncementCard({
  title,
  message,
  date,
}: AnnouncementCardProps) {
  return (
    <div className="rounded-lg border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-950/30 p-4 shadow-md">
      <div className="flex items-start gap-3">
        <IconMegaphone className="h-6 w-6 text-purple-600 dark:text-purple-400 shrink-0 mt-1" />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-bold text-purple-900 dark:text-purple-100">
              {title}
            </h3>
            {date && (
              <span className="text-xs text-purple-700 dark:text-purple-300">
                {date}
              </span>
            )}
          </div>
          <p className="text-sm text-purple-800 dark:text-purple-200">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}

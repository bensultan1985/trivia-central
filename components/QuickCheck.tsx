"use client";

import * as React from "react";

type QuickCheckItem = {
  question: string;
  answer: string;
};

type QuickCheckProps = {
  items: QuickCheckItem[];
};

export function QuickCheck({ items }: QuickCheckProps) {
  const [revealed, setRevealed] = React.useState<boolean[]>(() =>
    items.map(() => false),
  );

  React.useEffect(() => {
    setRevealed(items.map(() => false));
  }, [items]);

  if (!items?.length) return null;

  return (
    <div className="space-y-4 rounded-xl bg-gray-50 p-5 ring-1 ring-black/5 dark:bg-gray-900/50 dark:ring-white/10">
      <ol className="space-y-5">
        {items.map((item, idx) => {
          const isRevealed = revealed[idx] ?? false;

          return (
            <li key={idx} className="space-y-2">
              <p className="text-gray-800 dark:text-gray-100 font-medium leading-relaxed">
                {item.question}
              </p>

              <button
                type="button"
                onClick={() =>
                  setRevealed((prev) =>
                    prev.map((v, i) => (i === idx ? !v : v)),
                  )
                }
                className="inline-flex items-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 ring-1 ring-black/10 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-100 dark:ring-white/10 dark:hover:bg-gray-800"
              >
                {isRevealed ? "Hide answer" : "Reveal answer"}
              </button>

              {isRevealed ? (
                <div
                  className="prose prose-slate max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: item.answer ?? "" }}
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

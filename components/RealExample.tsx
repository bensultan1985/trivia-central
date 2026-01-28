"use client";

import * as React from "react";

type RealExampleProps = {
  gameType?: string;
  contestTitle?: string;
  question?: string;
  answer?: string;
  citation?: string;
};

export function RealExample({
  gameType,
  contestTitle,
  question,
  answer,
  citation,
}: RealExampleProps) {
  const [revealed, setRevealed] = React.useState(false);
  const hasQa = Boolean(question) && Boolean(answer);

  return (
    <div className="rounded-xl bg-gradient-to-r from-green-400 to-purple-500 p-[1px]">
      <div className="rounded-xl bg-green-50 p-5 ring-1 ring-black/5 dark:bg-emerald-950/20 dark:ring-white/10">
        <span className="flex flex-wrap items-center gap-2">
          <span className=" ">Topic was referenced on</span>
          <span className="font-semibold text-purple-700"> {contestTitle}</span>
          {contestTitle ? (
            <span>
              <span className="inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-gray-900 ring-1 ring-black/10 dark:bg-gray-900/60 dark:text-gray-100 dark:ring-white/10">
                {gameType ? <span>{gameType} </span> : ""}
              </span>
            </span>
          ) : null}
        </span>

        {question ? (
          <p className="mt-4 text-gray-900 dark:text-gray-100 font-bold leading-relaxed">
            {question}
          </p>
        ) : null}

        {hasQa ? (
          <div className="mt-3">
            <button
              type="button"
              onClick={() => setRevealed((v) => !v)}
              className="inline-flex items-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 ring-1 ring-black/10 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-100 dark:ring-white/10 dark:hover:bg-gray-800"
            >
              {revealed ? "Hide answer" : "Reveal answer"}
            </button>

            {revealed ? (
              <div
                className="mt-3 prose prose-slate max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: answer ?? "" }}
              />
            ) : null}
          </div>
        ) : null}

        {citation ? (
          <div className="mt-4 text-xs text-gray-600 dark:text-gray-300">
            <a
              href={citation}
              target="_blank"
              rel="noreferrer"
              className="hover:underline underline-offset-4"
            >
              Source
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
}

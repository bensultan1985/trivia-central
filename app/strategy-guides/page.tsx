import { IconStrategyGuides } from "@/components/icons";
import { strategyGuides, type StrategyGuide } from "./guides";

type StrategyGuidesPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getGuideCoverImage(guide: StrategyGuide): string | null {
  const directCover = (guide as any)?.guideCoverUrl;
  if (typeof directCover === "string" && directCover.length > 0) {
    return directCover;
  }

  for (const chapter of guide.chapters ?? []) {
    for (const section of chapter.sections ?? []) {
      const maybeImage = (section as any)?.image;
      if (typeof maybeImage === "string" && maybeImage.length > 0) {
        return maybeImage;
      }

      const mediaType = (section as any)?.mediaType;
      const mediaUrl = (section as any)?.mediaUrl;
      if (mediaType === "image" && typeof mediaUrl === "string" && mediaUrl) {
        return mediaUrl;
      }
    }
  }
  return null;
}

function renderMedia(mediaType?: string, mediaUrl?: string) {
  if (!mediaType || !mediaUrl) return null;

  if (mediaType === "image") {
    return (
      <div className="flex justify-center">
        <img
          src={mediaUrl}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="max-h-80 w-auto max-w-full rounded-xl border border-black/5 bg-white"
          alt=""
        />
      </div>
    );
  }

  if (mediaType === "video") {
    const url = mediaUrl.trim();
    const isYouTube =
      url.includes("youtube.com/watch") || url.includes("youtu.be/");

    if (isYouTube) {
      let embedUrl = url;
      try {
        if (url.includes("youtu.be/")) {
          const id = url.split("youtu.be/")[1]?.split(/[?&#]/)[0];
          if (id) embedUrl = `https://www.youtube.com/embed/${id}`;
        } else {
          const u = new URL(url);
          const id = u.searchParams.get("v");
          if (id) embedUrl = `https://www.youtube.com/embed/${id}`;
        }
      } catch {
        // Fall back to a link below.
      }

      if (embedUrl.includes("/embed/")) {
        return (
          <div className="aspect-video w-full overflow-hidden rounded-xl border border-black/5 bg-black">
            <iframe
              src={embedUrl}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              referrerPolicy="no-referrer"
              title="Embedded video"
            />
          </div>
        );
      }
    }

    return (
      <a
        href={mediaUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-black/10 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-100 dark:ring-white/10 dark:hover:bg-gray-800"
      >
        Watch video
      </a>
    );
  }

  return (
    <a
      href={mediaUrl}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-black/10 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-100 dark:ring-white/10 dark:hover:bg-gray-800"
    >
      Open link
    </a>
  );
}

function renderSection(section: any) {
  if (!section) return null;

  if (section.sectionType === "strategy-real-example") {
    return (
      <div className="rounded-xl bg-linear-to-r from-green-400 to-purple-500 p-px">
        <div className="space-y-4 rounded-xl bg-green-50 px-4 py-5 ring-1 ring-black/5 dark:bg-emerald-950/20 dark:ring-white/10 sm:p-5">
          {section.content ? (
            <div
              className="prose prose-slate max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: section.content ?? "" }}
            />
          ) : null}

          {section.mediaType && section.mediaUrl ? (
            <div>{renderMedia(section.mediaType, section.mediaUrl)}</div>
          ) : null}
        </div>
      </div>
    );
  }

  // "standard" (and anything else) — render content if present.
  return section.content ? (
    <div className="space-y-4 rounded-xl bg-orange-100 px-4 py-5 ring-1 ring-black/5 dark:bg-gray-900/50 dark:ring-white/10 sm:p-5">
      <div
        className="prose prose-slate max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: section.content ?? "" }}
      />
      {section.mediaType && section.mediaUrl ? (
        <div>{renderMedia(section.mediaType, section.mediaUrl)}</div>
      ) : null}
    </div>
  ) : null;
}

function renderGuide(guide: StrategyGuide) {
  return (
    <div className="space-y-10">
      <div
        className="bg-white
      p-4 rounded-2xl border-3 border-cyan-700 dark:bg-amber-950/30 dark:border-amber-700"
      >
        <h2 className="text-3xl font-semibold tracking-tight text-cyan-800 dark:text-gray-100">
          The Official Trivia Central Guide to{" "}
          {<span className="font-bold">{guide.title}</span>}
        </h2>
        {guide.subtitle ? (
          <p className="mt-2 text-gray-600 dark:text-gray-300 leading-relaxed">
            <i>{guide.subtitle}</i>
          </p>
        ) : null}
      </div>

      {(guide.chapters ?? []).length ? (
        <div
          className="rounded-xl from bg-amber-50
      bg-linear-to-br from-white via-amber-50 to-amber-100 px-4 py-6 shadow-lg ring-1 ring-black/5 dark:bg-linear-to-br dark:from-slate-950 dark:via-indigo-950 dark:to-slate-900 dark:ring-white/10 sm:p-6"
        >
          <div
            className="mb-4 border-b border-black/10 pb-2 dark:border-white/10
            p-4 rounded-lg
          bg-blue-500 dark:bg-indigo-700"
          >
            <h3 className="text-lg font-semibold text-white dark:text-gray-100">
              Chapters
            </h3>
          </div>
          <ol className="mt-3 ml-4 space-y-2 text-md font-semibold text-blue-500 dark:text-indigo-100">
            {(guide.chapters ?? []).map((chapter: any, idx: number) => {
              const chapterId = `chapter-${idx + 1}`;
              return (
                <li key={idx}>
                  <a
                    href={`#${chapterId}`}
                    className="hover:underline underline-offset-4 dark:hover:text-indigo-200"
                  >
                    {chapter.chapterTitle ?? `Chapter ${idx + 1}`}
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      ) : null}

      {(guide.chapters ?? []).map((chapter: any, idx: number) => (
        <div
          key={idx}
          id={`chapter-${idx + 1}`}
          className="rounded-xl bg-blue-500 px-4 py-6 shadow-lg ring-1 ring-black/5 dark:bg-gray-800 dark:ring-white/10 sm:p-6"
        >
          <div className="space-y-5">
            <div>
              <h3 className="text-2xl font-semibold text-white dark:text-gray-100 border-b-3 pb-5 border-blue-100/20">
                {chapter.chapterTitle}
              </h3>
            </div>

            <div className="space-y-7">
              {(chapter.sections ?? []).map((section: any, sIdx: number) => (
                <section key={sIdx} className="space-y-3 mt-5">
                  {section.header ? (
                    <h4 className="text-lg font-semibold text-white dark:text-gray-100">
                      {section.header}
                    </h4>
                  ) : null}
                  {renderSection(section)}
                </section>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function StrategyGuidesPage({
  searchParams,
}: StrategyGuidesPageProps) {
  const sp = (await searchParams) ?? {};

  const guideRaw = sp.guide;
  const guideParam = Array.isArray(guideRaw) ? guideRaw[0] : guideRaw;
  const requestedGuideIndex =
    typeof guideParam === "string" ? Number.parseInt(guideParam, 10) : NaN;

  const selectedGuideIndex =
    typeof guideParam === "string" && Number.isFinite(requestedGuideIndex)
      ? requestedGuideIndex
      : -1;

  const selectedGuide =
    selectedGuideIndex >= 0 && selectedGuideIndex < strategyGuides.length
      ? strategyGuides[selectedGuideIndex]
      : null;

  return (
    <div className="px-4 py-8 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 rounded-lg bg-blue-500 px-4 py-6 text-white shadow-lg sm:p-6">
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

        {strategyGuides.length > 0 ? (
          <div className="mb-8 rounded-lg bg-white px-4 py-6 shadow-lg dark:bg-gray-800 sm:p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
              Guides
            </h2>
            <div className="-mx-4 flex gap-4 overflow-x-auto pb-2 px-4 sm:-mx-6 sm:px-6">
              {strategyGuides.map((g, idx) => {
                const cover = getGuideCoverImage(g);
                const isActive = idx === selectedGuideIndex;
                const href = `/strategy-guides?guide=${idx}`;

                return (
                  <a
                    key={idx}
                    href={href}
                    className={
                      "relative h-36 w-[85%] shrink-0 overflow-hidden rounded-xl ring-1 transition-colors sm:w-64 sm:m-2 " +
                      (isActive
                        ? "ring-yellow-300 ring-4 "
                        : "ring-black/10 hover:ring-black/20 dark:ring-white/10 dark:hover:ring-white/20")
                    }
                    aria-label={`Open guide: ${g.title}`}
                  >
                    <div
                      className={
                        "absolute inset-0 bg-center bg-cover " +
                        (cover ? "" : "bg-gray-200 dark:bg-gray-700")
                      }
                      style={cover ? { backgroundImage: `url(${cover})` } : {}}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/0" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <div className="text-sm font-semibold text-white leading-snug">
                        {g.title}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        ) : null}

        <div className="rounded-lg bg-amber-300 px-4 py-8 shadow-lg dark:bg-gray-800 sm:p-8">
          {selectedGuide ? (
            renderGuide(selectedGuide)
          ) : (
            <div>
              <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-100">
                Check out one of the strategy guides above.
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {/* Strategy guides will live here. */}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

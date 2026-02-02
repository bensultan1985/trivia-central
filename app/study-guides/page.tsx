import { IconStudyGuides } from "@/components/icons";
import { QuickCheck } from "@/components/QuickCheck";
import { RealExample } from "@/components/RealExample";
import { history as historyGuides } from "./history";
import { media as mediaGuides } from "./media";

type StudyGuidesPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

type Guide = (typeof historyGuides)[number] | (typeof mediaGuides)[number];

function isProbablyUrl(value: string) {
  const v = value.trim().toLowerCase();
  return (
    v.startsWith("http://") || v.startsWith("https://") || v.startsWith("www.")
  );
}

function stripUrls(value: string) {
  const urlRegex = /(https?:\/\/[^\s)\]]+|www\.[^\s)\]]+)/gi;
  return value
    .replace(urlRegex, "")
    .replace(/\(\s*\)/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function getGuideCoverImage(guide: Guide): string | null {
  for (const chapter of guide.chapters ?? []) {
    for (const section of chapter.sections ?? []) {
      const maybeImage = (section as any)?.image;
      if (typeof maybeImage === "string" && maybeImage.length > 0) {
        return maybeImage;
      }
    }
  }
  return null;
}

function renderSection(section: any) {
  if (!section) return null;

  if (section.sectionType === "quick-check") {
    return <QuickCheck items={(section.items ?? []) as any} />;
  }

  if (section.sectionType === "real-example") {
    return (
      <RealExample
        gameType={section.gameType}
        contestTitle={section.contestTitle}
        question={section.question}
        answer={section.answer}
        citation={section.citation}
      />
    );
  }

  if (section.sectionType === "list") {
    return (
      <div className="space-y-4 rounded-xl bg-orange-100 px-4 py-5 ring-1 ring-black/5 dark:bg-gray-900/50 dark:ring-white/10 sm:p-5">
        <div className="space-y-3">
          {section.subHeader ? (
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {section.subHeader}
            </p>
          ) : null}
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-200 leading-relaxed">
            {(section.list ?? []).map((item: any, idx: number) => (
              <li
                key={idx}
                dangerouslySetInnerHTML={{ __html: item.li ?? "" }}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }

  if (section.sectionType === "html") {
    return (
      <div className="space-y-4 rounded-xl bg-orange-100 px-4 py-5 ring-1 ring-black/5 dark:bg-gray-900/50 dark:ring-white/10 sm:p-5">
        <div
          className="prose prose-slate max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: section.html ?? "" }}
        />
      </div>
    );
  }

  // "standard" (and anything else) — render text/image if present.
  const imageCaption =
    typeof section.imageCaption === "string" ? section.imageCaption : "";
  const visibleCaption = imageCaption ? imageCaption : "";

  // Never show URL-only captions; if a caption contains a URL, strip it out.
  // For accessibility, keep alt text human-readable (do not include URLs).
  const imgAlt =
    visibleCaption ||
    (section.header ? String(section.header) : "Study guide image");

  return (
    <div className="space-y-4 rounded-xl bg-orange-100 px-4 py-5 ring-1 ring-black/5 dark:bg-gray-900/50 dark:ring-white/10 sm:p-5">
      {section.subHeader ? (
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {section.subHeader}
        </p>
      ) : null}
      {section.image ? (
        <figure className="space-y-3">
          <div className="flex justify-center">
            <img
              src={section.image}
              aria-disabled="false"
              // alt={imgAlt}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="max-h-80 w-auto max-w-full rounded-xl border border-black/5 bg-white"
            />
          </div>
          {/* {visibleCaption && !isProbablyUrl(imageCaption) ? (
            <figcaption className="text-sm text-gray-500 dark:text-gray-400">
              {visibleCaption}
            </figcaption>
          ) : null} */}
        </figure>
      ) : null}
      {section.text ? (
        <div
          className="prose prose-slate max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: section.text }}
        />
      ) : null}
      {section.emphasisLine ? (
        <div className="rounded-lg bg-white/70 p-4 text-sm text-gray-800 ring-1 ring-black/5 dark:bg-gray-950/30 dark:text-gray-100 dark:ring-white/10">
          <div
            className="leading-relaxed"
            dangerouslySetInnerHTML={{ __html: section.emphasisLine }}
          />
        </div>
      ) : null}
    </div>
  );
}

function renderGuide(guide: Guide) {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          {guide.guideTitle}
        </h2>
      </div>

      {(guide.chapters ?? []).length ? (
        <div className="rounded-xl bg-linear-to-br from-white via-amber-50 to-amber-100 px-4 py-6 shadow-lg ring-1 ring-black/5 dark:bg-linear-to-br dark:from-slate-950 dark:via-indigo-950 dark:to-slate-900 dark:ring-white/10 sm:p-6">
          <div className="mb-4 rounded-lg border-b border-black/10 bg-blue-500 p-4 pb-2 dark:border-white/10 dark:bg-indigo-700">
            <h3 className="text-lg font-semibold text-white dark:text-gray-100">
              Chapters
            </h3>
          </div>
          <ol className="mt-3 space-y-2 text-sm text-gray-700 dark:text-indigo-100">
            {(guide.chapters ?? []).map((chapter: any, idx: number) => {
              const chapterId = `chapter-${idx + 1}`;
              return (
                <li key={idx}>
                  <a
                    href={`#${chapterId}`}
                    className="hover:underline underline-offset-4 dark:hover:text-indigo-200"
                  >
                    {chapter.chapterHeader ?? `Chapter ${idx + 1}`}
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
                {chapter.chapterHeader}
              </h3>
              {chapter.chapterSubHeader ? (
                <p className="mt-2 text-gray-600 dark:text-gray-300 leading-relaxed">
                  {chapter.chapterSubHeader}
                </p>
              ) : null}
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

      {guide.citations?.length ? (
        <div className="pt-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Sources
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-300 wrap-anywhere">
            {guide.citations.map((c: string, idx: number) => (
              <li key={idx} className="leading-relaxed wrap-anywhere">
                {c}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default async function StudyGuidesPage({
  searchParams,
}: StudyGuidesPageProps) {
  const sp = (await searchParams) ?? {};
  const categoryRaw = sp.category;
  const category = Array.isArray(categoryRaw) ? categoryRaw[0] : categoryRaw;

  const guideRaw = sp.guide;
  const guideParam = Array.isArray(guideRaw) ? guideRaw[0] : guideRaw;
  const requestedGuideIndex = guideParam
    ? Number.parseInt(guideParam, 10)
    : NaN;

  const categories = [
    { key: "history", label: "History" },
    { key: "media", label: "Media" },
    // { key: "pop-culture", label: "Pop Culture" },
    // { key: "sports", label: "Sports" },
  ] as const;

  const guidesForCategory: Guide[] =
    category === "history"
      ? (historyGuides as Guide[])
      : category === "media"
        ? (mediaGuides as Guide[])
        : [];

  const selectedGuideIndex = Number.isFinite(requestedGuideIndex)
    ? requestedGuideIndex
    : category
      ? 0
      : -1;

  const selectedGuide =
    selectedGuideIndex >= 0 && selectedGuideIndex < guidesForCategory.length
      ? guidesForCategory[selectedGuideIndex]
      : null;

  return (
    <div className="px-4 py-8 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 rounded-lg bg-blue-500 px-4 py-6 text-white shadow-lg sm:p-6">
          <div className="flex items-center gap-4">
            <span className="shrink-0">
              <IconStudyGuides className="h-12 w-12" />
            </span>
            <div>
              <h1 className="text-3xl font-bold">Study Guides</h1>
              <p className="text-white/90">
                Overviews and timelines with real game show questions
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8 rounded-lg bg-white px-4 py-6 shadow-lg dark:bg-gray-800 sm:p-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
            Choose a category (this feature is a preview - more to come!)
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((c) => {
              const isActive = category === c.key;
              return (
                <a
                  key={c.key}
                  href={`/study-guides?category=${encodeURIComponent(c.key)}`}
                  className={
                    "inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold ring-1 transition-colors " +
                    (isActive
                      ? "bg-blue-500 text-white ring-blue-900/20"
                      : "bg-white text-gray-900 ring-black/10 hover:bg-blue-50 dark:bg-gray-900 dark:text-gray-100 dark:ring-white/10 dark:hover:bg-gray-700")
                  }
                >
                  {c.label}
                </a>
              );
            })}
          </div>
          {!category ? (
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
              {/* Start with History to see a full guide. */}
            </p>
          ) : null}
        </div>

        {category && guidesForCategory.length > 0 ? (
          <div className="mb-8 rounded-lg bg-white px-4 py-6 shadow-lg dark:bg-gray-800 sm:p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
              Guides
            </h2>
            <div className="-mx-4 flex gap-4 overflow-x-auto pb-2 px-4 sm:-mx-6 sm:px-6">
              {guidesForCategory.map((g, idx) => {
                const cover = getGuideCoverImage(g);
                const isActive = idx === selectedGuideIndex;

                const href = `/study-guides?category=${encodeURIComponent(
                  category,
                )}&guide=${idx}`;

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
                    aria-label={`Open guide: ${g.guideTitle}`}
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
                        {g.guideTitle}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        ) : null}

        <div className="rounded-lg bg-amber-300 px-4 py-8 shadow-lg dark:bg-gray-800 sm:p-8">
          {category && !selectedGuide ? (
            <div>
              <h2 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-gray-100">
                Coming soon
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                No guide is wired up for “{category}” yet.
              </p>
            </div>
          ) : selectedGuide ? (
            renderGuide(selectedGuide)
          ) : (
            <div>
              <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-100">
                Select a category above to see available guides.
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {/* Check out one of the study guides above. */}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

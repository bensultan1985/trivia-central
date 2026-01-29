export default async function AboutPage() {
  return (
    <div className="p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-bold text-slate-900 dark:text-slate-50">
          About Trivia Central
        </h1>
        <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-slate-900">
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-slate-50">
                Our Mission
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Trivia Central is designed to help aspiring game show
                contestants and trivia enthusiasts prepare, train, and succeed.
                Whether you're preparing for your first game show audition (yes,
                you have to audition in most cases) or looking to sharpen your
                skills, our platform provides the tools and training you need to
                compete at the highest level.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-slate-50">
                About the Creator
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Trivia Central was created by a two-time game show winner with a
                passion for competitive trivia and game strategy. Through
                personal experience competing on national television, the
                creator developed insights into what it takes to succeed on game
                shows—from the audition process to on-stage performance under
                pressure.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                With a deep interest in game theory, preparation techniques, and
                the psychology of competition, this platform brings together
                years of research and firsthand experience. The goal is to help
                others who share the dream of appearing on game shows by
                providing structured training, strategic insights, and a
                supportive community.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-slate-50">
                What We Offer
              </h2>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2">
                <li>
                  Comprehensive trivia training across multiple categories
                </li>
                <li>Strategy guides for popular game show formats</li>
                <li>Study materials to expand your knowledge base</li>
                <li>
                  Tools to track your progress and identify areas for
                  improvement
                </li>
                <li>
                  Insights into the game show audition and selection process
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-slate-50">
                Join the Journey
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Whether you're a casual trivia fan or a serious competitor,
                Trivia Central is here to help you reach your goals. Train like
                a champion, and maybe we'll see you on TV!
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

type SortOption = "newest" | "oldest" | "correct" | "incorrect";

interface HistoryItem {
  id: string;
  questionId: string;
  question: string;
  correctAnswer: string;
  wrongAnswer1: string;
  wrongAnswer2: string;
  wrongAnswer3: string;
  distractorChoice: number;
  wrongAnswer1Context: string | null;
  wrongAnswer2Context: string | null;
  wrongAnswer3Context: string | null;
  questionContext: string | null;
  answerContext: string | null;
  category: string;
  categoryPath: string | null;
  difficulty: string;
  choiceKey: number;
  isCorrect: boolean;
  answeredAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

export default function HistoryPage() {
  const { isSignedIn, isLoaded } = useUser();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [topLevelCategories, setTopLevelCategories] = useState<string[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 20,
    totalCount: 0,
    totalPages: 0,
  });
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [topCategory, setTopCategory] = useState<string>("");
  const [sort, setSort] = useState<SortOption>("newest");
  const [initialLoading, setInitialLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [clearingAll, setClearingAll] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 250);
    return () => clearTimeout(timeoutId);
  }, [searchInput]);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchHistory();
    } else if (isLoaded && !isSignedIn) {
      setInitialLoading(false);
    }
  }, [
    isLoaded,
    isSignedIn,
    pagination.page,
    pagination.limit,
    debouncedSearch,
    topCategory,
    sort,
  ]);

  const fetchHistory = async () => {
    try {
      setIsFetching(true);
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        search: debouncedSearch,
        ...(topCategory ? { topCategory } : {}),
        sort,
      });
      const response = await fetch(`/api/history?${params}`);
      const data = await response.json();

      if (response.ok) {
        setHistory(data.items);
        setPagination(data.pagination);
        setTopLevelCategories(
          Array.isArray(data.topLevelCategories) ? data.topLevelCategories : [],
        );
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setIsFetching(false);
      setInitialLoading(false);
    }
  };

  const handleClearAll = async () => {
    if (!confirm("Are you sure you want to clear all your question history?")) {
      return;
    }

    try {
      setClearingAll(true);
      const response = await fetch("/api/history", {
        method: "DELETE",
      });

      if (response.ok) {
        setHistory([]);
        setPagination({ ...pagination, totalCount: 0, totalPages: 0 });
      }
    } catch (error) {
      console.error("Error clearing history:", error);
    } finally {
      setClearingAll(false);
    }
  };

  const handleDeleteItem = async (historyId: string) => {
    try {
      const response = await fetch(`/api/history?id=${historyId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Refresh history
        fetchHistory();
      }
    } catch (error) {
      console.error("Error deleting history item:", error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page on search
  };

  if (!isLoaded || (isSignedIn && initialLoading)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              Question History
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Please sign in to view your question history.
            </p>
            <Link
              href="/sign-in"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 rounded-lg bg-blue-500 p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-5xl">📚</span>
              <div>
                <h1 className="text-3xl font-bold">Question History</h1>
                <p className="text-white/90">
                  Review the trivia questions you've answered
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{pagination.totalCount}</div>
              <div className="text-sm text-white/90">Questions Answered</div>
            </div>
          </div>
        </div>

        {/* Search and Clear */}
        <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:items-center">
            <input
              type="text"
              placeholder="Search questions, categories, or answers..."
              value={searchInput}
              onChange={handleSearchChange}
              className="md:col-span-6 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
            />

            <select
              value={topCategory}
              onChange={(e) => {
                setTopCategory(e.target.value);
                setPagination((prev) => ({ ...prev, page: 1 }));
              }}
              className="md:col-span-3 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
              aria-label="Filter by top-level category"
            >
              <option value="">All categories</option>
              {topLevelCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value as SortOption);
                setPagination((prev) => ({ ...prev, page: 1 }));
              }}
              className="md:col-span-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
              aria-label="Sort history"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="correct">Correct first</option>
              <option value="incorrect">Incorrect first</option>
            </select>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            {isFetching ? (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Loading…
              </div>
            ) : (
              <div />
            )}
            <button
              onClick={handleClearAll}
              disabled={clearingAll || history.length === 0}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-bold rounded-lg transition-colors"
            >
              {clearingAll ? "Clearing..." : "Clear All History"}
            </button>
          </div>
        </div>

        {/* History List */}
        {history.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {searchInput
                ? "No questions found matching your search."
                : "You haven't answered any questions yet."}
            </p>
            {!searchInput && (
              <Link
                href="/training/target-practice"
                className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
              >
                Start Training
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {history.map((item) => {
                const borderClass = item.isCorrect
                  ? "border-green-500"
                  : "border-red-500";
                const badgeClass = item.isCorrect
                  ? "bg-green-600 text-white"
                  : "bg-red-600 text-white";
                const badgeText = item.isCorrect ? "✓" : "✕";

                // Determine which answer was selected
                const selectedAnswer =
                  item.choiceKey === 1
                    ? item.correctAnswer
                    : item.choiceKey === 2
                      ? item.wrongAnswer1
                      : item.choiceKey === 3
                        ? item.wrongAnswer2
                        : item.wrongAnswer3;

                // Build answers array with context and distractor info
                const answers = [
                  {
                    text: item.correctAnswer,
                    isCorrect: true,
                    context: item.answerContext,
                    isDistractor: false,
                  },
                  {
                    text: item.wrongAnswer1,
                    isCorrect: false,
                    context: item.wrongAnswer1Context,
                    isDistractor: item.distractorChoice === 1,
                  },
                  {
                    text: item.wrongAnswer2,
                    isCorrect: false,
                    context: item.wrongAnswer2Context,
                    isDistractor: item.distractorChoice === 2,
                  },
                  {
                    text: item.wrongAnswer3,
                    isCorrect: false,
                    context: item.wrongAnswer3Context,
                    isDistractor: item.distractorChoice === 3,
                  },
                ];

                return (
                  <div
                    key={item.id}
                    className={`relative rounded-lg border-2 ${borderClass} bg-white dark:bg-gray-800 shadow-lg p-6`}
                  >
                    <div
                      className={`absolute left-4 top-4 h-7 w-7 rounded-full flex items-center justify-center text-sm font-bold ${badgeClass}`}
                      aria-label={item.isCorrect ? "Correct" : "Incorrect"}
                      title={item.isCorrect ? "Correct" : "Incorrect"}
                    >
                      {badgeText}
                    </div>

                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="absolute right-4 top-4 text-gray-400 hover:text-red-500 transition-colors"
                      title="Delete this entry"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>

                    <div className="pl-10 pr-10">
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        <strong>Category:</strong> {item.category} ·{" "}
                        <strong>Difficulty:</strong> {item.difficulty} ·{" "}
                        <strong>Answered:</strong>{" "}
                        {new Date(item.answeredAt).toLocaleString()}
                      </div>

                      <div className="mt-3 text-base font-bold text-gray-800 dark:text-gray-100">
                        {item.question}
                      </div>

                      {item.questionContext && (
                        <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                          <span className="font-bold">
                            More about this topic:
                          </span>{" "}
                          {item.questionContext}
                        </div>
                      )}

                      <div className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-bold">Your answer:</span>{" "}
                        {selectedAnswer}
                      </div>

                      <div className="mt-4 space-y-3">
                        {answers.map((a, idx) => {
                          const hasContext =
                            typeof a.context === "string" &&
                            a.context.trim().length > 0;
                          const showRow =
                            hasContext || a.isCorrect || a.isDistractor;
                          if (!showRow) return null;

                          return (
                            <div
                              key={idx}
                              className="rounded-md p-3 bg-gray-50 dark:bg-gray-900/30"
                            >
                              {a.isCorrect ? (
                                <div className="text-gray-800 dark:text-gray-100">
                                  <span className="font-bold text-green-600">
                                    Correct:
                                  </span>{" "}
                                  {a.text}
                                </div>
                              ) : (
                                <div className="text-gray-800 dark:text-gray-100 flex items-start gap-2">
                                  <div>
                                    <span className="font-bold text-orange-600">
                                      Incorrect:
                                    </span>{" "}
                                    {a.text}
                                  </div>
                                  {a.isDistractor && (
                                    <span className="relative group inline-flex">
                                      <span className="cursor-help text-xs font-bold text-yellow-600 dark:text-yellow-400">
                                        distractor
                                      </span>
                                      <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-56 -translate-x-1/2 rounded-md border border-gray-200 bg-white px-3 py-2 text-xs text-gray-800 opacity-0 shadow-lg transition-opacity group-hover:opacity-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100">
                                        Wrong answer that sounds plausible.
                                      </span>
                                    </span>
                                  )}
                                </div>
                              )}

                              {hasContext && (
                                <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                                  <span className="font-bold">Context:</span>{" "}
                                  {a.context}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="flex justify-center items-center gap-4">
                  <button
                    onClick={() =>
                      setPagination({
                        ...pagination,
                        page: pagination.page - 1,
                      })
                    }
                    disabled={pagination.page === 1}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold rounded-lg transition-colors"
                  >
                    Previous
                  </button>
                  <span className="text-gray-700 dark:text-gray-300">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setPagination({
                        ...pagination,
                        page: pagination.page + 1,
                      })
                    }
                    disabled={pagination.page === pagination.totalPages}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold rounded-lg transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

import { IconCheck, IconTarget, IconX } from "@/components/icons";

interface Answer {
  text: string;
  isCorrect: boolean;
  choiceKey: 1 | 2 | 3 | 4;
  context?: string | null;
  isDistractor?: boolean;
}

interface Question {
  id: string;
  question: string;
  questionContext?: string | null;
  answers: Answer[];
  category: string;
  categoryPath: string | null;
  difficulty: string;
  engagement: number;
  correctFrequency: number | null;
}

interface GameStats {
  correct: number;
  incorrect: number;
  total: number;
  percentCorrect: number;
}

interface IntuitionStats {
  used: number;
  correct: number;
}

export default function TargetPracticePage() {
  const { isSignedIn, isLoaded } = useUser();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [selectedAnswersByQuestionIndex, setSelectedAnswersByQuestionIndex] =
    useState<Array<number | null>>([]);
  const [lastAnsweredQuestionIndex, setLastAnsweredQuestionIndex] = useState<
    number | null
  >(null);
  const [lastSelectedAnswerIndex, setLastSelectedAnswerIndex] = useState<
    number | null
  >(null);
  const [tipsOpen, setTipsOpen] = useState(true);
  const [totalGuessActive, setTotalGuessActive] = useState(false);
  const [skipRepeats, setSkipRepeats] = useState(true); // Default to true
  const [loadingPreferences, setLoadingPreferences] = useState(false);
  const [gameStats, setGameStats] = useState<GameStats>({
    correct: 0,
    incorrect: 0,
    total: 0,
    percentCorrect: 0,
  });
  const [intuitionStats, setIntuitionStats] = useState<IntuitionStats>({
    used: 0,
    correct: 0,
  });
  const [loading, setLoading] = useState(true);
  const [gameFinished, setGameFinished] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchPreferences();
    }
    fetchQuestions();
  }, [isLoaded, isSignedIn]);

  const fetchPreferences = async () => {
    try {
      const response = await fetch("/api/user/preferences");
      if (response.ok) {
        const data = await response.json();
        setSkipRepeats(data.skipRepeats);
      }
    } catch (error) {
      console.warn("Error fetching preferences:", error);
    }
  };

  const updateSkipRepeats = async (value: boolean) => {
    setSkipRepeats(value);
    if (!isSignedIn) return;

    try {
      setLoadingPreferences(true);
      await fetch("/api/user/preferences", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skipRepeats: value }),
      });
    } catch (error) {
      console.warn("Error updating preferences:", error);
    } finally {
      setLoadingPreferences(false);
    }
  };

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/trivia/questions?count=15");
      const data = await response.json();
      setQuestions(data.questions);
      setSelectedAnswersByQuestionIndex(
        Array.isArray(data.questions)
          ? new Array(data.questions.length).fill(null)
          : [],
      );
      setLastAnsweredQuestionIndex(null);
      setLastSelectedAnswerIndex(null);
      setTipsOpen(true);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setLoading(false);
    }
  };

  const recordAnswer = async (questionId: string, choiceKey: 1 | 2 | 3 | 4) => {
    try {
      await fetch("/api/trivia/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId, choiceKey }),
      });
    } catch (error) {
      console.warn("Failed to record answer:", error);
    }
  };

  const handleAnswerClick = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // Already answered

    setSelectedAnswer(answerIndex);
    setSelectedAnswersByQuestionIndex((prev) => {
      const next = prev.length > 0 ? [...prev] : [];
      next[currentQuestionIndex] = answerIndex;
      return next;
    });
    setShowFeedback(true);
    setLastAnsweredQuestionIndex(currentQuestionIndex);
    setLastSelectedAnswerIndex(answerIndex);

    const selected = questions[currentQuestionIndex].answers[answerIndex];
    const isCorrect = selected.isCorrect;

    const wasTotalGuess = totalGuessActive;
    setTotalGuessActive(false);

    if (wasTotalGuess) {
      setIntuitionStats((prev) => ({
        used: prev.used + 1,
        correct: prev.correct + (isCorrect ? 1 : 0),
      }));
    }

    // Fire-and-forget DB update (engagement + choice count)
    void recordAnswer(questions[currentQuestionIndex].id, selected.choiceKey);

    // Update stats
    setGameStats((prev) => {
      const newCorrect = prev.correct + (isCorrect ? 1 : 0);
      const newIncorrect = prev.incorrect + (isCorrect ? 0 : 1);
      const newTotal = prev.total + 1;
      return {
        correct: newCorrect,
        incorrect: newIncorrect,
        total: newTotal,
        percentCorrect: Math.round((newCorrect / newTotal) * 100),
      };
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setTotalGuessActive(false);
    } else {
      setGameFinished(true);
    }
  };

  const handlePlayAgain = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setSelectedAnswersByQuestionIndex([]);
    setLastAnsweredQuestionIndex(null);
    setLastSelectedAnswerIndex(null);
    setTipsOpen(true);
    setTotalGuessActive(false);
    setGameStats({ correct: 0, incorrect: 0, total: 0, percentCorrect: 0 });
    setIntuitionStats({ used: 0, correct: 0 });
    setGameFinished(false);
    setShowFeedback(false);
    fetchQuestions();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl">Loading questions...</div>
      </div>
    );
  }

  if (gameFinished) {
    const intuitionScore =
      intuitionStats.used > 0
        ? Math.round((intuitionStats.correct / intuitionStats.used) * 100)
        : null;

    const items = questions.map((q, index) => {
      const selectedIndex = selectedAnswersByQuestionIndex[index];
      const selected =
        selectedIndex != null ? (q.answers[selectedIndex] ?? null) : null;
      const isCorrect = selected?.isCorrect ?? false;

      const borderClass = isCorrect ? "border-green-500" : "border-red-500";
      const badgeClass = isCorrect
        ? "bg-green-600 text-white"
        : "bg-red-600 text-white";
      const badgeIcon = isCorrect ? (
        <IconCheck className="h-4 w-4" />
      ) : (
        <IconX className="h-4 w-4" />
      );

      return (
        <div
          key={q.id}
          className={`relative rounded-lg border-2 ${borderClass} bg-white dark:bg-gray-800 shadow-lg p-6`}
        >
          <div
            className={`absolute left-4 top-4 h-7 w-7 rounded-full flex items-center justify-center text-sm font-bold ${badgeClass}`}
            aria-label={isCorrect ? "Correct" : "Incorrect"}
            title={isCorrect ? "Correct" : "Incorrect"}
          >
            {badgeIcon}
          </div>

          <div className="pl-10">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <strong>Category:</strong> {q.category} ·{" "}
              <strong>Difficulty:</strong> {q.difficulty}
            </div>

            <div className="mt-3 text-base font-bold text-gray-800 dark:text-gray-100">
              {q.question}
            </div>

            {q.questionContext && (
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                <span className="font-bold">More about this topic:</span>{" "}
                {q.questionContext}
              </div>
            )}

            <div className="mt-4 space-y-3">
              {q.answers.map((a, idx) => {
                const hasContext =
                  typeof a.context === "string" && a.context.trim().length > 0;
                const showRow = hasContext || a.isCorrect || a.isDistractor;
                if (!showRow) return null;

                const isUserSelection = selectedIndex === idx;

                return (
                  <div
                    key={idx}
                    className={`rounded-md p-3 ${
                      isUserSelection
                        ? "bg-blue-50 dark:bg-blue-950/30"
                        : "bg-transparent"
                    }`}
                  >
                    {a.isCorrect ? (
                      <div className="text-gray-800 dark:text-gray-100">
                        <span className="font-bold text-green-600">
                          Correct
                        </span>{" "}
                        {a.text}
                      </div>
                    ) : (
                      <div className="text-gray-800 dark:text-gray-100 flex items-start gap-2">
                        <div>
                          <span className="font-bold text-orange-600 ">
                            Incorrect
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
                        <span className="font-bold">Context:</span> {a.context}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 rounded-lg bg-blue-500 p-8 text-white shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <span className="shrink-0">
                <IconTarget className="h-16 w-16" />
              </span>
              <div>
                <h1 className="text-4xl font-bold">Game Complete!</h1>
                <p className="mt-2 text-white/90">
                  Great job on completing the round!
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
              Final Stats
            </h2>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-green-600 dark:text-green-400">
                  {gameStats.correct}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Correct Answers
                </div>
              </div>

              <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-red-600 dark:text-red-400">
                  {gameStats.incorrect}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Incorrect Answers
                </div>
              </div>
            </div>

            <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-8 text-center mb-8">
              <div className="text-5xl font-bold text-blue-600 dark:text-blue-400">
                {gameStats.percentCorrect}%
              </div>
              <div className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                Accuracy Rate
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center mb-8 border border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Intuition Score
              </div>
              <div className="mt-1 text-3xl font-bold text-gray-800 dark:text-gray-100">
                {intuitionScore === null ? "N/A" : `${intuitionScore}%`}
              </div>
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                {intuitionScore === null
                  ? "Use Total Guess at least once to calculate this."
                  : `Based on ${intuitionStats.used} total guess${
                      intuitionStats.used === 1 ? "" : "es"
                    } (${intuitionStats.correct} correct).`}
              </div>
            </div>

            <div className="space-y-4 mb-8">{items}</div>

            <div className="text-center">
              <button
                onClick={handlePlayAgain}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
              >
                Train Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) return null;

  // Top-level category (geography, media, sports, etc.)
  const topLevelCategory = currentQuestion.category;

  const intuitionScore =
    intuitionStats.used > 0
      ? Math.round((intuitionStats.correct / intuitionStats.used) * 100)
      : null;

  const tipsQuestion =
    lastAnsweredQuestionIndex === null
      ? null
      : (questions[lastAnsweredQuestionIndex] ?? null);

  const lastAnswerWasCorrect =
    tipsQuestion && lastSelectedAnswerIndex !== null
      ? (tipsQuestion.answers[lastSelectedAnswerIndex]?.isCorrect ?? null)
      : null;

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 rounded-lg bg-blue-500 p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="shrink-0">
                <IconTarget className="h-12 w-12" />
              </span>
              <div>
                <h1 className="text-3xl font-bold">Target Practice</h1>
                <p className="text-white/90">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">
                {gameStats.percentCorrect}%
              </div>
              <div className="text-sm text-white/90">Accuracy</div>
            </div>
          </div>
        </div>

        {/* Settings Panel */}
        {isSignedIn && (
          <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={skipRepeats}
                onChange={(e) => updateSkipRepeats(e.target.checked)}
                disabled={loadingPreferences}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700 dark:text-gray-300">
                Do not repeat past trivia{" "}
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  (only show questions you haven't answered yet)
                </span>
              </span>
            </label>
          </div>
        )}

        {/* Main Content - 3 Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Question Panel - Spans 2 columns on large screens */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-6">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
                {currentQuestion.question}
              </h2>

              <div className="space-y-3">
                {currentQuestion.answers.map((answer, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = answer.isCorrect;

                  let buttonClasses =
                    "w-full text-left p-4 rounded-lg border-2 transition-all font-medium ";

                  if (selectedAnswer === null) {
                    // Before answering
                    buttonClasses +=
                      "border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-600";
                  } else {
                    // After answering
                    if (isSelected && isCorrect) {
                      // Selected correct answer - blue/yellow theme
                      buttonClasses +=
                        "border-yellow-500 bg-gradient-to-r from-blue-500 to-yellow-500 text-white";
                    } else if (isSelected && !isCorrect) {
                      // Selected wrong answer - red
                      buttonClasses += "border-red-500 bg-red-500 text-white";
                    } else if (!isSelected && isCorrect) {
                      // Not selected but correct - yellow
                      buttonClasses +=
                        "border-yellow-500 bg-yellow-400 text-gray-900 font-bold";
                    } else {
                      // Not selected and not correct
                      buttonClasses +=
                        "border-gray-300 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 opacity-50";
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerClick(index)}
                      disabled={selectedAnswer !== null}
                      className={buttonClasses}
                    >
                      {answer.text}
                    </button>
                  );
                })}
              </div>

              {selectedAnswer === null && (
                <div className="mt-5">
                  <div className="mb-3 rounded-lg bg-blue-50 p-3 text-sm text-blue-900/80 dark:bg-blue-950/30 dark:text-blue-100/80">
                    If you have no clue about the answer, click 'Total Guess'
                    and then answer. This will be part of your "intuition
                    score".
                  </div>
                  <button
                    type="button"
                    onClick={() => setTotalGuessActive((v) => !v)}
                    className={`w-full rounded-lg border-2 px-4 py-3 font-bold transition-colors ${
                      totalGuessActive
                        ? "border-blue-600 bg-blue-600 text-white hover:bg-blue-700"
                        : "border-gray-300 bg-white text-gray-800 hover:border-blue-500 hover:bg-blue-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
                    }`}
                  >
                    Total Guess{totalGuessActive ? " (On)" : ""}
                  </button>
                </div>
              )}

              {showFeedback && (
                <div className="mt-6">
                  <button
                    onClick={handleNextQuestion}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors"
                  >
                    {currentQuestionIndex < questions.length - 1
                      ? "Next Question"
                      : "View Results"}
                  </button>
                </div>
              )}
            </div>

            {/* Tips Panel */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <button
                type="button"
                onClick={() => setTipsOpen((v) => !v)}
                className="w-full flex items-center justify-between"
              >
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                  Question Review:
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {tipsOpen ? "Hide" : "Show"}
                </span>
              </button>

              {tipsOpen && (
                <div className="mt-4">
                  {tipsQuestion && lastAnswerWasCorrect !== null ? (
                    <>
                      <div className="mb-3">
                        <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          {lastAnswerWasCorrect
                            ? "🎉 Correct!"
                            : "💡 Keep Practicing!"}
                        </div>
                        <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                          {/* {lastAnswerWasCorrect
                            ? "Great job! You got it right!"
                            : "Don't worry - every mistake is a learning opportunity."} */}
                        </div>
                      </div>

                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <p>
                          <strong>Category:</strong> {tipsQuestion.category}
                        </p>
                        <p>
                          <strong>Difficulty:</strong> {tipsQuestion.difficulty}
                        </p>
                      </div>

                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        {/* <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Previous Question
                        </div> */}
                        <div className="text-sm font-bold text-gray-800 dark:text-gray-100">
                          {tipsQuestion.question}
                        </div>
                        {tipsQuestion.questionContext && (
                          <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            <span className="font-bold">
                              More about this topic:
                            </span>{" "}
                            {tipsQuestion.questionContext}
                          </div>
                        )}

                        <div className="mt-4 space-y-3">
                          {tipsQuestion.answers.map((a, idx) => {
                            const hasContext =
                              typeof a.context === "string" &&
                              a.context.trim().length > 0;
                            const showRow =
                              hasContext || a.isCorrect || a.isDistractor;
                            if (!showRow) return null;

                            return (
                              <div key={idx} className="text-sm">
                                {a.isCorrect ? (
                                  <div className="text-gray-800 dark:text-gray-100">
                                    <span className="font-bold text-green-600">
                                      Correct
                                    </span>{" "}
                                    {a.text}
                                  </div>
                                ) : (
                                  <div className="text-gray-800 dark:text-gray-100 flex items-start gap-2">
                                    <div>
                                      <span className="font-bold text-orange-600 ">
                                        Incorrect
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
                                  <div className="mt-1 text-gray-600 dark:text-gray-300">
                                    <span className="font-bold">Context:</span>{" "}
                                    {a.context}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Answer a question to see the question and answer context
                      here.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Stats Panel - Right sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sticky top-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                Your Stats
              </h3>

              <div className="space-y-4">
                <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Correct
                    </span>
                    <span className="text-lg font-bold text-green-600 dark:text-green-400">
                      {gameStats.correct}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Incorrect
                    </span>
                    <span className="text-lg font-bold text-red-600 dark:text-red-400">
                      {gameStats.incorrect}
                    </span>
                  </div>
                </div>

                <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {gameStats.percentCorrect}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Accuracy
                    </div>
                  </div>
                </div>

                <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Intuition Score
                    </span>
                    <span className="text-lg font-bold text-gray-800 dark:text-gray-100">
                      {intuitionScore === null ? "N/A" : `${intuitionScore}%`}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {intuitionScore === null
                      ? ""
                      : `Based on ${intuitionStats.used} total guess${
                          intuitionStats.used === 1 ? "" : "es"
                        }.`}
                  </div>
                </div>

                {showFeedback && (
                  <>
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
                      <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Question Details
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        <p>
                          <strong>Category:</strong> {topLevelCategory}
                        </p>
                        <p>
                          <strong>Engagement:</strong>{" "}
                          {currentQuestion.engagement}
                        </p>
                        {currentQuestion.engagement > 4 &&
                          currentQuestion.correctFrequency !== null && (
                            <p>
                              <strong>Players correct:</strong>{" "}
                              {currentQuestion.correctFrequency}%
                            </p>
                          )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

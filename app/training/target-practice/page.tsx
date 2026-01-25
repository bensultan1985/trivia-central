"use client";

import { useState, useEffect } from "react";

interface Answer {
  text: string;
  isCorrect: boolean;
  choiceKey: 1 | 2 | 3 | 4;
}

interface Question {
  id: string;
  question: string;
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
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [totalGuessActive, setTotalGuessActive] = useState(false);
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
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/trivia/questions?count=15");
      const data = await response.json();
      setQuestions(data.questions);
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
    setShowFeedback(true);

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

    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 rounded-lg bg-blue-500 p-8 text-white shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-6xl">🎯</span>
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

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 rounded-lg bg-blue-500 p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-5xl">🎯</span>
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
            {showFeedback && selectedAnswer !== null && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-bold mb-3 text-gray-800 dark:text-gray-100">
                  {questions[currentQuestionIndex].answers[selectedAnswer]
                    .isCorrect
                    ? "🎉 Correct!"
                    : "💡 Keep Practicing!"}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  {questions[currentQuestionIndex].answers[selectedAnswer]
                    .isCorrect
                    ? "Great job! You got it right!"
                    : "Don't worry - every mistake is a learning opportunity."}
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <p>
                    <strong>Category:</strong> {topLevelCategory}
                  </p>
                  <p>
                    <strong>Difficulty:</strong> {currentQuestion.difficulty}
                  </p>
                </div>
              </div>
            )}
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

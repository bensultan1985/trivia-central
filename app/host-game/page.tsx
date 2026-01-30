"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { IconHostGame } from "@/components/icons";

interface Question {
  id: string;
  question: string;
  answer1?: string;
  answer2?: string;
  answer3?: string;
  answer4?: string;
  correctAnswer: number;
  answers?: Array<{
    text: string;
    isCorrect: boolean;
    choiceKey: number;
  }>;
}

interface Game {
  id: string;
  name: string;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
}

type GameMode = "menu" | "playing" | "ended";

export default function HostGamePage() {
  const { isSignedIn, isLoaded } = useUser();
  const [gameMode, setGameMode] = useState<GameMode>("menu");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  
  // Modals
  const [showMyGamesModal, setShowMyGamesModal] = useState(false);
  const [showCustomGameModal, setShowCustomGameModal] = useState(false);
  const [savedGames, setSavedGames] = useState<Game[]>([]);
  const [loadingGames, setLoadingGames] = useState(false);
  const [customQuestionCount, setCustomQuestionCount] = useState(10);

  // Fetch saved games when modal opens
  useEffect(() => {
    if (showMyGamesModal && isSignedIn) {
      fetchGames();
    }
  }, [showMyGamesModal, isSignedIn]);

  const fetchGames = async () => {
    setLoadingGames(true);
    try {
      const response = await fetch("/api/games");
      if (response.ok) {
        const data = await response.json();
        setSavedGames(data.games || []);
      }
    } catch (error) {
      console.error("Error fetching games:", error);
    } finally {
      setLoadingGames(false);
    }
  };

  const startQuickGame = async () => {
    await startGame(10);
  };

  const startCustomGame = async () => {
    setShowCustomGameModal(false);
    await startGame(customQuestionCount);
  };

  const startSavedGame = async (game: Game) => {
    setShowMyGamesModal(false);
    setQuestions(game.questions);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setScore(0);
    setGameMode("playing");
  };

  const startGame = async (count: number) => {
    try {
      const response = await fetch(`/api/trivia/questions?count=${count}`);
      if (response.ok) {
        const data = await response.json();
        setQuestions(data.questions || []);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setShowAnswer(false);
        setScore(0);
        setGameMode("playing");
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleAnswerClick = (answerIndex: number) => {
    if (showAnswer) return;
    setSelectedAnswer(answerIndex);
  };

  const handleShowAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    let isCorrect = false;
    
    if (currentQuestion.answers) {
      // Questions from API with shuffled answers
      const selectedAnswerObj = currentQuestion.answers.find(a => a.choiceKey === selectedAnswer);
      isCorrect = selectedAnswerObj?.isCorrect || false;
    } else {
      // Questions from saved games
      isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    }
    
    if (isCorrect) {
      setScore(score + 1);
    }
    setShowAnswer(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    } else {
      setGameMode("ended");
    }
  };

  const returnToMenu = () => {
    setGameMode("menu");
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setScore(0);
  };

  const incrementQuestionCount = () => {
    if (customQuestionCount < 50) {
      setCustomQuestionCount(customQuestionCount + 1);
    }
  };

  const decrementQuestionCount = () => {
    if (customQuestionCount > 1) {
      setCustomQuestionCount(customQuestionCount - 1);
    }
  };

  const getAnswerOptions = (question: Question) => {
    if (question.answers) {
      // API questions with shuffled answers
      return question.answers.map((answer, index) => ({
        text: answer.text,
        key: answer.choiceKey,
        isCorrect: answer.isCorrect,
      }));
    } else {
      // Saved game questions
      const options = [];
      if (question.answer1) options.push({ text: question.answer1, key: 1, isCorrect: question.correctAnswer === 1 });
      if (question.answer2) options.push({ text: question.answer2, key: 2, isCorrect: question.correctAnswer === 2 });
      if (question.answer3) options.push({ text: question.answer3, key: 3, isCorrect: question.correctAnswer === 3 });
      if (question.answer4) options.push({ text: question.answer4, key: 4, isCorrect: question.correctAnswer === 4 });
      return options;
    }
  };

  // Menu view
  if (gameMode === "menu") {
    return (
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-0 rounded-lg bg-orange-400 p-6 pb-2 text-white shadow-lg">
            <div className="mb-4 flex items-center gap-4">
              <span className="shrink-0">
                <IconHostGame className="h-16 w-16" />
              </span>
              <div>
                <h1 className="text-4xl font-bold">Host Game</h1>
                <p className="mt-2 text-white/90">
                  Run a live game for contestants
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800 mt-8">
            <h2 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-gray-100">
              Choose a Game Mode
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quick Start */}
              <button
                onClick={startQuickGame}
                className="p-8 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-lg transition-colors text-left"
              >
                <h3 className="text-2xl font-bold mb-2">Quick Start</h3>
                <p className="text-white/90">Start a 10-question game instantly</p>
              </button>

              {/* My Games */}
              <button
                onClick={() => setShowMyGamesModal(true)}
                disabled={!isLoaded || !isSignedIn}
                className="p-8 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg shadow-lg transition-colors text-left"
              >
                <h3 className="text-2xl font-bold mb-2">My Games</h3>
                <p className="text-white/90">
                  {!isLoaded ? "Loading..." : !isSignedIn ? "Sign in to access your saved games" : "Load a saved game from the builder"}
                </p>
              </button>

              {/* Custom Game */}
              <button
                onClick={() => setShowCustomGameModal(true)}
                className="p-8 bg-purple-500 hover:bg-purple-600 text-white rounded-lg shadow-lg transition-colors text-left"
              >
                <h3 className="text-2xl font-bold mb-2">Custom Game</h3>
                <p className="text-white/90">Choose the number of questions (1-50)</p>
              </button>

              {/* Millionaire Style */}
              <button
                disabled
                className="p-8 bg-gray-400 cursor-not-allowed text-white rounded-lg shadow-lg text-left"
              >
                <h3 className="text-2xl font-bold mb-2">Millionaire Style</h3>
                <p className="text-white/90">Coming soon...</p>
              </button>
            </div>
          </div>

          {/* My Games Modal */}
          {showMyGamesModal && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
              onClick={() => setShowMyGamesModal(false)}
            >
              <div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                  My Games
                </h2>
                {loadingGames ? (
                  <div className="text-center py-8">Loading...</div>
                ) : savedGames.length === 0 ? (
                  <div className="text-center py-8 text-gray-600 dark:text-gray-300">
                    No saved games found
                  </div>
                ) : (
                  <div className="space-y-3">
                    {savedGames.map((game) => (
                      <div
                        key={game.id}
                        className="flex items-center justify-between p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 dark:text-gray-100">
                            {game.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {game.questions.length} questions · Updated{" "}
                            {new Date(game.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => startSavedGame(game)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
                          >
                            Open
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setShowMyGamesModal(false)}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Custom Game Modal */}
          {showCustomGameModal && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
              onClick={() => setShowCustomGameModal(false)}
            >
              <div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                  Custom Game
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Select the number of questions for your game
                </p>
                
                <div className="flex items-center justify-center gap-6 mb-8">
                  <button
                    onClick={decrementQuestionCount}
                    disabled={customQuestionCount <= 1}
                    className="w-12 h-12 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white text-2xl font-bold rounded-lg transition-colors"
                  >
                    ←
                  </button>
                  
                  <div className="text-center">
                    <div className="text-5xl font-bold text-gray-800 dark:text-gray-100">
                      {customQuestionCount}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      questions
                    </div>
                  </div>
                  
                  <button
                    onClick={incrementQuestionCount}
                    disabled={customQuestionCount >= 50}
                    className="w-12 h-12 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white text-2xl font-bold rounded-lg transition-colors"
                  >
                    →
                  </button>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowCustomGameModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={startCustomGame}
                    className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors"
                  >
                    Start Game
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Playing view
  if (gameMode === "playing" && questions.length > 0) {
    const currentQuestion = questions[currentQuestionIndex];
    const answerOptions = getAnswerOptions(currentQuestion);
    
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 rounded-lg bg-orange-400 p-4 text-white shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">Host Game</h1>
                <p className="text-white/90">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{score}</div>
                <div className="text-sm text-white/90">Score</div>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8">
              {currentQuestion.question}
            </h2>

            <div className="space-y-4 mb-8">
              {answerOptions.map((option, index) => {
                const isSelected = selectedAnswer === option.key;
                const showCorrect = showAnswer && option.isCorrect;
                const showIncorrect = showAnswer && isSelected && !option.isCorrect;
                
                return (
                  <button
                    key={option.key}
                    onClick={() => handleAnswerClick(option.key)}
                    disabled={showAnswer}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                      showCorrect
                        ? "bg-green-100 border-green-500 text-green-900 dark:bg-green-900 dark:text-green-100"
                        : showIncorrect
                        ? "bg-red-100 border-red-500 text-red-900 dark:bg-red-900 dark:text-red-100"
                        : isSelected
                        ? "bg-blue-100 border-blue-500 text-blue-900 dark:bg-blue-900 dark:text-blue-100"
                        : "bg-gray-50 border-gray-300 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100"
                    }`}
                  >
                    {option.text}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-4">
              {!showAnswer ? (
                <button
                  onClick={handleShowAnswer}
                  disabled={selectedAnswer === null}
                  className="flex-1 px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-bold rounded-lg transition-colors"
                >
                  Show Answer
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="flex-1 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-colors"
                >
                  {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Game"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // End screen
  if (gameMode === "ended") {
    const totalQuestions = questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    const didWell = percentage >= 50;

    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 rounded-lg bg-orange-400 p-6 text-white shadow-lg">
            <div className="text-center">
              <h1 className="text-4xl font-bold">Game Complete!</h1>
            </div>
          </div>

          <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800 text-center">
            <div className="mb-8">
              <div className="text-6xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                {score}/{totalQuestions}
              </div>
              <div className="text-4xl font-bold text-gray-600 dark:text-gray-400">
                {percentage}%
              </div>
            </div>

            <div className="mb-8">
              {didWell ? (
                <div className="text-2xl font-semibold text-green-600 dark:text-green-400">
                  🎉 Congratulations! Great job!
                </div>
              ) : (
                <div className="text-2xl font-semibold text-orange-600 dark:text-orange-400">
                  Keep practicing! You'll do better next time.
                </div>
              )}
            </div>

            <button
              onClick={returnToMenu}
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold rounded-lg transition-colors"
            >
              Host Another Game
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

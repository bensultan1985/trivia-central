"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { IconGameBuilder } from "@/components/icons";

interface Question {
  id?: string;
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  correctAnswer: number;
}

interface Game {
  id: string;
  name: string;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
}

export default function GameBuilderPage() {
  const { isSignedIn, isLoaded } = useUser();
  const [currentGame, setCurrentGame] = useState<Game | null>(null);
  const [questions, setQuestions] = useState<Question[]>([
    {
      question: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      correctAnswer: 1,
    },
  ]);
  const [gameName, setGameName] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [savedGames, setSavedGames] = useState<Game[]>([]);
  const [loadingGames, setLoadingGames] = useState(false);

  // Fetch saved games when modal opens
  useEffect(() => {
    if (showLoadModal && isSignedIn) {
      fetchGames();
    }
  }, [showLoadModal, isSignedIn]);

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const fetchGames = async () => {
    try {
      setLoadingGames(true);
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

  const addQuestion = () => {
    if (questions.length >= 50) {
      alert("Maximum of 50 questions allowed");
      return;
    }
    setQuestions([
      ...questions,
      {
        question: "",
        answer1: "",
        answer2: "",
        answer3: "",
        answer4: "",
        correctAnswer: 1,
      },
    ]);
    setHasUnsavedChanges(true);
  };

  const removeQuestion = (index: number) => {
    if (questions.length <= 1) {
      alert("At least one question is required");
      return;
    }
    setQuestions(questions.filter((_, i) => i !== index));
    setHasUnsavedChanges(true);
  };

  const updateQuestion = (index: number, field: keyof Question, value: any) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    setQuestions(updated);
    setHasUnsavedChanges(true);
  };

  const shuffleAnswers = () => {
    const shuffled = questions.map((q) => {
      // Build answers array with their indices
      const answers = [
        { text: q.answer1, index: 1 },
        { text: q.answer2, index: 2 },
        { text: q.answer3, index: 3 },
        { text: q.answer4, index: 4 },
      ].filter((a) => a.text); // Only include non-empty answers

      // Shuffle
      for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
      }

      // Find where correct answer ended up
      const correctAnswerText =
        q.correctAnswer === 1
          ? q.answer1
          : q.correctAnswer === 2
            ? q.answer2
            : q.correctAnswer === 3
              ? q.answer3
              : q.answer4;

      const newCorrectIndex =
        answers.findIndex((a) => a.text === correctAnswerText) + 1;

      return {
        ...q,
        answer1: answers[0]?.text || "",
        answer2: answers[1]?.text || "",
        answer3: answers[2]?.text || "",
        answer4: answers[3]?.text || "",
        correctAnswer: newCorrectIndex,
      };
    });

    setQuestions(shuffled);
    setHasUnsavedChanges(true);
  };

  const canSave = () => {
    return questions.some(
      (q) => q.question.trim() && q.answer1.trim() && q.answer2.trim(),
    );
  };

  const handleSave = async () => {
    if (!canSave()) {
      alert("At least one complete question is required to save");
      return;
    }

    if (!currentGame && !gameName.trim()) {
      setShowSaveModal(true);
      return;
    }

    await saveGame();
  };

  const saveGame = async () => {
    try {
      setIsSaving(true);
      const name = currentGame?.name || gameName.trim();

      if (!name) {
        alert("Game name is required");
        return;
      }

      // Filter out incomplete questions
      const completeQuestions = questions.filter(
        (q) => q.question.trim() && q.answer1.trim() && q.answer2.trim(),
      );

      if (completeQuestions.length === 0) {
        alert("At least one complete question is required");
        return;
      }

      const payload = {
        id: currentGame?.id,
        name,
        questions: completeQuestions,
      };

      const response = await fetch("/api/games", {
        method: currentGame ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentGame(data.game);
        setGameName(data.game.name);
        setHasUnsavedChanges(false);
        setShowSaveModal(false);
        alert("Game saved successfully!");
      } else {
        const error = await response.json();
        alert(`Failed to save: ${error.error}`);
      }
    } catch (error) {
      console.error("Error saving game:", error);
      alert("Failed to save game");
    } finally {
      setIsSaving(false);
    }
  };

  const loadGame = (game: Game) => {
    if (
      hasUnsavedChanges &&
      !confirm("You have unsaved changes. Are you sure you want to load another game?")
    ) {
      return;
    }

    setCurrentGame(game);
    setGameName(game.name);
    setQuestions(
      game.questions.map((q) => ({
        question: q.question,
        answer1: q.answer1,
        answer2: q.answer2,
        answer3: q.answer3 || "",
        answer4: q.answer4 || "",
        correctAnswer: q.correctAnswer,
      })),
    );
    setHasUnsavedChanges(false);
    setShowLoadModal(false);
  };

  const deleteGame = async (gameId: string) => {
    if (!confirm("Are you sure you want to delete this game?")) {
      return;
    }

    try {
      const response = await fetch(`/api/games?id=${gameId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchGames();
        if (currentGame?.id === gameId) {
          setCurrentGame(null);
          setGameName("");
          setQuestions([
            {
              question: "",
              answer1: "",
              answer2: "",
              answer3: "",
              answer4: "",
              correctAnswer: 1,
            },
          ]);
          setHasUnsavedChanges(false);
        }
      }
    } catch (error) {
      console.error("Error deleting game:", error);
      alert("Failed to delete game");
    }
  };

  const newGame = () => {
    if (
      hasUnsavedChanges &&
      !confirm("You have unsaved changes. Are you sure you want to start a new game?")
    ) {
      return;
    }

    setCurrentGame(null);
    setGameName("");
    setQuestions([
      {
        question: "",
        answer1: "",
        answer2: "",
        answer3: "",
        answer4: "",
        correctAnswer: 1,
      },
    ]);
    setHasUnsavedChanges(false);
  };

  if (!isLoaded) {
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
              Game Builder
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Please sign in to create and manage your trivia games.
            </p>
            <Link
              href="/sign-in?returnTo=%2Fgame-builder"
              className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
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
        <div className="mb-6 rounded-lg bg-orange-400 p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="shrink-0">
                <IconGameBuilder className="h-12 w-12" />
              </span>
              <div>
                <h1 className="text-3xl font-bold">Game Builder</h1>
                <p className="text-white/90">
                  Create custom trivia games with your own questions
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
          <div className="flex flex-wrap gap-3 items-center">
            <button
              onClick={newGame}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors"
            >
              New Game
            </button>
            <button
              onClick={() => setShowLoadModal(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
            >
              Load Game
            </button>
            <button
              onClick={handleSave}
              disabled={!canSave() || isSaving}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-bold rounded-lg transition-colors"
            >
              {isSaving ? "Saving..." : "Save Game"}
            </button>
            <button
              onClick={shuffleAnswers}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors"
            >
              Shuffle Answers
            </button>
            <div className="ml-auto text-sm text-gray-600 dark:text-gray-300">
              {currentGame && (
                <span className="font-bold">Editing: {currentGame.name}</span>
              )}
              {hasUnsavedChanges && (
                <span className="ml-2 text-orange-600">● Unsaved changes</span>
              )}
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((q, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  Question {index + 1}
                </h3>
                <button
                  onClick={() => removeQuestion(index)}
                  className="text-red-600 hover:text-red-700 font-bold"
                  disabled={questions.length <= 1}
                >
                  Remove
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    Question
                  </label>
                  <input
                    type="text"
                    value={q.question}
                    onChange={(e) =>
                      updateQuestion(index, "question", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-gray-100"
                    placeholder="Enter your question"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                      Answer 1{" "}
                      <span className="text-red-600">* (Required)</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="radio"
                        name={`correct-${index}`}
                        checked={q.correctAnswer === 1}
                        onChange={() =>
                          updateQuestion(index, "correctAnswer", 1)
                        }
                        className="mt-1"
                      />
                      <input
                        type="text"
                        value={q.answer1}
                        onChange={(e) =>
                          updateQuestion(index, "answer1", e.target.value)
                        }
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-gray-100"
                        placeholder="Answer 1"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                      Answer 2{" "}
                      <span className="text-red-600">* (Required)</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="radio"
                        name={`correct-${index}`}
                        checked={q.correctAnswer === 2}
                        onChange={() =>
                          updateQuestion(index, "correctAnswer", 2)
                        }
                        className="mt-1"
                      />
                      <input
                        type="text"
                        value={q.answer2}
                        onChange={(e) =>
                          updateQuestion(index, "answer2", e.target.value)
                        }
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-gray-100"
                        placeholder="Answer 2"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                      Answer 3 <span className="text-gray-500">(Optional)</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="radio"
                        name={`correct-${index}`}
                        checked={q.correctAnswer === 3}
                        onChange={() =>
                          updateQuestion(index, "correctAnswer", 3)
                        }
                        className="mt-1"
                      />
                      <input
                        type="text"
                        value={q.answer3}
                        onChange={(e) =>
                          updateQuestion(index, "answer3", e.target.value)
                        }
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-gray-100"
                        placeholder="Answer 3"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                      Answer 4 <span className="text-gray-500">(Optional)</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="radio"
                        name={`correct-${index}`}
                        checked={q.correctAnswer === 4}
                        onChange={() =>
                          updateQuestion(index, "correctAnswer", 4)
                        }
                        className="mt-1"
                      />
                      <input
                        type="text"
                        value={q.answer4}
                        onChange={(e) =>
                          updateQuestion(index, "answer4", e.target.value)
                        }
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-gray-100"
                        placeholder="Answer 4"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Question Button */}
        <div className="mt-6">
          <button
            onClick={addQuestion}
            disabled={questions.length >= 50}
            className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold rounded-lg transition-colors"
          >
            + Add Question ({questions.length}/50)
          </button>
        </div>

        {/* Load Game Modal */}
        {showLoadModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowLoadModal(false)}
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                Load Game
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
                          onClick={() => loadGame(game)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
                        >
                          Load
                        </button>
                        <button
                          onClick={() => deleteGame(game.id)}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowLoadModal(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Save Modal */}
        {showSaveModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowSaveModal(false)}
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                Save Game
              </h2>
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Game Name
                </label>
                <input
                  type="text"
                  value={gameName}
                  onChange={(e) => setGameName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-gray-100"
                  placeholder="Enter game name"
                  autoFocus
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveGame}
                  disabled={!gameName.trim() || isSaving}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-bold rounded-lg transition-colors"
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

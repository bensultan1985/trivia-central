"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
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
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const [runPendingActionAfterSave, setRunPendingActionAfterSave] =
    useState(false);
  const [tempQuestionOrder, setTempQuestionOrder] = useState<Question[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
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

  // Guard in-app navigation (Link clicks) when there are unsaved changes.
  useEffect(() => {
    const onDocumentClickCapture = (e: MouseEvent) => {
      if (!hasUnsavedChanges) return;
      if (e.defaultPrevented) return;
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const rawHref = anchor.getAttribute("href");
      if (!rawHref || rawHref.startsWith("#")) return;
      if (rawHref.startsWith("mailto:") || rawHref.startsWith("tel:")) return;

      let url: URL;
      try {
        url = new URL(rawHref, window.location.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;

      const isWithinBuilder =
        url.pathname === "/game-builder" ||
        url.pathname.startsWith("/game-builder/");
      if (isWithinBuilder) return;

      e.preventDefault();
      e.stopPropagation();

      const nextHref = `${url.pathname}${url.search}${url.hash}`;
      checkUnsavedChanges(() => router.push(nextHref));
    };

    document.addEventListener("click", onDocumentClickCapture, true);
    return () =>
      document.removeEventListener("click", onDocumentClickCapture, true);
  }, [hasUnsavedChanges, router]);

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
    const shuffled = questions.map((question) => {
      // Build answers array with their indices, only include non-empty answers
      const answers = [
        { text: question.answer1, index: 1 },
        { text: question.answer2, index: 2 },
        question.answer3 ? { text: question.answer3, index: 3 } : null,
        question.answer4 ? { text: question.answer4, index: 4 } : null,
      ].filter(
        (a): a is { text: string; index: number } =>
          a !== null && a.text.trim() !== "",
      );

      // Don't shuffle if there are fewer than 2 answers
      if (answers.length < 2) {
        return question;
      }

      // Find the correct answer text before shuffling
      const correctAnswerText =
        question.correctAnswer === 1
          ? question.answer1
          : question.correctAnswer === 2
            ? question.answer2
            : question.correctAnswer === 3
              ? question.answer3
              : question.answer4;

      // If correct answer is empty, don't shuffle this question
      if (!correctAnswerText || correctAnswerText.trim() === "") {
        return question;
      }

      // Shuffle the answers array
      for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
      }

      // Find where correct answer ended up after shuffling
      const newCorrectIndex =
        answers.findIndex((a) => a.text === correctAnswerText) + 1;

      return {
        ...question,
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

  const closeSaveModal = () => {
    setShowSaveModal(false);
    if (runPendingActionAfterSave) {
      setPendingAction(null);
      setRunPendingActionAfterSave(false);
    }
  };

  const cancelPendingNavigation = () => {
    setShowUnsavedModal(false);
    setPendingAction(null);
    setRunPendingActionAfterSave(false);
  };

  const handleSave = async () => {
    if (!canSave()) {
      alert("At least one complete question is required to save");
      return false;
    }

    if (!currentGame && !gameName.trim()) {
      setShowSaveModal(true);
      return false;
    }

    return await saveGame();
  };

  const saveGame = async (): Promise<boolean> => {
    try {
      setIsSaving(true);
      const name = currentGame?.name || gameName.trim();

      if (!name) {
        alert("Game name is required");
        return false;
      }

      // Filter out incomplete questions
      const completeQuestions = questions.filter(
        (q) => q.question.trim() && q.answer1.trim() && q.answer2.trim(),
      );

      if (completeQuestions.length === 0) {
        alert("At least one complete question is required");
        return false;
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

        if (runPendingActionAfterSave && pendingAction) {
          pendingAction();
          setPendingAction(null);
          setRunPendingActionAfterSave(false);
        }

        return true;
      } else {
        const error = await response.json();
        alert(`Failed to save: ${error.error}`);
        return false;
      }
    } catch (error) {
      console.error("Error saving game:", error);
      alert("Failed to save game");
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const checkUnsavedChanges = (action: () => void) => {
    if (hasUnsavedChanges) {
      setPendingAction(() => action);
      setShowUnsavedModal(true);
    } else {
      action();
    }
  };

  const handleUnsavedSave = async () => {
    setShowUnsavedModal(false);
    setRunPendingActionAfterSave(true);

    if (!canSave()) {
      alert("At least one complete question is required to save");
      setRunPendingActionAfterSave(false);
      setPendingAction(null);
      return;
    }

    if (!currentGame && !gameName.trim()) {
      setShowSaveModal(true);
      return;
    }

    const ok = await saveGame();
    if (!ok) {
      // Keep pending action so user can retry saving.
      return;
    }
  };

  const handleUnsavedDiscard = () => {
    setShowUnsavedModal(false);
    setHasUnsavedChanges(false);
    setRunPendingActionAfterSave(false);
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  const loadGame = (game: Game) => {
    const doLoad = () => {
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

    checkUnsavedChanges(doLoad);
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
    const doNewGame = () => {
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

    checkUnsavedChanges(doNewGame);
  };

  const openOrderModal = () => {
    setTempQuestionOrder([...questions]);
    setShowOrderModal(true);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newOrder = [...tempQuestionOrder];
    const draggedItem = newOrder[draggedIndex];
    newOrder.splice(draggedIndex, 1);
    newOrder.splice(index, 0, draggedItem);

    setTempQuestionOrder(newOrder);
    setDraggedIndex(index);
  };

  const applyQuestionOrder = () => {
    setQuestions(tempQuestionOrder);
    setHasUnsavedChanges(true);
    setShowOrderModal(false);
    setDraggedIndex(null);
  };

  const cancelQuestionOrder = () => {
    setShowOrderModal(false);
    setDraggedIndex(null);
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
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-colors"
            >
              New Game
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold rounded-lg transition-colors"
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => setShowLoadModal(true)}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-colors"
            >
              Open
            </button>
            <button
              onClick={openOrderModal}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-colors"
            >
              Organize
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
                  className="bg-red-600 text-white hover:bg-red-700 font-bold px-3 py-0
                  text-xl  rounded-lg transition-colors"
                  disabled={questions.length <= 1}
                >
                  x
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
                        aria-label="Select answer 1 as correct"
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
                        aria-label="Select answer 2 as correct"
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
                        disabled={!q.answer3 || q.answer3.trim() === ""}
                        className="mt-1"
                        aria-label="Select answer 3 as correct"
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
                        disabled={!q.answer4 || q.answer4.trim() === ""}
                        className="mt-1"
                        aria-label="Select answer 4 as correct"
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
            className="w-50 px-4 py-3 align justify-center bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold rounded-lg transition-colors"
          >
            + Add Question
            {/* ({questions.length}/50) */}
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
                          Open
                        </button>
                        <button
                          onClick={() => deleteGame(game.id)}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
                        >
                          x
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
            onClick={closeSaveModal}
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
                  onClick={closeSaveModal}
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

        {/* Order Modal */}
        {showOrderModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={cancelQuestionOrder}
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                Reorder Questions
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Drag and drop questions to reorder them
              </p>
              <div className="space-y-2 mb-6">
                {tempQuestionOrder.map((q, index) => (
                  <div
                    key={index}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    className={`p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg cursor-move hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      draggedIndex === index ? "opacity-50" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-gray-500 dark:text-gray-400">
                        {index + 1}.
                      </span>
                      <span className="text-gray-800 dark:text-gray-100 truncate">
                        {q.question || "(Empty question)"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={cancelQuestionOrder}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={applyQuestionOrder}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Unsaved Changes Modal */}
        {showUnsavedModal && (
          <div
            className="fixed inset-0 bg-stone-500/35  z-50 flex items-center justify-center p-4"
            onClick={cancelPendingNavigation}
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                Unsaved Changes
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                You have unsaved changes. Would you like to save them before
                continuing?
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={handleUnsavedDiscard}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition-colors"
                >
                  Exit Without Saving
                </button>
                <button
                  onClick={handleUnsavedSave}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

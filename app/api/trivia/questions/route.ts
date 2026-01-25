import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Mock questions for testing when database is not available
const mockQuestions = [
  {
    id: "1",
    question: "What is the capital of France?",
    correctAnswer: "Paris",
    wrongAnswer1: "London",
    wrongAnswer2: "Berlin",
    wrongAnswer3: "Madrid",
    category: "Geography",
    categoryPath: "Geography > Europe > Capitals",
    difficulty: "Easy",
    choice1Count: 45,
    choice2Count: 5,
    choice3Count: 3,
    choice4Count: 2,
  },
  {
    id: "2",
    question: "Who painted the Mona Lisa?",
    correctAnswer: "Leonardo da Vinci",
    wrongAnswer1: "Michelangelo",
    wrongAnswer2: "Raphael",
    wrongAnswer3: "Donatello",
    category: "Arts",
    categoryPath: "Arts > Painting > Renaissance",
    difficulty: "Medium",
    choice1Count: 38,
    choice2Count: 8,
    choice3Count: 6,
    choice4Count: 3,
  },
  {
    id: "3",
    question: "What is the largest planet in our solar system?",
    correctAnswer: "Jupiter",
    wrongAnswer1: "Saturn",
    wrongAnswer2: "Neptune",
    wrongAnswer3: "Uranus",
    category: "Science",
    categoryPath: "Science > Astronomy > Planets",
    difficulty: "Easy",
    choice1Count: 42,
    choice2Count: 8,
    choice3Count: 3,
    choice4Count: 2,
  },
  {
    id: "4",
    question: "In what year did World War II end?",
    correctAnswer: "1945",
    wrongAnswer1: "1944",
    wrongAnswer2: "1946",
    wrongAnswer3: "1943",
    category: "History",
    categoryPath: "History > Modern > World Wars",
    difficulty: "Medium",
    choice1Count: 35,
    choice2Count: 10,
    choice3Count: 7,
    choice4Count: 3,
  },
  {
    id: "5",
    question: "Which tennis player has won the most Grand Slam titles?",
    correctAnswer: "Novak Djokovic",
    wrongAnswer1: "Rafael Nadal",
    wrongAnswer2: "Roger Federer",
    wrongAnswer3: "Pete Sampras",
    category: "Sports",
    categoryPath: "Sports > Tennis > Records",
    difficulty: "Hard",
    choice1Count: 28,
    choice2Count: 12,
    choice3Count: 10,
    choice4Count: 5,
  },
  {
    id: "6",
    question: "What is the smallest country in the world?",
    correctAnswer: "Vatican City",
    wrongAnswer1: "Monaco",
    wrongAnswer2: "San Marino",
    wrongAnswer3: "Liechtenstein",
    category: "Geography",
    categoryPath: "Geography > World Records",
    difficulty: "Medium",
    choice1Count: 40,
    choice2Count: 8,
    choice3Count: 5,
    choice4Count: 2,
  },
  {
    id: "7",
    question: "Who wrote 'Romeo and Juliet'?",
    correctAnswer: "William Shakespeare",
    wrongAnswer1: "Christopher Marlowe",
    wrongAnswer2: "Ben Jonson",
    wrongAnswer3: "John Milton",
    category: "Literature",
    categoryPath: "Literature > Drama > English",
    difficulty: "Easy",
    choice1Count: 48,
    choice2Count: 4,
    choice3Count: 2,
    choice4Count: 1,
  },
  {
    id: "8",
    question: "What is the chemical symbol for gold?",
    correctAnswer: "Au",
    wrongAnswer1: "Ag",
    wrongAnswer2: "Fe",
    wrongAnswer3: "Cu",
    category: "Science",
    categoryPath: "Science > Chemistry > Elements",
    difficulty: "Medium",
    choice1Count: 32,
    choice2Count: 12,
    choice3Count: 8,
    choice4Count: 3,
  },
  {
    id: "9",
    question: "Which movie won the Academy Award for Best Picture in 2020?",
    correctAnswer: "Parasite",
    wrongAnswer1: "1917",
    wrongAnswer2: "Joker",
    wrongAnswer3: "Once Upon a Time in Hollywood",
    category: "Entertainment",
    categoryPath: "Entertainment > Film > Awards",
    difficulty: "Hard",
    choice1Count: 25,
    choice2Count: 15,
    choice3Count: 10,
    choice4Count: 5,
  },
  {
    id: "10",
    question: "What is the tallest mountain in the world?",
    correctAnswer: "Mount Everest",
    wrongAnswer1: "K2",
    wrongAnswer2: "Kangchenjunga",
    wrongAnswer3: "Lhotse",
    category: "Geography",
    categoryPath: "Geography > Mountains > Records",
    difficulty: "Easy",
    choice1Count: 50,
    choice2Count: 3,
    choice3Count: 1,
    choice4Count: 1,
  },
  {
    id: "11",
    question: "Who was the first President of the United States?",
    correctAnswer: "George Washington",
    wrongAnswer1: "Thomas Jefferson",
    wrongAnswer2: "John Adams",
    wrongAnswer3: "Benjamin Franklin",
    category: "History",
    categoryPath: "History > American > Presidents",
    difficulty: "Easy",
    choice1Count: 52,
    choice2Count: 2,
    choice3Count: 1,
    choice4Count: 0,
  },
  {
    id: "12",
    question: "What is the speed of light?",
    correctAnswer: "299,792,458 meters per second",
    wrongAnswer1: "199,792,458 meters per second",
    wrongAnswer2: "399,792,458 meters per second",
    wrongAnswer3: "249,792,458 meters per second",
    category: "Science",
    categoryPath: "Science > Physics > Constants",
    difficulty: "Hard",
    choice1Count: 22,
    choice2Count: 18,
    choice3Count: 10,
    choice4Count: 5,
  },
  {
    id: "13",
    question: "Which band released the album 'Abbey Road'?",
    correctAnswer: "The Beatles",
    wrongAnswer1: "The Rolling Stones",
    wrongAnswer2: "Led Zeppelin",
    wrongAnswer3: "Pink Floyd",
    category: "Music",
    categoryPath: "Music > Rock > Classic",
    difficulty: "Medium",
    choice1Count: 44,
    choice2Count: 6,
    choice3Count: 3,
    choice4Count: 2,
  },
  {
    id: "14",
    question: "What is the largest ocean on Earth?",
    correctAnswer: "Pacific Ocean",
    wrongAnswer1: "Atlantic Ocean",
    wrongAnswer2: "Indian Ocean",
    wrongAnswer3: "Arctic Ocean",
    category: "Geography",
    categoryPath: "Geography > Oceans",
    difficulty: "Easy",
    choice1Count: 47,
    choice2Count: 5,
    choice3Count: 2,
    choice4Count: 1,
  },
  {
    id: "15",
    question: "Who developed the theory of relativity?",
    correctAnswer: "Albert Einstein",
    wrongAnswer1: "Isaac Newton",
    wrongAnswer2: "Galileo Galilei",
    wrongAnswer3: "Stephen Hawking",
    category: "Science",
    categoryPath: "Science > Physics > Theories",
    difficulty: "Medium",
    choice1Count: 46,
    choice2Count: 5,
    choice3Count: 2,
    choice4Count: 2,
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const count = parseInt(searchParams.get("count") || "15");

    let questions;

    try {
      // Try to get random questions from the database
      questions = await prisma.$queryRaw<any[]>`
        SELECT * FROM "TriviaQuestion"
        ORDER BY RANDOM()
        LIMIT ${count}
      `;

      // If no questions in database, use mock data
      if (!questions || questions.length === 0) {
        questions = mockQuestions.slice(0, count);
      }
    } catch (dbError) {
      // Database not available, use mock data
      console.warn("Database not available, using mock data:", dbError);
      questions = mockQuestions.slice(0, count);
    }

    // Transform questions to include shuffled answers
    const transformedQuestions = questions.map((q) => {
      // We count selections by answer identity (not on-screen position):
      // 1 = correctAnswer, 2 = wrongAnswer1, 3 = wrongAnswer2, 4 = wrongAnswer3
      const answers = [
        { text: q.correctAnswer, isCorrect: true, choiceKey: 1 },
        { text: q.wrongAnswer1, isCorrect: false, choiceKey: 2 },
        { text: q.wrongAnswer2, isCorrect: false, choiceKey: 3 },
        { text: q.wrongAnswer3, isCorrect: false, choiceKey: 4 },
      ];

      // Shuffle the answers (Fisher–Yates)
      const shuffledAnswers = [...answers];
      for (let i = shuffledAnswers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledAnswers[i], shuffledAnswers[j]] = [
          shuffledAnswers[j],
          shuffledAnswers[i],
        ];
      }

      const totalResponses =
        typeof q.engagement === "number"
          ? q.engagement
          : q.choice1Count + q.choice2Count + q.choice3Count + q.choice4Count;

      const correctFrequency =
        totalResponses >= 5
          ? Math.round((q.choice1Count / totalResponses) * 100)
          : null;

      return {
        id: q.id,
        question: q.question,
        answers: shuffledAnswers,
        category: q.category,
        categoryPath: q.categoryPath,
        difficulty: q.difficulty,
        engagement: totalResponses,
        correctFrequency,
      };
    });

    return NextResponse.json({ questions: transformedQuestions });
  } catch (error) {
    console.error("Error fetching trivia questions:", error);
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 },
    );
  }
}

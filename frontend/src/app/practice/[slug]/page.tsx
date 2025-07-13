// frontend/src/app/practice/[slug]/page.tsx
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";

interface Question {
  question: string;
  answer: string;
}

export default function PracticePage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const searchParams = useSearchParams();
  const countParam = searchParams.get("count");

  useEffect(() => {
    if (!slug) return;

    axios
      .get(`http://localhost:3001/chapters/${slug}/questions`)
      .then((res) => {
        let fetched = res.data;
        if (countParam !== "all") {
          const count = parseInt(countParam || "10", 10);
          fetched = shuffleArray(fetched).slice(0, count);
        }
        setQuestions(fetched);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading questions:", err);
        setLoading(false);
      });
  }, [slug, countParam]);

  function shuffleArray(array: any[]) {
    return [...array].sort(() => 0.5 - Math.random());
  }

  function handleNext() {
    setShowAnswer(false);
    setCurrent((prev) => Math.min(prev + 1, questions.length - 1));
  }

  if (loading) return <p className="p-6">Loading...</p>;
  if (questions.length === 0) return <p>No questions found.</p>;

  const currentQ = questions[current];

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">
        Question {current + 1} of {questions.length}
      </h1>

      <div className="border p-6 rounded-lg bg-white shadow-sm">
        <p className="text-lg font-medium mb-4">{currentQ.question}</p>

        {showAnswer ? (
          <p className="text-green-600 font-bold text-lg">{currentQ.answer}</p>
        ) : (
          <button
            onClick={() => setShowAnswer(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Show Answer
          </button>
        )}
      </div>

      {current < questions.length - 1 && (
        <button
          onClick={handleNext}
          className="mt-6 px-4 py-2 bg-gray-700 text-white rounded"
        >
          Next
        </button>
      )}
    </main>
  );
}

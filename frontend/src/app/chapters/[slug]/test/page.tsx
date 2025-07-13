//frontend/src/app/chapters/[slug]/test/page.tsx
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

interface Question {
  question: string;
  answer: string;
}

export default function TestPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const slug =
    typeof params.slug === "string"
      ? params.slug
      : Array.isArray(params.slug)
      ? params.slug[0]
      : "";

  useEffect(() => {
    if (!slug) return;

    axios
      .get(`http://localhost:3000/chapters/${slug}/questions`)
      .then((res) => {
        setQuestions(res.data.questions || res.data); // depinde ce returnezi în backend
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch questions:", err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <p className="p-6">Loading questions...</p>;

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Test: {slug}</h1>
      {questions.length === 0 && (
        <p className="text-gray-500">
          No questions available for this chapter.
        </p>
      )}
      <ul className="space-y-4">
        {questions.map((q, idx) => (
          <li key={idx} className="p-4 border rounded-lg shadow-sm bg-white">
            <p className="font-medium">{q.question}</p>
            <p className="text-gray-600">Answer: {q.answer}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

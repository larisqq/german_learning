//frontend/src/app/practice/[chapterSlug]/page.tsx
"use client";
import { useEffect, useState } from "react";

type Question = { question: string; answer: string };

export default function PracticeQuizChapter({
  params,
}: {
  params: { chapterSlug: string };
}) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    fetch(`/api/practice/chapter/${params.chapterSlug}?limit=${limit}`)
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch(() => setQuestions([]));
  }, [params.chapterSlug, limit]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Quiz for Chapter: {params.chapterSlug}
      </h2>

      <label>Number of questions:</label>
      <select
        onChange={(e) => setLimit(Number(e.target.value))}
        value={limit}
        className="mb-4"
      >
        <option value={10}>10</option>
        <option value={30}>30</option>
        <option value={-1}>All</option>
      </select>

      <ul>
        {questions.map((q, i) => (
          <li key={i} className="mb-3 p-3 border rounded">
            <strong>{q.question}</strong>
            <br />
            <input
              type="text"
              placeholder="Your answer"
              className="mt-1 p-2 border w-full"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

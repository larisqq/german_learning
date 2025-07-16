"use client";

import React, { useEffect, useState } from "react";

type Question = { question: string; answer: string };

export default function PracticeQuizChapter({
  params,
}: {
  params: Promise<{ chapterSlug: string; subchapterSlug?: string }>;
}) {
  // De-promisează params
  const actualParams = React.use(params);
  const { chapterSlug, subchapterSlug } = actualParams;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    if (subchapterSlug) {
      fetch(`/api/practice/subchapter/${subchapterSlug}?limit=${limit}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch");
          return res.json();
        })
        .then((data) => setQuestions(data))
        .catch(() => setQuestions([]));
    } else {
      fetch(`/api/practice/chapter/${chapterSlug}?limit=${limit}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch");
          return res.json();
        })
        .then((data) => setQuestions(data))
        .catch(() => setQuestions([]));
    }
  }, [chapterSlug, subchapterSlug, limit]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Quiz for{" "}
        {subchapterSlug
          ? `Subchapter: ${subchapterSlug}`
          : `Chapter: ${chapterSlug}`}
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

// frontend/src/app/practice/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

interface Chapter {
  title: string;
  slug: string;
}

export default function PracticeHome() {
  const [chapters, setChapters] = useState<Chapter[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3001/chapters").then((res) => {
      setChapters(res.data);
    });
  }, []);

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Practice Vocabulary</h1>
      <ul className="space-y-4">
        {chapters.map((chapter) => (
          <li
            key={chapter.slug}
            className="p-4 border rounded-lg shadow-sm bg-white flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{chapter.title}</h2>
              <p className="text-gray-500 text-sm">{chapter.slug}</p>
            </div>
            <div className="space-x-2">
              <Link href={`/practice/${chapter.slug}?count=10`}>
                <button className="bg-blue-500 text-white px-3 py-1 rounded">
                  10
                </button>
              </Link>
              <Link href={`/practice/${chapter.slug}?count=30`}>
                <button className="bg-green-500 text-white px-3 py-1 rounded">
                  30
                </button>
              </Link>
              <Link href={`/practice/${chapter.slug}?count=all`}>
                <button className="bg-gray-700 text-white px-3 py-1 rounded">
                  All
                </button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

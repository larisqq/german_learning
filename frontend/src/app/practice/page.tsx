"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

interface Subchapter {
  title: string;
  slug: string;
}

interface Chapter {
  title: string;
  slug: string;
  subchapters: Subchapter[];
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

      <ul className="space-y-8">
        {chapters.map((chapter) => (
          <li key={chapter.slug} className="bg-white p-6 shadow rounded-xl">
            {/* TITLU + TEST CHAPTER */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">{chapter.title}</h2>
              <Link href={`/practice/${chapter.slug}?count=all`}>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                  Test whole chapter
                </button>
              </Link>
            </div>

            {/* SUBCHAPTERS */}
            <div className="space-y-3">
              {chapter.subchapters.map((sub) => (
                <div
                  key={sub.slug}
                  className="border p-4 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-medium">{sub.title}</h3>
                  </div>
                  <div className="space-x-2">
                    <Link
                      href={`/practice/${chapter.slug}/${sub.slug}?count=10`}
                    >
                      <button className="bg-blue-500 text-white px-3 py-1 rounded">
                        10
                      </button>
                    </Link>
                    <Link
                      href={`/practice/${chapter.slug}/${sub.slug}?count=30`}
                    >
                      <button className="bg-green-500 text-white px-3 py-1 rounded">
                        30
                      </button>
                    </Link>
                    <Link
                      href={`/practice/${chapter.slug}/${sub.slug}?count=all`}
                    >
                      <button className="bg-gray-700 text-white px-3 py-1 rounded">
                        All
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

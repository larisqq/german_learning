"use client";
import Link from "next/link";

const features = [
  {
    title: "📘 Learn Theory",
    description: "Explore grammar and vocabulary explanations.",
    href: "/chapters",
    bg: "bg-blue-100",
  },
  {
    title: "🧠 Practice Vocabulary",
    description: "Take quizzes to test your vocabulary knowledge.",
    href: "/practice",
    bg: "bg-yellow-100",
  },
  {
    title: "🎤 Practice Speaking",
    description: "Record your voice and get feedback on pronunciation.",
    href: "/speaking",
    bg: "bg-pink-100",
  },
  {
    title: "📖 Story-based Test",
    description: "Read a story and answer comprehension questions.",
    href: "/stories",
    bg: "bg-green-100",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Welcome back! 👋</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {features.map(({ title, description, href, bg }) => (
          <Link
            key={href}
            href={href}
            className={`rounded-2xl p-6 shadow-md hover:scale-105 transition-all ${bg}`}
          >
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-700">{description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

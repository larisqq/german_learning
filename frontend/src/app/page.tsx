import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">German Learning App 🇩🇪</h1>
      <div className="space-x-4">
        <Link href="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
        <Link href="/register" className="text-green-600 hover:underline">
          Register
        </Link>
      </div>
    </main>
  );
}

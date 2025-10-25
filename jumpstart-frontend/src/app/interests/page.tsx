"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InterestsPage() {
  const [interests, setInterests] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("userInterests", interests);
    router.push("/dashboard");
  };

  return (
    <div className="max-w-lg mx-auto py-20 text-center">
      <h2 className="text-3xl font-bold mb-4 text-primary">Tell us what interests you</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Our AI will personalize opportunities based on your input.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          placeholder="e.g. Web development, design, fitness..."
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <button type="submit" className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Generate Recommendations
        </button>
      </form>
    </div>
  );
}

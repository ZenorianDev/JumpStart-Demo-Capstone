"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [interests, setInterests] = useState<string>("");
  const [recs, setRecs] = useState<
    { id: number; title: string; description: string }[]
  >([]);

  useEffect(() => {
    // Defer state update to avoid ESLint warning
    requestAnimationFrame(() => {
      const userInterests = localStorage.getItem("userInterests") || "";
      setInterests(userInterests);

      // Simulated AI-personalized recommendations
      const recommendations = [
        {
          id: 1,
          title: "Frontend Development",
          description: "Build interactive UIs with React, Tailwind, and Next.js.",
        },
        {
          id: 2,
          title: "AI-Assisted Design",
          description: "Use generative AI tools to accelerate your design process.",
        },
        {
          id: 3,
          title: "Fitness Coaching",
          description: "Blend technology with health through personalized training platforms.",
        },
      ].filter((rec) =>
        userInterests.toLowerCase().includes(rec.title.toLowerCase().split(" ")[0])
      );

      setRecs(
        recommendations.length
          ? recommendations
          : [
              {
                id: 99,
                title: "General Exploration",
                description:
                  "Discover trending career paths with AI insights.",
              },
            ]
      );
    });
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to Your Dashboard</h1>
      <p className="mb-6">
        Your selected interests:{" "}
        <span className="font-semibold">{interests || "None yet"}</span>
      </p>

      <h2 className="text-2xl font-semibold mb-3">AI-Personalized Recommendations</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recs.map((rec) => (
          <div key={rec.id} className="p-4 border rounded-lg shadow-sm bg-card">
            <h3 className="font-bold text-lg">{rec.title}</h3>
            <p className="text-sm text-muted-foreground">{rec.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

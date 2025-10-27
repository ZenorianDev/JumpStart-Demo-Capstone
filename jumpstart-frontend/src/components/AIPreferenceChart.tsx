"use client";

import React, { useEffect, useState } from "react";
import { aiPersonalization } from "@/lib/aiLogic";

type Preference = {
  category: string;
  score: number;
};

export default function AIPreferenceChart() {
  const [data, setData] = useState<Preference[]>([]);

  useEffect(() => {
    // Wrap in timeout to defer setState — prevents cascading renders
    const timer = setTimeout(() => {
      const prefs = aiPersonalization.getPreferenceSummary();
      setData(prefs);
    }, 0);

    // Cleanup to prevent memory leaks
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="border border-gray-300 p-4 rounded-2xl mt-6">
    <h2 className="text-lg font-semibold mb-2 text-black">
        Your AI Feed Preferences
    </h2>

    {data.length === 0 ? (
        <p className="text-gray-700">No data yet — start exploring content!</p>
    ) : (
        <ul className="space-y-2">
        {data.map((item) => (
            <li key={item.category} className="flex justify-between">
            <span className="capitalize text-gray-800">{item.category}</span>
            <span className="text-black font-semibold">
                {item.score.toFixed(1)}
            </span>
            </li>
        ))}
        </ul>
    )}
    </div>
  );
}

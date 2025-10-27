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
    <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow mt-6">
      <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
        🧠 Your AI Feed Preferences
      </h2>

      {data.length === 0 ? (
        <p className="text-gray-500">No data yet — start exploring content!</p>
      ) : (
        <ul className="space-y-2">
          {data.map((item) => (
            <li key={item.category} className="flex justify-between">
              <span className="capitalize">{item.category}</span>
              <span className="text-blue-600 font-semibold">
                {item.score.toFixed(1)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

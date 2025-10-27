// src/lib/aiLogic.ts
export interface Item {
  id: string; // ✅ unified as string
  title: string;
  img: string;
  category: string;
}

interface Interest {
  id: string;
  title: string;
  img: string;
}

export const aiPersonalization = {
  getWeights(interests: Interest[]): Record<string, number> {
    const weights: Record<string, number> = {};
    interests.forEach((i, idx) => {
      // give higher weights to earlier (preferred) interests
      weights[i.title] = 1 / (idx + 1);
    });
    return weights;
  },

  sortItemsByPreference(items: Item[], weights: Record<string, number>): Item[] {
    return [...items].sort((a, b) => {
      const wA = weights[a.category] ?? 0;
      const wB = weights[b.category] ?? 0;
      return wB - wA;
    });
  },

  recordInteraction(category: string) {
    if (typeof window === "undefined") return;
    const key = `interaction_${category}`;
    const count = Number(localStorage.getItem(key) || "0");
    localStorage.setItem(key, String(count + 1));
  },

  getRecommendationText(): string {
    const categories = Object.keys(localStorage)
      .filter((k) => k.startsWith("interaction_"))
      .map((k) => ({
        category: k.replace("interaction_", ""),
        count: Number(localStorage.getItem(k) || "0"),
      }));

    if (categories.length === 0) {
      return "We’re curating personalized content just for you!";
    }

    const top = categories.sort((a, b) => b.count - a.count)[0];
    return `You seem to enjoy ${top.category}! Here are more picks based on your interests.`;
  },
};

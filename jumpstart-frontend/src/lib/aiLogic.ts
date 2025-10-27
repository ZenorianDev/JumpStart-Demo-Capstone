// src/lib/aiLogic.ts

export type Item = {
  id: number;
  title: string;
  img: string;
  category: string;
  description?: string;
  likes?: number;
};

export const aiPersonalization = {
  // Save interaction
  recordInteraction(category: string) {
    const data = JSON.parse(localStorage.getItem("userInteractions") || "{}");
    data[category] = (data[category] || 0) + 1;
    localStorage.setItem("userInteractions", JSON.stringify(data));
  },

  // Retrieve current weights
  getWeights(categories: string[]): Record<string, number> {
    const data = JSON.parse(localStorage.getItem("userInteractions") || "{}");
    const weights: Record<string, number> = {};
    categories.forEach((cat) => {
      weights[cat] = data[cat] || 1;
    });
    return weights;
  },

  // Sort items based on preference
  sortItemsByPreference(items: Item[], weights: Record<string, number>) {
    return [...items].sort(
      (a, b) => (weights[b.category] || 0) - (weights[a.category] || 0)
    );
  },

  // Generate simple AI-like description
  generateDescription(item: Item): string {
    const templates = [
      `Experience the essence of ${item.category.toLowerCase()} with "${item.title}". Designed to match your personal style.`,
      `"${item.title}" is the perfect example of ${item.category.toLowerCase()} innovation. Stylish, smart, and made for you.`,
      `Inspired by your interest in ${item.category.toLowerCase()}, "${item.title}" stands out for its unique charm.`,
      `A must-have for ${item.category.toLowerCase()} lovers, "${item.title}" blends creativity and comfort seamlessly.`,
    ];
    return templates[Math.floor(Math.random() * templates.length)];
  },

  // Smart recommendation text
  getRecommendationText() {
    const data = JSON.parse(localStorage.getItem("userInteractions") || "{}");
    const topCategory = Object.keys(data).sort(
      (a, b) => data[b] - data[a]
    )[0];

    if (!topCategory) {
      const greetings = [
        "Welcome back! Here's what’s trending today.",
        "Discover something new that might match your vibe.",
        "Explore a mix of interests just for you.",
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    const templates = [
      `Because you loved ${topCategory}, here are some fresh picks you might enjoy.`,
      `Your ${topCategory} style is on point — check out more like it.`,
      `We noticed you’re into ${topCategory}. Here’s what’s trending today.`,
    ];
    return templates[Math.floor(Math.random() * templates.length)];
  },

  // Get related items
  getRelatedItems(items: Item[], currentCategory: string): Item[] {
    return items
      .filter((item) => item.category === currentCategory)
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
  },
};

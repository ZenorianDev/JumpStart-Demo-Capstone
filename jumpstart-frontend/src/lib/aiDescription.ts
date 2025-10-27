// src/lib/aiDescription.ts
export const aiDescription = {
  generateDescription(title: string, category?: string): string {
    const themes = {
      Art: [
        `A captivating visual piece that blends creativity with emotion, inspired by ${title}.`,
        `An expressive work capturing the intricate beauty of ${title}, perfect for artistic minds.`,
      ],
      Fashion: [
        `${title} redefines modern style — a reflection of confidence and individuality.`,
        `An innovative fashion piece that merges comfort and sophistication — ${title} stands out.`,
      ],
      Technology: [
        `${title} represents the future of innovation — sleek, efficient, and AI-enhanced.`,
        `A powerful solution for modern creators. ${title} combines performance and design.`,
      ],
      Food: [
        `A delicious creation that satisfies every craving — ${title} is pure indulgence.`,
        `${title} brings together taste and tradition, made to delight every food lover.`,
      ],
      General: [
        `${title} is a modern concept that fuses functionality and style with user delight.`,
        `Designed for those who appreciate excellence — ${title} stands as a true highlight.`,
      ],
    };

    const group = themes[category as keyof typeof themes] || themes.General;
    const random = Math.floor(Math.random() * group.length);
    return group[random];
  },
};

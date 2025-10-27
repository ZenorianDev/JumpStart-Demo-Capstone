"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Settings, Bell, Home, PenTool, User } from "lucide-react";
import { interestsData } from "@/lib/data";
import { aiPersonalization, Item } from "@/lib/aiLogic";

interface Tile {
  id: string;
  title: string;
  image: string;
  height: string;
  category: string;
}

export default function DashboardPage() {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [recommendationText, setRecommendationText] = useState("");
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("userInterests");
    if (!saved) {
      router.push("/interests");
      return;
    }

    let parsed: string[] = [];
    try {
      parsed = JSON.parse(saved);
    } catch {
      parsed = [];
    }

    // Generate tiles based on interests
    const personalizedTiles = interestsData
      .filter((item) => parsed.includes(item.name))
      .flatMap((item) =>
        item.samples.map((src, i) => ({
          id: `${item.name}-${i}`,
          title: item.name,
          image: src,
          height:
            i % 3 === 0 ? "h-[320px]" : i % 2 === 0 ? "h-[260px]" : "h-[380px]",
          category: item.name,
        }))
      );

    // 📊 AI personalization integration
    const weights = aiPersonalization.getWeights(
      personalizedTiles.map((tile) => ({
        id: tile.id,
        title: tile.title,
        img: tile.image,
        category: tile.category,
      }))
    );

    const sortedTiles = aiPersonalization
      .sortItemsByPreference(
        personalizedTiles.map((tile) => ({
          id: tile.id,
          title: tile.title,
          img: tile.image,
          category: tile.category,
        })),
        weights
      )
      .map((item) => ({
        id: String(item.id),
        title: item.title,
        image: item.img,
        height: "h-[300px]",
        category: item.category,
      }));

    setTiles(sortedTiles);
    setRecommendationText(aiPersonalization.getRecommendationText());
  }, [router]);

  return (
    <div className="flex min-h-screen bg-gray-50 text-black">
      {/* Sidebar */}
      <aside className="w-20 bg-black text-white flex flex-col items-center py-6 space-y-8 fixed h-full">
        <h1
          onClick={() => router.push("/")}
          className="text-2xl font-bold cursor-pointer"
        >
          J
        </h1>
        <nav className="flex flex-col items-center space-y-6 mt-10">
          <button className="hover:text-gray-300" title="Home">
            <Home size={22} />
          </button>
          <button className="hover:text-gray-300" title="Create">
            <PenTool size={22} />
          </button>
          <button className="hover:text-gray-300" title="Profile">
            <User size={22} />
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-20 flex flex-col min-h-screen">
        <header className="flex justify-between items-center px-8 py-6 border-b bg-white sticky top-0 z-40">
          <h2 className="text-2xl font-semibold">Your Personalized Feed</h2>
          <div className="flex items-center space-x-4">
            <button className="hover:text-gray-600">
              <Bell size={22} />
            </button>
            <button className="hover:text-gray-600">
              <Settings size={22} />
            </button>
          </div>
        </header>

        {/* AI Recommendation Text */}
        <div className="px-8 py-4 text-gray-600 text-sm">
          {recommendationText}
        </div>

        {/* Masonry Layout */}
        <section className="p-8">
          <div
            className="
              columns-1
              sm:columns-2
              md:columns-3
              lg:columns-4
              xl:columns-5
              gap-6
              space-y-6
            "
          >
            {tiles.map((tile) => (
              <div
                key={tile.id}
                onClick={() => router.push(`/details/${tile.id}`)}
                className="
                  relative
                  mb-6
                  rounded-2xl
                  overflow-hidden
                  shadow-md
                  break-inside-avoid
                  group
                  hover:shadow-xl
                  cursor-pointer
                  transition
                  duration-300
                "
              >
                <Image
                  src={tile.image}
                  alt={tile.title}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div
                  className="
                    absolute inset-0
                    bg-black/0
                    group-hover:bg-black/40
                    transition-all
                    duration-300
                    flex items-end
                    justify-center
                  "
                >
                  <p className="text-white opacity-0 group-hover:opacity-100 mb-4 text-lg font-medium transition-opacity duration-300">
                    {tile.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

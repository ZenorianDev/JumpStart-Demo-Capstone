"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Settings, Bell, Home, PenTool, User } from "lucide-react";
import { interestsData } from "@/lib/data";

interface Tile {
  id: string;
  title: string;
  image: string;
  height: string;
}

export default function DashboardPage() {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
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

      // Generate personalized tiles based on selected interests
      const personalizedTiles = interestsData
        .filter((item) => parsed.includes(item.name))
        .flatMap((item) =>
          item.samples.map((src, i) => ({
            id: `${item.name}-${i}`,
            title: item.name,
            image: src,
            height:
              i % 3 === 0 ? "h-[320px]" : i % 2 === 0 ? "h-[260px]" : "h-[380px]",
          }))
        );

      setTiles(personalizedTiles);
    }, 0);

    return () => clearTimeout(timer);
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
        {/* Top Bar */}
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

        {/* Masonry Layout (Pinterest style) */}
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
                onClick={() => router.push(`/details/${tile.title.toLowerCase()}`)}
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

        {/* Footer */}
        <footer className="bg-black text-white py-10 text-sm text-center mt-auto">
          <div className="flex flex-col md:flex-row justify-between px-10 md:px-20">
            <div className="text-left mb-4 md:mb-0">
              <h3 className="font-bold text-lg mb-2">JumpStart</h3>
              <p className="text-gray-400 max-w-sm">
                Empowering e-commerce with AI-driven personalization for custom
                experiences, better engagement, and accelerated growth.
              </p>
            </div>

            <div className="flex gap-16 justify-center md:justify-end">
              <div>
                <h4 className="font-semibold mb-2">Site Map</h4>
                <ul className="text-gray-400 space-y-1">
                  <li>Explore</li>
                  <li>Home</li>
                  <li>About</li>
                  <li>Businesses</li>
                  <li>Create</li>
                  <li>Contact Us</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Legal</h4>
                <ul className="text-gray-400 space-y-1">
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 text-gray-500">
            Copyright © 2025 JumpStart. All Rights Reserved.
          </div>
        </footer>
      </main>
    </div>
  );
}

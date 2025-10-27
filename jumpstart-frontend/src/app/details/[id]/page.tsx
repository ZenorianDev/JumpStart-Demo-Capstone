"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Settings,
  Bell,
  Home,
  PenTool,
  User,
} from "lucide-react";
import { interestsData } from "@/lib/data";

interface Interest {
  name: string;
  samples: string[];
  description?: string;
}

export default function DetailPage() {
  const params = useParams();
  const router = useRouter();

  // ✅ Ensure this is a string, not an object
  const interest =
    typeof params.id === "string"
      ? params.id.toLowerCase()
      : Array.isArray(params.id)
      ? params.id[0].toLowerCase()
      : "";

  const [data, setData] = useState<Interest | null>(null);

  useEffect(() => {
    if (!interest) return;

    // Slightly delay the state update to avoid synchronous setState warning
    const timer = setTimeout(() => {
      const found = interestsData.find(
        (item) => item.name.toLowerCase() === interest
      );
      setData(found ?? null);
    }, 0);

    return () => clearTimeout(timer);
  }, [interest]);


  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold mb-4">Interest Not Found</h1>
        <button
          onClick={() => router.push("/dashboard")}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

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
          <button
            onClick={() => router.push("/dashboard")}
            className="hover:text-gray-300"
            title="Home"
          >
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
        {/* Header Bar */}
        <header className="flex justify-between items-center px-8 py-6 border-b bg-white sticky top-0 z-40">
          <h2 className="text-2xl font-semibold capitalize">{data.name}</h2>
          <div className="flex items-center space-x-4">
            <button className="hover:text-gray-600">
              <Bell size={22} />
            </button>
            <button className="hover:text-gray-600">
              <Settings size={22} />
            </button>
          </div>
        </header>

        {/* Detail Section */}
        <section className="p-10">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            {/* Main Image */}
            <div className="flex-shrink-0 w-full md:w-1/3">
              <Image
                src={data.samples[0]}
                alt={data.name}
                width={600}
                height={400}
                className="rounded-2xl shadow-lg object-cover w-full h-auto"
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-4">{data.name}</h1>
              <p className="text-gray-600 mb-6">
                {data.description ??
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-6 text-gray-700 mb-8">
                <button className="hover:text-red-500 transition">
                  <Heart />
                </button>
                <button className="hover:text-blue-500 transition">
                  <MessageCircle />
                </button>
                <button className="hover:text-green-500 transition">
                  <Share2 />
                </button>
                <button className="hover:text-yellow-500 transition">
                  <Bookmark />
                </button>
                <button className="ml-6 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
                  Save
                </button>
              </div>
            </div>
          </div>

          {/* Related / Gallery Section */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-6">
              More related to {data.name}
            </h3>

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
              {data.samples.slice(1).map((img, idx) => (
                <div
                  key={idx}
                  className="
                    relative
                    mb-6
                    rounded-2xl
                    overflow-hidden
                    shadow-md
                    break-inside-avoid
                    group
                    hover:shadow-xl
                    transition-shadow
                    duration-300
                  "
                >
                  <Image
                    src={img}
                    alt={`${data.name} sample ${idx + 1}`}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
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

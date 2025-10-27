"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const interestsList = [
  { id: 1, title: "Fashion", img: "/images/fashion.jpg" },
  { id: 2, title: "Technology", img: "/images/tech.jpg" },
  { id: 3, title: "Travel", img: "/images/travel.jpg" },
  { id: 4, title: "Sports", img: "/images/sports.jpg" },
  { id: 5, title: "Food", img: "/images/food.jpg" },
  { id: 6, title: "Art", img: "/images/art.jpg" },
  { id: 7, title: "Gaming", img: "/images/gaming.jpg" },
  { id: 8, title: "Health", img: "/images/health.jpg" },
  { id: 9, title: "Photography", img: "/images/photo.jpg" },
  { id: 10, title: "Music", img: "/images/music.jpg" },
  { id: 11, title: "Business", img: "/images/business.jpg" },
  { id: 12, title: "Science", img: "/images/science.jpg" },
];

export default function InterestSelectionPage() {
  const [selectedInterests, setSelectedInterests] = useState<number[]>([]);
  const router = useRouter();

  const toggleInterest = (id: number) => {
    setSelectedInterests((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const handleContinue = () => {
    const selectedTitles = interestsList
      .filter((i) => selectedInterests.includes(i.id))
      .map((i) => i.title);

    // Save selected interests to localStorage
    localStorage.setItem("userInterests", JSON.stringify(selectedTitles));

    // Navigate to Dashboard
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 bg-black text-white flex justify-between items-center px-10 py-4 z-50">
        <h1
          onClick={() => router.push("/")}
          className="font-bold text-xl cursor-pointer"
        >
          JumpStart
        </h1>
        <ul className="hidden md:flex space-x-6">
          <li className="cursor-pointer">Explore</li>
          <li className="cursor-pointer">About</li>
          <li className="cursor-pointer">Businesses</li>
          <li className="cursor-pointer">Create</li>
          <li className="cursor-pointer">Contact Us</li>
        </ul>
        <div className="space-x-3">
          <button className="border border-white px-3 py-1 rounded hover:bg-white hover:text-black transition">
            Sign In
          </button>
          <button className="bg-white text-black px-3 py-1 rounded hover:opacity-90 transition">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Header */}
      <section className="text-center py-16">
        <h2 className="text-3xl md:text-4xl font-bold">
          Choose What Interests You
        </h2>
        <p className="text-gray-600 mt-2">
          We’ll personalize what you want!
        </p>
      </section>

      {/* Interests Grid */}
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-8 md:px-16 pb-16">
        {interestsList.map((interest) => (
          <div
            key={interest.id}
            className={`relative rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
              selectedInterests.includes(interest.id)
                ? "border-black shadow-lg scale-105"
                : "border-transparent hover:scale-105 hover:shadow-md"
            }`}
            onClick={() => toggleInterest(interest.id)}
          >
            <div className="w-full aspect-square relative">
              <Image
                src={interest.img}
                alt={interest.title}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 w-full text-center bg-black/60 text-white py-2 text-sm md:text-base">
              {interest.title}
            </div>
          </div>
        ))}
      </section>

      {/* Continue Button */}
      {selectedInterests.length > 0 && (
        <div className="fixed bottom-8 left-0 right-0 flex justify-center">
          <button
            onClick={handleContinue}
            className="bg-black text-white px-6 py-3 rounded-full shadow-lg hover:bg-gray-800 transition-all"
          >
            Confirm Selection
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black text-white py-10 text-center text-sm mt-auto">
        <p>© 2025 JumpStart | All Rights Reserved.</p>
      </footer>
    </div>
  );
}

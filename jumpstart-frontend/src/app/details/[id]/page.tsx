"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Heart, Share2, Bookmark, MessageCircle } from "lucide-react";
import { interestsData } from "@/lib/data";
import { aiDescription } from "@/lib/aiDescription";
import { aiPersonalization } from "@/lib/aiLogic";

interface DetailItem {
  id: string;
  title: string;
  image: string;
  category: string;
  description?: string;
}

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [item, setItem] = useState<DetailItem | null>(null);

  useEffect(() => {
    if (!id) return;

    const allItems: DetailItem[] = interestsData.flatMap((interest) =>
      interest.samples.map((src, i) => ({
        id: `${interest.name}-${i}`,
        title: interest.name,
        image: src,
        category: interest.name,
      }))
    );

    const found = allItems.find(
      (it) => it.id === id || it.title.toLowerCase() === id
    );

    if (found) {
      aiPersonalization.recordInteraction(found.category || "General");
      const desc = aiDescription.generateDescription(
        found.title,
        found.category
      );

      // ✅ Only one state update here (no cascading renders)
      setItem({ ...found, description: desc });
    } else {
      router.push("/dashboard");
    }
  }, [id, router]);

  if (!item)
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading...
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-black">
      <main className="flex flex-col items-center justify-start p-10">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg overflow-hidden p-8">
          <div className="flex flex-col md:flex-row gap-6">
            <Image
              src={item.image}
              alt={item.title}
              width={500}
              height={500}
              className="rounded-2xl w-full md:w-1/2 object-cover"
            />
            <div className="flex flex-col justify-between w-full md:w-1/2">
              <div>
                <h1 className="text-3xl font-semibold mb-4">{item.title}</h1>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div className="flex gap-4">
                <Heart className="cursor-pointer hover:text-red-500" />
                <MessageCircle className="cursor-pointer hover:text-blue-500" />
                <Share2 className="cursor-pointer hover:text-green-500" />
                <Bookmark className="cursor-pointer hover:text-yellow-500" />
              </div>

              <button
                className="mt-6 px-6 py-2 bg-black text-white rounded-full w-fit"
                onClick={() => router.push("/dashboard")}
              >
                Back to Feed
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Optional extension below */}
      <section className="p-10 bg-white shadow-inner mt-10">
        <h2 className="text-xl font-semibold mb-6 text-center">
          More Like This
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {interestsData
            .find((i) => i.name === item.category)
            ?.samples.slice(0, 4)
            .map((src, i) => (
              <Image
                key={i}
                src={src}
                alt="Related"
                width={300}
                height={200}
                className="rounded-xl object-cover hover:scale-[1.03] transition-transform"
              />
            ))}
        </div>
      </section>
    </div>
  );
}

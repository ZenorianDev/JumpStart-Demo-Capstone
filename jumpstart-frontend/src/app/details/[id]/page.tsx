"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { aiDescription } from "@/lib/aiDescription";
import { aiPersonalization } from "@/lib/aiLogic";
import { interestsData } from "@/lib/data";

interface Item {
  id: string;
  title: string;
  image: string;
  category?: string;
}

export default function DetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [item, setItem] = useState<Item | null>(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!id) return;

    const allItems = interestsData.flatMap((interest) =>
      interest.samples.map((src, i) => ({
        id: `${interest.name}-${i}`,
        title: interest.name,
        image: src,
        category: interest.name,
      }))
    );

    const found = allItems.find((it) => it.id === id || it.title.toLowerCase() === id);
    if (found) {
      setItem(found);
      aiPersonalization.recordInteraction(found.category || "General");

      // Generate dynamic AI description
      const desc = aiDescription.generateDescription(found.title, found.category);
      setDescription(desc);
    } else {
      router.push("/dashboard");
    }
  }, [id, router]);

  if (!item) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <header className="flex items-center px-6 py-4 bg-white shadow">
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-600 hover:text-black transition"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
      </header>

      <main className="flex flex-col md:flex-row p-8 gap-8">
        <div className="flex-1 flex justify-center items-start">
          <Image
            src={item.image}
            alt={item.title}
            width={600}
            height={500}
            className="rounded-2xl shadow-lg object-cover"
          />
        </div>

        <div className="flex-1 space-y-6">
          <h1 className="text-4xl font-semibold">{item.title}</h1>
          <p className="text-gray-700 text-lg leading-relaxed">{description}</p>

          <div className="pt-4">
            <h3 className="text-xl font-semibold mb-2">Recommended for You</h3>
            <p className="text-gray-600">
              {aiPersonalization.getRecommendationText()}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

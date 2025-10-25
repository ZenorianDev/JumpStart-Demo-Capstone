"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

export default function DetailPage() {
  const { id } = useParams();

  return (
    <div className="max-w-3xl mx-auto py-20 text-center">
      <h2 className="text-3xl font-bold mb-4 text-primary">Opportunity #{id}</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Learn more about this personalized opportunity curated just for you.
      </p>
      <Link href="/dashboard" className="text-primary underline">← Back to Dashboard</Link>
    </div>
  );
}

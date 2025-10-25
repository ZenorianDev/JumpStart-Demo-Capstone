// src/app/page.tsx
'use client'

import React, { useRef } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '../components/ui/Navbar'
import Footer from '../components/ui/Footer'

export default function LandingPage() {
  const router = useRouter()
  const exploreRef = useRef<HTMLElement | null>(null)

  function handleGetExperience() {
    // navigate straight to the interest picker
    router.push('/interests')
  }

  function handleLearnMore() {
    exploreRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <header
        className="relative h-[60vh] min-h-[420px] flex items-center"
        role="banner"
        aria-label="JumpStart hero"
      >
        {/* Background image with dark overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop')",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        {/* Hero content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-white drop-shadow-lg">
              JumpStart
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl">
              Experience AI personalization instantly — choose what you love and get curated content
              right away.
            </p>

            <div className="mt-8 flex justify-center md:justify-start gap-4">
              <button
                onClick={handleGetExperience}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-indigo-500 hover:bg-indigo-600 transition text-white font-medium shadow"
                aria-label="Get Experience"
              >
                Get Experience
              </button>

              <button
                onClick={handleLearnMore}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-white/30 bg-white/5 text-white hover:bg-white/10 transition"
                aria-label="Learn more"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Right-side CTA / illustration cards (simple placeholders matching design) */}
          <div className="hidden md:flex flex-col gap-4 w-[360px]">
            <div className="bg-white/6 rounded-lg p-4 flex items-center gap-3">
              <div className="w-16 h-16 bg-white/12 rounded-md" />
              <div>
                <div className="h-3 w-32 bg-white/20 rounded mb-2" />
                <div className="h-3 w-20 bg-white/16 rounded" />
              </div>
            </div>

            <div className="bg-white/6 rounded-lg p-4 grid grid-cols-2 gap-3">
              <div className="h-20 bg-white/8 rounded" />
              <div className="h-20 bg-white/8 rounded" />
              <div className="h-20 bg-white/8 rounded" />
              <div className="h-20 bg-white/8 rounded" />
            </div>
          </div>
        </div>
      </header>

      {/* Content area */}
      <main className="flex-1 bg-white text-slate-900">
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold mb-3">Title</h2>
              <p className="text-gray-600">
                A short paragraph that explains the product, the benefits of the instant experience,
                and why users should try it. This area corresponds to the white content block in your
                design.
              </p>

              <div className="mt-6">
                <button
                  onClick={handleGetExperience}
                  className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
                >
                  Get Experience
                </button>
              </div>
            </div>

            <aside className="bg-slate-50 rounded-lg p-6 shadow">
              <div className="grid grid-cols-2 gap-3">
                <div className="h-20 bg-white rounded shadow-sm" />
                <div className="h-20 bg-white rounded shadow-sm" />
                <div className="h-20 bg-white rounded shadow-sm" />
                <div className="h-20 bg-white rounded shadow-sm" />
              </div>
            </aside>
          </div>
        </section>

        {/* Explore / Learn More section that Learn More button scrolls to */}
        <section
          ref={exploreRef}
          className="bg-slate-100 border-t border-slate-200 py-16"
          id="explore"
          aria-labelledby="explore-heading"
        >
          <div className="max-w-6xl mx-auto px-6">
            <h3 id="explore-heading" className="text-2xl font-semibold mb-3">
              Explore
            </h3>
            <p className="text-gray-600 mb-6">
              Quick preview of curated categories and content. The full interest selection lives on
              the next screen.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {/* Example category tiles */}
              {['AI', 'Design', 'Fitness', 'Photography', 'Gaming', 'Business', 'Travel', 'Product'].map(
                (t) => (
                  <div key={t} className="bg-white shadow rounded p-4 text-center">
                    <div className="h-16 w-16 mx-auto bg-slate-200 rounded mb-3" />
                    <div className="text-sm font-medium">{t}</div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

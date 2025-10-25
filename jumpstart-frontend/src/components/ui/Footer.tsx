// src/components/ui/Footer.tsx
import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-white/90 text-black flex items-center justify-center font-bold">JS</div>
            <div className="text-white font-semibold">JumpStart</div>
          </div>
          <p className="text-sm mt-3 text-slate-400">
            Personalized recommendations, demo mode. No account required for immediate experience.
          </p>
        </div>

        <div className="text-sm text-slate-400">
          <div className="font-semibold text-white mb-2">Site</div>
          <div className="flex flex-col gap-1">
            <Link href="/interests">Interests</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/">Home</Link>
          </div>
        </div>

        <div className="text-sm text-slate-400">
          <div className="font-semibold text-white mb-2">Legal</div>
          <div className="flex flex-col gap-1">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} JumpStart. All rights reserved.
      </div>
    </footer>
  )
}

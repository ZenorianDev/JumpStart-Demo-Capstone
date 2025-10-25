// src/components/ui/Navbar.tsx
import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <nav className="bg-transparent px-6 py-4 absolute inset-x-0 top-0 z-20">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-white/90 text-black flex items-center justify-center font-bold">
            JS
          </div>
          <span className="text-white font-semibold">JumpStart</span>
        </Link>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/interests" className="text-white/90 hover:text-white">
            Interests
          </Link>
          <Link href="/dashboard" className="text-white/90 hover:text-white">
            Explore
          </Link>
          <button className="px-3 py-1 bg-white text-black rounded text-sm">Sign up</button>
        </div>
      </div>
    </nav>
  )
}

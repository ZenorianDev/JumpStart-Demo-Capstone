// src/components/ui/Navbar.tsx
import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white">
        <Link href="/" className="text-xl font-bold">JumpStart</Link>
        <div className="flex items-center gap-6 text-sm">
          <a href="#explore" className="hover:text-gray-300">Explore</a>
          <a href="#" className="hover:text-gray-300">About</a>
          <a href="#" className="hover:text-gray-300">Businesses</a>
          <a href="#" className="hover:text-gray-300">Create</a>
          <a href="#" className="hover:text-gray-300">Contact Us</a>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-1 rounded-lg border border-white/30 hover:bg-white hover:text-black transition">
            Sign In
          </button>
          <button className="px-4 py-1 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}
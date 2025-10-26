// src/components/ui/Footer.tsx
import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-white font-bold text-lg mb-3">JumpStart</h3>
          <p className="text-sm">
            Empowering creators and businesses with AI-personalized discovery.
          </p>
        </div>
        <div>
          <h4 className="text-white mb-2 font-semibold">Site Map</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">About</a></li>
            <li><a href="#" className="hover:text-white">Businesses</a></li>
            <li><a href="#" className="hover:text-white">Create</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white mb-2 font-semibold">Legal</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs mt-8 border-t border-white/10 pt-4">
        © 2025 JumpStart | All Rights Reserved
      </div>
    </footer>
  );
}

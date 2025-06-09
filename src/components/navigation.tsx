"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Heart, Video, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 border-b border-pink-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative">
                <Heart className="h-8 w-8 text-pink-500" />
                <Sparkles className="h-4 w-4 text-rose-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <span className="text-2xl font-bold gradient-text">ChatVibe</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-pink-500 transition-colors font-medium">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-pink-500 transition-colors font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-pink-500 transition-colors font-medium">
              Contact
            </Link>
            <Link href="/terms" className="text-gray-700 hover:text-pink-500 transition-colors font-medium">
              Terms
            </Link>
            <Link href="/privacy" className="text-gray-700 hover:text-pink-500 transition-colors font-medium">
              Privacy
            </Link>

            {/* Start Chat Button */}
            <Link href="/disclaimer">
              <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold px-6 py-2 rounded-full transition-all transform hover:scale-105 shadow-lg">
                <Video className="h-4 w-4 mr-2" />
                Start Chat
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Link href="/disclaimer">
              <Button
                size="sm"
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold rounded-full"
              >
                <Video className="h-4 w-4" />
              </Button>
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-pink-500">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-pink-100">
              <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-pink-500 font-medium">
                Home
              </Link>
              <Link href="/about" className="block px-3 py-2 text-gray-700 hover:text-pink-500 font-medium">
                About
              </Link>
              <Link href="/contact" className="block px-3 py-2 text-gray-700 hover:text-pink-500 font-medium">
                Contact
              </Link>
              <Link href="/terms" className="block px-3 py-2 text-gray-700 hover:text-pink-500 font-medium">
                Terms
              </Link>
              <Link href="/privacy" className="block px-3 py-2 text-gray-700 hover:text-pink-500 font-medium">
                Privacy
              </Link>
              <div className="px-3 py-2">
                <Link href="/disclaimer">
                  <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold rounded-full">
                    <Video className="h-4 w-4 mr-2" />
                    Start Chat
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

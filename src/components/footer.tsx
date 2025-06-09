import Link from "next/link"
import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="glass-effect border-t border-pink-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-8 w-8 text-pink-500" />
              <span className="text-2xl font-bold gradient-text">ChatVibe</span>
            </div>
            <p className="text-gray-700 mb-4 font-medium">
              Connect with people from around the world through secure video chat and messaging. Meet new friends,
              practice languages, and have meaningful conversations.
            </p>
            <div className="flex items-center text-gray-600">
              <span>Made with</span>
              <Heart className="h-4 w-4 mx-1 text-red-500" />
              <span>for global connections</span>
            </div>
          </div>

          <div>
            <h3 className="text-gray-800 font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-gray-600 hover:text-pink-500 transition-colors">
                Home
              </Link>
              <Link href="/about" className="block text-gray-600 hover:text-pink-500 transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="block text-gray-600 hover:text-pink-500 transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-gray-800 font-semibold mb-4">Legal</h3>
            <div className="space-y-2">
              <Link href="/terms" className="block text-gray-600 hover:text-pink-500 transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="block text-gray-600 hover:text-pink-500 transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-pink-200 mt-8 pt-8 text-center">
          <p className="text-gray-600">© 2024 ChatVibe. All rights reserved. | Safe, Secure, Anonymous Video Chat</p>
        </div>
      </div>
    </footer>
  )
}

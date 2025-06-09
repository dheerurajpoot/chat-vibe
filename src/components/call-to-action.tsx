import Link from "next/link"
import { Heart, MessageCircle, Shield } from "lucide-react"

export function CallToAction() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <div className="glass-effect rounded-2xl p-12 neon-glow">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Ready to Connect?</span>
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto font-medium">
            Join thousands of people making new connections every day. Your perfect match might be just one click away!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="flex items-center space-x-2 text-gray-700">
              <Heart className="h-5 w-5 text-pink-500" />
              <span className="font-medium">Find Your Match</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <MessageCircle className="h-5 w-5 text-rose-500" />
              <span className="font-medium">Live Chat</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <Shield className="h-5 w-5 text-red-500" />
              <span className="font-medium">100% Anonymous</span>
            </div>
          </div>

          <Link
            href="/disclaimer"
            className="inline-block bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-12 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Start Video Chat
          </Link>

          <p className="text-gray-600 text-sm mt-6 font-medium">
            No registration required • 100% Free • Available 24/7
          </p>
        </div>
      </div>
    </section>
  )
}

import type { Metadata } from "next"
import { Users, Heart, Globe, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us - ChatVibe | Random Video Chat Platform",
  description:
    "Learn about ChatVibe's mission to connect people worldwide through safe, anonymous video chat. Discover our story and values.",
  openGraph: {
    title: "About ChatVibe - Connecting People Worldwide",
    description: "Learn about our mission to create meaningful connections through video chat.",
  },
}

export default function About() {
  return (
    <div className="min-h-screen py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">About ChatVibe</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
            Connecting hearts and minds across the globe through the power of video chat
          </p>
        </div>

        <div className="glass-effect rounded-2xl p-8 mb-12 neon-glow">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            ChatVibe was born from a simple yet powerful idea: that meaningful connections can happen anywhere, anytime,
            with anyone. In our increasingly digital world, we recognized the need for a platform that brings people
            together in authentic, spontaneous ways.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Founded in 2024, we've built a community where millions of people from different cultures, backgrounds, and
            walks of life come together to share experiences, learn from each other, and form lasting friendships.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Our commitment to safety, privacy, and user experience drives everything we do. We believe that everyone
            deserves a safe space to express themselves and connect with others.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="glass-effect rounded-xl p-6 neon-glow">
            <Users className="h-12 w-12 text-purple-500 mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
            <p className="text-gray-700">
              To break down barriers and bring people together through technology, fostering understanding and
              friendship across all boundaries.
            </p>
          </div>

          <div className="glass-effect rounded-xl p-6 neon-glow">
            <Heart className="h-12 w-12 text-pink-500 mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Values</h3>
            <p className="text-gray-700">
              Safety, respect, inclusivity, and authenticity guide every decision we make and every feature we build.
            </p>
          </div>

          <div className="glass-effect rounded-xl p-6 neon-glow">
            <Globe className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Global Reach</h3>
            <p className="text-gray-700">
              With users from over 190 countries, we're proud to be a truly global platform that celebrates diversity
              and cultural exchange.
            </p>
          </div>

          <div className="glass-effect rounded-xl p-6 neon-glow">
            <Shield className="h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Safety First</h3>
            <p className="text-gray-700">
              Advanced moderation tools, encryption, and community guidelines ensure a safe environment for all users.
            </p>
          </div>
        </div>

        <div className="glass-effect rounded-2xl p-8 neon-glow text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Join Our Community</h2>
          <p className="text-gray-700 text-lg mb-6">
            Ready to meet amazing people from around the world? Start your journey today!
          </p>
          <a
            href="/"
            className="inline-block bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-3 rounded-full font-semibold transition-all"
          >
            Start Video Chat
          </a>
        </div>
      </div>
    </div>
  )
}

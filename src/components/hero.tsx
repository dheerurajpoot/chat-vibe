import { Heart, Shield, Globe, Users } from "lucide-react"

export function Hero() {
  return (
    <section className="py-20 px-4 text-center love-gradient">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="gradient-text">Find Your</span>
          <br />
          <span className="text-gray-800">Perfect Connection</span>
        </h1>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto font-medium">
          Experience the magic of meeting new people through secure, anonymous video chat. Create meaningful connections
          and discover love, friendship, and adventure!
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          <div className="glass-effect p-6 rounded-xl neon-glow">
            <Heart className="h-8 w-8 text-pink-500 mx-auto mb-3" />
            <p className="text-gray-800 font-semibold">Find Love</p>
          </div>
          <div className="glass-effect p-6 rounded-xl neon-glow">
            <Shield className="h-8 w-8 text-rose-500 mx-auto mb-3" />
            <p className="text-gray-800 font-semibold">Safe & Secure</p>
          </div>
          <div className="glass-effect p-6 rounded-xl neon-glow">
            <Globe className="h-8 w-8 text-red-500 mx-auto mb-3" />
            <p className="text-gray-800 font-semibold">Global Community</p>
          </div>
          <div className="glass-effect p-6 rounded-xl neon-glow">
            <Users className="h-8 w-8 text-pink-600 mx-auto mb-3" />
            <p className="text-gray-800 font-semibold">Real People</p>
          </div>
        </div>
      </div>
    </section>
  )
}

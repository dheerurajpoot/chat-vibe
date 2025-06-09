import { Shield, Zap, Globe, Heart, Lock, Users } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Your privacy is our priority. All connections are encrypted and anonymous.",
      color: "text-emerald-500",
    },
    {
      icon: Zap,
      title: "Instant Connection",
      description: "Connect with strangers in seconds. No waiting, no delays.",
      color: "text-amber-500",
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Meet people from every corner of the world and learn about different cultures.",
      color: "text-blue-500",
    },
    {
      icon: Heart,
      title: "Make Friends",
      description: "Form meaningful connections and friendships that can last a lifetime.",
      color: "text-rose-500",
    },
    {
      icon: Lock,
      title: "No Registration",
      description: "Jump right in without creating accounts or sharing personal information.",
      color: "text-cyan-500",
    },
    {
      icon: Users,
      title: "Active Community",
      description: "Join thousands of users online at any time, day or night.",
      color: "text-teal-500",
    },
  ]

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Why Choose ChatVibe?</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
            Experience the best in random video chat with features designed for your safety, privacy, and enjoyment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="glass-effect p-6 rounded-xl neon-glow hover:scale-105 transition-transform">
              <feature.icon className={`h-12 w-12 ${feature.color} mb-4`} />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

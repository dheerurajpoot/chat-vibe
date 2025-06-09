import type { Metadata } from "next"
import { Mail, MessageSquare, Phone, MapPin } from "lucide-react"
import { ContactForm } from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Contact Us - ChatVibe | Get in Touch",
  description:
    "Have questions or feedback? Contact the ChatVibe team. We're here to help with any issues or suggestions.",
  openGraph: {
    title: "Contact ChatVibe - We're Here to Help",
    description: "Get in touch with our support team for any questions or feedback.",
  },
}

export default function Contact() {
  return (
    <div className="min-h-screen py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Contact Us</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="glass-effect rounded-2xl p-8 neon-glow mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Get in Touch</h2>
              <p className="text-gray-700 mb-8">
                Whether you have questions, feedback, or need support, we're here to help. Our team is dedicated to
                providing you with the best possible experience.
              </p>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6 text-purple-500" />
                  <div>
                    <h3 className="text-gray-800 font-semibold">Email</h3>
                    <p className="text-gray-700">support@chatvibe.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <MessageSquare className="h-6 w-6 text-blue-500" />
                  <div>
                    <h3 className="text-gray-800 font-semibold">Live Chat</h3>
                    <p className="text-gray-700">Available 24/7 on our platform</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Phone className="h-6 w-6 text-green-500" />
                  <div>
                    <h3 className="text-gray-800 font-semibold">Phone</h3>
                    <p className="text-gray-700">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <MapPin className="h-6 w-6 text-pink-500" />
                  <div>
                    <h3 className="text-gray-800 font-semibold">Address</h3>
                    <p className="text-gray-700">
                      123 Tech Street
                      <br />
                      San Francisco, CA 94105
                      <br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-effect rounded-xl p-6 neon-glow">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-gray-800 font-semibold">How do I report inappropriate behavior?</h4>
                  <p className="text-gray-700 text-sm">
                    Use the report button during your chat or contact us directly.
                  </p>
                </div>
                <div>
                  <h4 className="text-gray-800 font-semibold">Is my personal information safe?</h4>
                  <p className="text-gray-700 text-sm">
                    Yes, we don't store personal data and all chats are anonymous.
                  </p>
                </div>
                <div>
                  <h4 className="text-gray-800 font-semibold">Can I use ChatVibe on mobile?</h4>
                  <p className="text-gray-700 text-sm">Yes, our platform works on all devices with a web browser.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-2xl p-8 neon-glow">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Send us a Message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service - ChatVibe | Legal Terms",
  description:
    "Read ChatVibe's Terms of Service. Understand your rights and responsibilities when using our video chat platform.",
  openGraph: {
    title: "ChatVibe Terms of Service",
    description: "Legal terms and conditions for using ChatVibe video chat platform.",
  },
}

export default function Terms() {
  return (
    <div className="min-h-screen py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Terms of Service</span>
          </h1>
          <p className="text-xl text-gray-700 font-medium">Last updated: December 7, 2024</p>
        </div>

        <div className="glass-effect rounded-2xl p-8 neon-glow space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using ChatVibe, you accept and agree to be bound by the terms and provision of this
              agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Use License</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Permission is granted to temporarily use ChatVibe for personal, non-commercial transitory viewing only.
              This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="text-gray-700 space-y-2 ml-6">
              <li>• modify or copy the materials</li>
              <li>• use the materials for any commercial purpose or for any public display</li>
              <li>• attempt to reverse engineer any software contained on the website</li>
              <li>• remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">3. User Conduct</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree to use ChatVibe responsibly and in accordance with these terms. You must not:
            </p>
            <ul className="text-gray-700 space-y-2 ml-6">
              <li>• Engage in harassment, abuse, or harmful behavior</li>
              <li>• Share inappropriate, offensive, or illegal content</li>
              <li>• Impersonate others or provide false information</li>
              <li>• Attempt to hack, disrupt, or damage the service</li>
              <li>• Use the service for commercial purposes without permission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Privacy and Data</h2>
            <p className="text-gray-700 leading-relaxed">
              We respect your privacy and are committed to protecting your personal information. Our Privacy Policy
              explains how we collect, use, and protect your information when you use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Age Restrictions</h2>
            <p className="text-gray-700 leading-relaxed">
              You must be at least 18 years old to use ChatVibe. If you are between 13 and 17 years old, you may only
              use the service with parental consent and supervision.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Content and Monitoring</h2>
            <p className="text-gray-700 leading-relaxed">
              While we strive to maintain a safe environment, we cannot monitor all interactions. Users are responsible
              for their own safety and should report any inappropriate behavior immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Termination</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to terminate or suspend access to our service immediately, without prior notice or
              liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Disclaimer</h2>
            <p className="text-gray-700 leading-relaxed">
              The information on this website is provided on an "as is" basis. To the fullest extent permitted by law,
              this Company excludes all representations, warranties, conditions and terms relating to our website and
              the use of this website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon
              posting. Your continued use of the service after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at{" "}
              <a href="mailto:legal@chatvibe.com" className="text-pink-500 hover:underline">
                legal@chatvibe.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - ChatVibe | Your Privacy Matters",
  description: "Learn how ChatVibe protects your privacy and handles your data. Read our comprehensive privacy policy.",
  openGraph: {
    title: "ChatVibe Privacy Policy - Your Privacy Matters",
    description: "Comprehensive privacy policy explaining how we protect your data and privacy.",
  },
}

export default function Privacy() {
  return (
    <div className="min-h-screen py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Privacy Policy</span>
          </h1>
          <p className="text-xl text-gray-700 font-medium">Last updated: December 7, 2024</p>
        </div>

        <div className="glass-effect rounded-2xl p-8 neon-glow space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              At ChatVibe, we are committed to protecting your privacy. We collect minimal information to provide our
              service:
            </p>
            <ul className="text-gray-700 space-y-2 ml-6">
              <li>
                • <strong>Technical Information:</strong> IP address, browser type, device information
              </li>
              <li>
                • <strong>Usage Data:</strong> How you interact with our service (anonymized)
              </li>
              <li>
                • <strong>Communication Data:</strong> Chat logs are not stored permanently
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use the collected information for the following purposes:
            </p>
            <ul className="text-gray-700 space-y-2 ml-6">
              <li>• To provide and maintain our service</li>
              <li>• To improve user experience and service quality</li>
              <li>• To detect and prevent abuse or harmful behavior</li>
              <li>• To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Data Storage and Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We implement appropriate security measures to protect your information. Video chats are peer-to-peer and
              not stored on our servers. Any temporary data is encrypted and automatically deleted after your session
              ends.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Cookies and Tracking</h2>
            <p className="text-gray-700 leading-relaxed mb-4">We use cookies and similar technologies to:</p>
            <ul className="text-gray-700 space-y-2 ml-6">
              <li>• Remember your preferences</li>
              <li>• Analyze website traffic and usage patterns</li>
              <li>• Improve our service performance</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Third-Party Services</h2>
            <p className="text-gray-700 leading-relaxed">
              We may use third-party services for analytics and service improvement. These services have their own
              privacy policies, and we encourage you to review them. We do not sell or rent your personal information to
              third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Data Retention</h2>
            <p className="text-gray-700 leading-relaxed">
              We retain personal information only as long as necessary to provide our services and comply with legal
              obligations. Chat data is not permanently stored, and video calls are not recorded or saved.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">You have the right to:</p>
            <ul className="text-gray-700 space-y-2 ml-6">
              <li>• Access your personal information</li>
              <li>• Correct inaccurate information</li>
              <li>• Request deletion of your information</li>
              <li>• Object to processing of your information</li>
              <li>• Data portability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our service is not intended for children under 13. We do not knowingly collect personal information from
              children under 13. If you are a parent and believe your child has provided us with personal information,
              please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">9. International Data Transfers</h2>
            <p className="text-gray-700 leading-relaxed">
              Your information may be transferred to and processed in countries other than your own. We ensure
              appropriate safeguards are in place to protect your information in accordance with this privacy policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new
              policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:privacy@chatvibe.com" className="text-pink-500 hover:underline">
                privacy@chatvibe.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

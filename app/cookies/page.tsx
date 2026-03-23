"use client";

import { FadeIn } from "@/components/MotionWrappers";

export default function CookiesPolicy() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <FadeIn>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Cookie Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. What Are Cookies?</h2>
              <p>
                Cookies are small text files that are stored on your device (computer, tablet, or 
                mobile phone) when you visit a website. They allow websites to recognize your device, 
                store your preferences, and help us understand how you use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.1 Essential Cookies</h3>
              <p>
                These cookies are necessary for the website to function properly. They enable 
                basic functions like page navigation and access to secure areas of the website.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.2 Performance Cookies</h3>
              <p>
                These cookies collect information about how you use our website, such as which 
                pages you visit and any errors you experience. This information is used to improve 
                the performance of our website.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.3 Functional Cookies</h3>
              <p>
                These cookies allow our website to remember choices you've made (such as your 
                username, language, or region) and provide enhanced, more personalized features.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.4 Advertising Cookies</h3>
              <p>
                These cookies are used to deliver advertisements that are relevant to you. They 
                may track your browsing habits across multiple websites to build a profile of 
                your interests.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. How We Use Cookies</h2>
              <p>We use cookies to:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Improve your browsing experience on our website</li>
                <li>Understand how you interact with our website</li>
                <li>Remember your preferences and settings</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Deliver personalized content and advertisements</li>
                <li>Prevent fraud and enhance security</li>
                <li>Measure the effectiveness of marketing campaigns</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Third-Party Cookies</h2>
              <p>
                We may allow third-party service providers to place cookies on your device. These 
                third parties may include analytics providers, advertising networks, and social 
                media platforms. These cookies are subject to the privacy policies of the third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Managing Cookies</h2>
              <p>
                Most web browsers allow you to control cookies through their settings. You can:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong>Block all cookies:</strong> Some browsers allow you to block all cookies by default</li>
                <li><strong>Block third-party cookies:</strong> You can typically block cookies from third-party sources</li>
                <li><strong>Delete cookies:</strong> You can delete cookies that have already been set</li>
                <li><strong>Customize settings:</strong> You can choose which cookies are accepted or rejected</li>
              </ul>
              <p className="mt-4">
                Please note that blocking or deleting cookies may affect your ability to use certain 
                features of our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Cookie Compliance</h2>
              <p>
                We comply with applicable data protection and privacy laws regarding the use of 
                cookies, including obtaining necessary consent before storing non-essential cookies 
                on your device.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Updates to This Policy</h2>
              <p>
                We may update this Cookie Policy from time to time to reflect changes in our 
                practices or applicable laws. We will notify you of any significant changes by 
                updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Contact Us</h2>
              <p>
                If you have questions about our use of cookies, please contact us at:
              </p>
              <div className="mt-4 bg-gray-50 p-4 rounded">
                <p><strong>Email:</strong> info@goexports.co.uk</p>
                <p><strong>Phone:</strong> +91 98765 43210</p>
                <p><strong>Address:</strong> 123 Business Park, Mumbai - 400069, India</p>
              </div>
            </section>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}

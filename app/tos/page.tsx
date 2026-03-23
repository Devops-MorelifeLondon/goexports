"use client";

import { FadeIn } from "@/components/MotionWrappers";

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <FadeIn>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Introduction</h2>
              <p>
                Welcome to GoExports ("we," "us," "our," or "Company"). These Terms of Service 
                ("Terms") govern your use of our website, products, and services. By accessing or 
                using GoExports, you agree to be bound by these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. User Accounts</h2>
              <p>
                When you create an account with us, you must provide accurate, complete, and 
                current information. You are responsible for maintaining the confidentiality of 
                your account credentials and for all activities that occur under your account. 
                You agree to accept responsibility for all activities that occur under your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Acceptable Use</h2>
              <p>You agree not to use our platform for:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Any illegal or unlawful purpose</li>
                <li>Violating any applicable laws or regulations</li>
                <li>Infringing upon intellectual property rights</li>
                <li>Engaging in fraud, deception, or misrepresentation</li>
                <li>Harassing, abusing, or harming other users</li>
                <li>Transmitting malware or harmful code</li>
                <li>Attempting to gain unauthorized access to our systems</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Intellectual Property Rights</h2>
              <p>
                All content on the GoExports platform, including text, graphics, logos, images, 
                and software, is the property of GoExports or its content suppliers and is 
                protected by international copyright laws. You may not reproduce, distribute, 
                or transmit any content without our prior written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, GoExports shall not be liable for any 
                indirect, incidental, special, consequential, or punitive damages resulting from 
                your use of or inability to use the platform, even if we have been advised of 
                the possibility of such damages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Termination</h2>
              <p>
                We reserve the right to suspend or terminate your account and access to our 
                platform at any time, with or without cause and without notice, if we believe 
                you have violated these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Changes to Terms</h2>
              <p>
                We may modify these Terms at any time. Your continued use of the platform 
                constitutes your acceptance of any changes to these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Contact Us</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at:
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

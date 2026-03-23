"use client";

import { FadeIn } from "@/components/MotionWrappers";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <FadeIn>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Introduction</h2>
              <p>
                GoExports ("we," "us," "our," "Company," or "Platform") is committed to protecting 
                your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard 
                your information when you use our website and services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Information We Collect</h2>
              <p>We may collect information about you in a variety of ways. The information we may 
              collect on the Site includes:</p>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.1 Personal Data</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name and email address</li>
                <li>Phone number</li>
                <li>Company name and business information</li>
                <li>Profile information</li>
                <li>Payment information</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.2 Automatically Collected Information</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Browser type and version</li>
                <li>IP address</li>
                <li>Pages visited and time spent</li>
                <li>Cookies and similar technologies</li>
                <li>Device information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Use of Your Information</h2>
              <p>Having accurate information about you permits us to provide you with a smooth, 
              efficient, and customized experience. Specifically, we may use information collected 
              about you via the Site to:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Generate a personal profile about you so that future visits to the Site are tailored to your preferences</li>
                <li>Increase the efficiency and operation of the Site</li>
                <li>Monitor and analyze usage and trends to improve your experience with the Site</li>
                <li>Fulfill and manage your requests for our services</li>
                <li>Communicate with you via email, telephone, or postal mail regarding updates to the Site, products, or services</li>
                <li>Process your transactions and send related information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Disclosure of Your Information</h2>
              <p>
                We may share your information in the following situations:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong>By Law or to Protect Rights:</strong> If we believe release of information is necessary to comply with law</li>
                <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us</li>
                <li><strong>Business Transfers:</strong> Your information may be transferred in connection with our merger or acquisition</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Security of Your Information</h2>
              <p>
                We use administrative, technical, and physical security measures to help protect 
                your personal information. However, no method of transmission over the Internet is 
                100% secure, and no security measure is impenetrable.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Contact Us Regarding Privacy</h2>
              <p>
                If you have questions or comments about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-4 bg-gray-50 p-4 rounded">
                <p><strong>Email:</strong> info@goexports.co.uk</p>
                <p><strong>Phone:</strong> +91 98765 43210</p>
                <p><strong>Address:</strong> 123 Business Park, Mumbai - 400069, India</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Changes to Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes 
                by updating the "Last updated" date of this Privacy Policy.
              </p>
            </section>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}

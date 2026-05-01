function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

        <div className="prose prose-sm max-w-none text-gray-600 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p>
              BlogHub ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use,
              disclose, and otherwise handle your information when you use our website and services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Name, email address, and password when you create an account</li>
              <li>Profile information including biography and profile picture</li>
              <li>Articles, comments, and other content you create</li>
              <li>Communication preferences and support requests</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your inquiries and requests</li>
              <li>Prevent fraud and enhance security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Sharing</h2>
            <p>
              We do not sell, trade, or share your personal information with third parties except as required by law or
              with your explicit consent. Your public profile and published articles are visible to all users.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information.
              However, no method of transmission over the Internet is 100% secure.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Access your personal information</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your account and associated data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our privacy practices, please contact us at
              privacy@bloghub.com
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
            <p className="text-sm text-gray-700">
              Last updated: April 2026. We may update this Privacy Policy from time to time. Changes will be effective
              when posted on this page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Privacy;

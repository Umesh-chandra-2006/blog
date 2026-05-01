function Terms() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">Terms of Service</h1>

        <div className="prose prose-sm max-w-none text-gray-600 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using BlogHub ("the Service"), you accept and agree to be bound by the terms and
              provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. User Accounts</h2>
            <p>
              You are responsible for safeguarding the password you use to access the Service. You agree not to
              disclose your password to any third party and are solely responsible for all activities that occur under
              your account.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Content</h2>
            <p>
              You retain all rights to any content you submit, post, or display on or through the Service. By submitting
              content, you grant BlogHub a worldwide, non-exclusive, royalty-free license to use, copy, modify, and
              distribute your content.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Prohibited Activities</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Post hateful, defamatory, or obscene content</li>
              <li>Engage in harassment or abuse</li>
              <li>Attempt to gain unauthorized access to the Service</li>
              <li>Spam or advertise without permission</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Limitation of Liability</h2>
            <p>
              BlogHub shall not be liable for any indirect, incidental, special, consequential, or punitive damages
              resulting from your use of or inability to use the Service, even if we have been advised of the
              possibility of such damages.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Termination</h2>
            <p>
              BlogHub may terminate your access to the Service at any time, for any reason, or for no reason,
              including if we believe you have violated these Terms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be effective when posted on this
              page. Your continued use of the Service constitutes acceptance of the revised Terms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact</h2>
            <p>For questions about these Terms, please contact us at support@bloghub.com</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
            <p className="text-sm text-gray-700">
              Last updated: April 2026. These Terms of Service are subject to change at our sole discretion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Terms;

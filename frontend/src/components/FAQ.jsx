import { useState } from "react";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I create an account?",
      answer: "Click the 'Sign Up' button on the home page, fill in your details (name, email, password), and choose your role as either an Author or User. You'll be ready to start immediately!"
    },
    {
      question: "Can I write articles as a User?",
      answer: "Users can read and comment on articles, but only Authors can write and publish articles. You can change your role by contacting our support team."
    },
    {
      question: "How do I publish an article?",
      answer: "Log in as an Author, click 'Write' in the navigation menu, fill in your article details (title, content, category), and click 'Publish Article'. Your article will be live immediately!"
    },
    {
      question: "Can I edit my article after publishing?",
      answer: "Yes! You can edit your articles anytime from your Author Dashboard. Click 'Edit' on any article to update its content."
    },
    {
      question: "How do I delete an article?",
      answer: "From your Author Dashboard, click 'Delete' on the article you want to remove. Deleted articles cannot be recovered."
    },
    {
      question: "What does the admin do?",
      answer: "Admins review all published articles and can activate or deactivate them to ensure content quality and community guidelines are maintained."
    },
    {
      question: "Can I comment on articles?",
      answer: "Yes! If you're logged in as a User, you can comment on any active article. Authors can see all comments on their articles."
    },
    {
      question: "How is my privacy protected?",
      answer: "We take privacy seriously. Your personal information is encrypted and never shared with third parties. See our Privacy Policy for full details."
    },
    {
      question: "What file formats can I upload for my profile picture?",
      answer: "You can upload JPG or PNG files up to 2MB in size. Other formats or larger files will be rejected."
    },
    {
      question: "What happens if I forget my password?",
      answer: "Click 'Forgot Password' on the login page to reset your password. You'll receive an email with instructions."
    },
    {
      question: "Can I delete my account?",
      answer: "Yes, you can request account deletion from your profile settings. This will remove all your personal information, but published articles may remain visible."
    },
    {
      question: "How do I report inappropriate content?",
      answer: "Use the report feature on any article or comment. Our moderation team will review and take appropriate action within 24 hours."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 px-4 sm:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about BlogHub
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:py-24">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900 text-left">
                    {faq.question}
                  </h3>
                  <span
                    className={`flex-shrink-0 text-2xl text-blue-600 transition-transform ${ openIndex === index ? "rotate-180" : ""}`}
                  >
                    ▼
                  </span>
                </button>
                {openIndex === index && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Still Have Questions */}
          <div className="mt-16 bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h3>
            <p className="text-gray-700 mb-6">
              Can't find the answer you're looking for? Please contact our support team.
            </p>
            <a
              href="/contact"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FAQ;

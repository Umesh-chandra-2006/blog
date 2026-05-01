import { NavLink } from "react-router";

function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-20 px-4 sm:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            About BlogHub
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Empowering writers and connecting readers through compelling stories and meaningful conversations.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                BlogHub is built on the belief that everyone has a story worth sharing. Our platform empowers writers,
                authors, and storytellers to express their ideas, connect with audiences, and build communities around
                shared interests.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We're committed to providing a clean, intuitive, and respectful space for meaningful content and
                conversations.
              </p>
            </div>
            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 h-64 rounded-lg flex items-center justify-center">
              <div className="text-6xl">🚀</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-16 px-4 sm:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-16">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <div className="text-4xl mb-4">✍️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Freedom of Expression</h3>
              <p className="text-gray-600">
                We believe in the power of diverse voices and perspectives. Our platform welcomes all creators.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community First</h3>
              <p className="text-gray-600">
                Fostering genuine connections between readers and writers, building meaningful communities.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Trust & Safety</h3>
              <p className="text-gray-600">
                We prioritize user safety and maintain a respectful environment for all members.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Join Our Community
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Start sharing your stories, connecting with readers, and making an impact today.
          </p>
          <NavLink
            to="/register"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Get Started Free
          </NavLink>
        </div>
      </section>
    </div>
  );
}

export default About;

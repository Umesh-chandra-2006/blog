import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../store/useAuth";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";
import { calculateReadingTime, formatDate, getExcerpt, getCategoryColor } from "../utils/articleHelpers";

function Home() {
  const { isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true);
        setError(null);
        let res = await axios.get(API_ENDPOINTS.USER_ARTICLES, {
          withCredentials: true,
        });
        if (res.status === 200) {
          setArticles(res.data.articles || []);
        }
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError(err.response?.data?.message || "Failed to load articles.");
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  const handleArticleClick = (article) => {
    navigate(`/articles/${article._id}`, { state: { article } });
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 py-20 px-4 sm:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Share Your Stories with the World
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            A modern platform for writers, authors, and storytellers. Create, publish, and connect with readers who care about your words.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isAuthenticated ? (
              <>
                <NavLink
                  to="/register"
                  className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Get Started Free
                </NavLink>
                <NavLink
                  to="/login"
                  className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
                >
                  Sign In
                </NavLink>
              </>
            ) : (
              <NavLink
                to={
                  currentUser?.role === "ADMIN"
                    ? "/admin-dashboard"
                    : currentUser?.role === "AUTHOR"
                      ? "/author-dashboard"
                      : "/user-dashboard"
                }
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Go to Dashboard
              </NavLink>
            )}
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-gray-100 pb-5">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
              Latest Articles
            </h2>
            <p className="text-gray-600">
              Browse the latest insights, stories, and ideas from our community.
            </p>
          </div>
          {isAuthenticated && (
            <NavLink
              to={
                currentUser?.role === "ADMIN"
                  ? "/admin-dashboard"
                  : currentUser?.role === "AUTHOR"
                    ? "/author-dashboard"
                    : "/user-dashboard"
              }
              className="mt-4 md:mt-0 text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
            >
              Go to your Dashboard <span className="group-hover:translate-x-1 transition-transform">→</span>
            </NavLink>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-gray-300 border-t-2"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 max-w-2xl mx-auto text-center">
            {error}
          </div>
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.slice(0, 6).map((article) => {
              const readingTime = calculateReadingTime(article.content);
              const publishDate = formatDate(article.createdAt);
              return (
                <article
                  key={article._id}
                  onClick={() => handleArticleClick(article)}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col h-full group hover:-translate-y-1"
                >
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Category */}
                    <div className="mb-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(article.category)}`}>
                        {article.category}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    
                    {/* Excerpt */}
                    <p className="text-gray-600 mb-6 text-sm line-clamp-3 leading-relaxed flex-1">
                      {getExcerpt(article.content, 130)}
                    </p>

                    {/* Meta info */}
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100 mt-auto">
                      <img
                        src={article.author?.profileImageUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${article.author?._id || 'author'}`}
                        alt={article.author?.firstName || "Author"}
                        className="w-8 h-8 rounded-full border border-gray-200"
                      />
                      <div className="text-xs">
                        <p className="font-semibold text-gray-900">{article.author?.firstName || "Anonymous"}</p>
                        <p className="text-gray-500">{publishDate} • {readingTime} min read</p>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 border border-gray-200 rounded-xl">
            <p className="text-gray-600">No articles available. Check back later!</p>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-16">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <span className="text-2xl">✍️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Write Freely</h3>
              <p className="text-gray-600 leading-relaxed">
                Express yourself with our intuitive editor. Format, organize, and polish your articles exactly how you want.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Share Globally</h3>
              <p className="text-gray-600 leading-relaxed">
                Publish to a world of readers. Organize content by categories and reach your audience instantly.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Engage Readers</h3>
              <p className="text-gray-600 leading-relaxed">
                Build community through comments. Connect with your audience and grow your following.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-16 px-4 sm:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-16">
            Get Started in 3 Steps
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute top-0 left-1/2 w-12 h-12 -ml-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div className="mt-16 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Create Account</h3>
                <p className="text-gray-600">
                  Sign up in seconds and choose your role - Author to write or User to read and comment.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute top-0 left-1/2 w-12 h-12 -ml-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div className="mt-16 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Write Content</h3>
                <p className="text-gray-600">
                  Craft your articles with our clean editor. Add titles, content, and categorize your work.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="absolute top-0 left-1/2 w-12 h-12 -ml-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div className="mt-16 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Publish & Share</h3>
                <p className="text-gray-600">
                  Publish instantly. Your articles are live! Share with the community and start engaging.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="bg-blue-600 text-white py-16 px-4 sm:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Share Your Story?</h2>
            <p className="text-lg text-blue-100 mb-8">
              Join thousands of writers and readers on our platform. It's free to get started.
            </p>
            <NavLink
              to="/register"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Start Writing Today
            </NavLink>
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;

import { useState, useEffect } from "react";
import { useAuth } from "../store/useAuth";
import { useNavigate } from "react-router";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";
import { toast } from "react-hot-toast";
import { calculateReadingTime, formatDate, getExcerpt, getCategoryColor } from "../utils/articleHelpers";

function AuthorDashboard() {
  const currentUser = useAuth((state) => state.currentUser);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function getArticles() {
      setLoading(true);
      setError(null);
      try {
        let res = await axios.get(API_ENDPOINTS.AUTHOR_MY_ARTICLES, {
          withCredentials: true,
        });
        if (res.status === 200) {
          setArticles(res.data.articles);
        } else {
          throw new Error("Unable to fetch articles");
        }
      } catch (err) {
        const errorMessage = err.response?.data?.message || "Unable to fetch articles";
        setError(errorMessage);
        toast.error(errorMessage);
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    }
    getArticles();
  }, []);

  const gotoArticle = (articleObj) => {
    navigate("/article", { state: { article: articleObj } });
  };

  const handleEditArticle = (articleObj) => {
    navigate("/edit-article", { state: { article: articleObj } });
  };

  const handleDeleteArticle = async (articleId) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        const response = await axios.patch(
          API_ENDPOINTS.DELETE_ARTICLE(articleId),
          { isArticleActive: false },
          { withCredentials: true }
        );
        if (response.status === 200) {
          toast.success("Article deleted successfully!");
          setArticles(articles.filter((a) => a._id !== articleId));
        }
      } catch (err) {
        const errorMessage = err.response?.data?.message || "Failed to delete article";
        toast.error(errorMessage);
        console.error("Error deleting article:", err);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-gray-300 border-t-2"></div>
          <p className="mt-4 text-gray-600">Loading articles...</p>
        </div>
      </div>
    );
  }

  if (error !== null) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 font-semibold">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header Section */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Author Dashboard</h1>
          <p className="text-lg text-gray-600">
            Welcome back, <strong className="font-semibold text-gray-800">{currentUser?.firstName}</strong>!
          </p>
        </div>
        <button
          onClick={() => navigate("/add-article")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          + Write New Article
        </button>
      </div>

      {/* Articles Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Articles</h2>
        {articles && articles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map((article) => (
              <div
                key={article._id}
                className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md hover:border-gray-300 transition-all"
              >
                <div onClick={() => gotoArticle(article)} className="cursor-pointer mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600">
                    {article.title}
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>
                      <strong className="font-medium text-gray-700">Category:</strong>{" "}
                      <span className="inline-block bg-gray-100 px-2 py-1 rounded text-xs ml-1">
                        {article.category}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleEditArticle(article)}
                    className="flex-1 bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteArticle(article._id)}
                    className="flex-1 bg-red-500 text-white px-3 py-2 rounded text-sm hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-600 mb-4">No articles yet. Start creating content!</p>
            <button
              onClick={() => navigate("/add-article")}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Write Your First Article
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthorDashboard;

import { useState, useEffect } from "react";
import { useAuth } from "../store/useAuth";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";
import { toast } from "react-hot-toast";
import { formatDate, calculateReadingTime } from "../utils/articleHelpers";

function AdminDashboard() {
  const currentUser = useAuth((state) => state.currentUser);
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getArticles() {
      setLoading(true);
      setError(null);
      try {
        let res = await axios.get(API_ENDPOINTS.ADMIN_ARTICLES, {
          withCredentials: true,
        });
        if (res.status === 200) {
          setArticles(res.data.articles);
        }
      } catch (err) {
        const errorMessage = err.response?.data?.message || "Failed to fetch articles";
        setError(errorMessage);
        toast.error(errorMessage);
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    }
    getArticles();
  }, []);

  const handleArticleToggle = async (articleId, currentStatus) => {
    try {
      const response = await axios.put(
        API_ENDPOINTS.ADMIN_ARTICLE(articleId),
        { isArticleActive: !currentStatus },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setArticles(
          articles.map((article) =>
            article._id === articleId
              ? { ...article, isArticleActive: !currentStatus }
              : article
          )
        );
        toast.success(`Article ${!currentStatus ? "activated" : "deactivated"}`);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to update article";
      toast.error(errorMessage);
      console.error("Error updating article:", err);
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

  if (error) {
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
        <p className="text-lg text-gray-600">
          Welcome, <strong className="font-semibold text-gray-800">{currentUser?.firstName}</strong>!
        </p>
      </div>

      {/* Articles Management Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">All Articles</h2>

        {articles && articles.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Title</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Author</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Category</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Status</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article._id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">
                      <span className="line-clamp-2">{article.title}</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      {article.author.firstName}
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      <span className="inline-block bg-gray-100 px-3 py-1 rounded text-sm">
                        {article.category}
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      <span
                        className={`inline-block px-3 py-1 rounded text-sm font-medium ${
                          article.isArticleActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {article.isArticleActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      <button
                        onClick={() =>
                          handleArticleToggle(article._id, article.isArticleActive)
                        }
                        className={`px-4 py-2 rounded font-medium text-white transition-colors ${
                          article.isArticleActive
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-green-500 hover:bg-green-600"
                        }`}
                      >
                        {article.isArticleActive ? "Deactivate" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-600">No articles found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;

import { useState, useEffect } from "react";
import { useAuth } from "../store/useAuth";
import { useNavigate } from "react-router";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";
import { toast } from "react-hot-toast";

function UserDashboard() {
  const currentUser = useAuth().currentUser;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function getArticles() {
      setLoading(true);
      setError(null);
      try {
        let res = await axios.get(API_ENDPOINTS.USER_ARTICLES, {
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-lg text-gray-600">
          Welcome back, <strong className="font-semibold text-gray-800">{currentUser?.firstName}</strong>!
        </p>
      </div>

      {/* Articles Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Articles</h2>
        {articles && articles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map((article) => (
              <div
                key={article._id}
                onClick={() => gotoArticle(article)}
                className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md hover:border-gray-300 transition-all cursor-pointer"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <div>
                    <strong className="font-medium text-gray-700">Author:</strong>{" "}
                    {article.author.firstName}
                  </div>
                  <div>
                    <strong className="font-medium text-gray-700">Category:</strong>{" "}
                    <span className="inline-block bg-gray-100 px-2 py-1 rounded text-xs ml-1">
                      {article.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-600">No articles yet. Start reading!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;

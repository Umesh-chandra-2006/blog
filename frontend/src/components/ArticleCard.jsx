import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../store/useAuth";
import { API_ENDPOINTS } from "../config/api";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { calculateReadingTime, formatDate, getCategoryColor } from "../utils/articleHelpers";

function ArticleCard() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const currentUser = useAuth().currentUser;
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState(state?.article);

  const addComment = async (commentContent) => {
    try {
      if (commentContent.trim().length === 0) {
        toast.error("Comment cannot be empty");
        return;
      }

      setLoading(true);
      let res = await axios.put(
        API_ENDPOINTS.ADD_COMMENT(article._id),
        {
          user: currentUser._id,
          comment: commentContent,
        },
        { withCredentials: true },
      );

      if (res.status === 200) {
        toast.success("Comment added successfully!");
        setArticle(res.data.article);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Error adding comment";
      toast.error(errorMessage);
      console.error("Error adding comment:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditArticle = () => {
    if (currentUser?.role === "AUTHOR") {
      navigate("/edit-article", { state: { article } });
    } else {
      toast.error("Only authors can edit articles");
    }
  };

  if (!state?.article) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 font-semibold">Article not found</p>
        </div>
      </div>
    );
  }

  const readingTime = calculateReadingTime(article.content);
  const publishDate = formatDate(article.createdAt);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Article Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6">
          <div className="mb-6">
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getCategoryColor(article.category)}`}>
              {article.category}
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <img
                src={article.author.profileImageUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${article.author._id}`}
                alt={article.author.firstName}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold text-gray-900">{article.author.firstName}</p>
                <p className="text-sm text-gray-600">Author</p>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              <p>📅 {publishDate}</p>
            </div>

            <div className="text-sm text-gray-600">
              <p>⏱️ {readingTime} min read</p>
            </div>

            {currentUser?.role === "AUTHOR" && currentUser._id === article.author._id && (
              <button
                onClick={handleEditArticle}
                className="ml-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
              >
                ✏️ Edit Article
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6">
        <article className="bg-white rounded-lg border border-gray-200 p-8 sm:p-12">
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
            {article.content}
          </div>
        </article>

        {/* Comments Section */}
        <div className="mt-12">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Comments <span className="text-lg text-gray-600">({article.comments?.length || 0})</span>
            </h2>

            {/* Add Comment Form - Only for Users */}
            {currentUser?.role === "USER" && (
              <div className="mb-12 pb-12 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Share Your Thoughts</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const textarea = e.target.querySelector("textarea");
                    addComment(textarea.value);
                    textarea.value = "";
                  }}
                >
                  <textarea
                    className="w-full p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows="4"
                    placeholder="Share your thoughts on this article..."
                    disabled={loading}
                  ></textarea>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                  >
                    {loading ? "Posting..." : "Post Comment"}
                  </button>
                </form>
              </div>
            )}

            {/* Comments List */}
            {article.comments && article.comments.length > 0 ? (
              <div className="space-y-6">
                {article.comments.map((comment) => (
                  <div key={comment._id} className="border-b border-gray-200 pb-6">
                    <div className="flex items-start gap-4">
                      <img
                        src={comment.user.profileImageUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user._id}`}
                        alt={comment.user.firstName}
                        className="w-10 h-10 rounded-full flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-semibold text-gray-900">{comment.user.firstName}</p>
                          <p className="text-sm text-gray-500">{comment.user.email}</p>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{comment.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-12 text-gray-600">
                No comments yet. Be the first to share your thoughts!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;

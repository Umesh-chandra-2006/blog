import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../store/useAuth";
import { API_ENDPOINTS } from "../config/api";
import { toast } from "react-hot-toast";
import { useState } from "react";

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

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Article Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{article.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 pb-6 border-b border-gray-200">
          <div className="inline-block bg-gray-100 px-3 py-1 rounded text-gray-700 font-medium">
            {article.category}
          </div>
          <div>
            By <strong className="font-semibold text-gray-800">{article.author.firstName}</strong>
          </div>
          {currentUser?.role === "AUTHOR" && currentUser._id === article.author._id && (
            <button
              onClick={handleEditArticle}
              className="ml-auto bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      {/* Article Content */}
      <div className="mb-8 text-gray-700 leading-relaxed whitespace-pre-wrap">
        {article.content}
      </div>

      {/* Comments Section */}
      <div className="border-t border-gray-200 pt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Comments ({article.comments?.length || 0})
        </h2>

        {article.comments && article.comments.length > 0 ? (
          <div className="space-y-4 mb-8">
            {article.comments.map((comment) => (
              <div key={comment._id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-sm font-semibold text-gray-800">{comment.user.firstName}</p>
                <p className="text-xs text-gray-500 mb-2">{comment.user.email}</p>
                <p className="text-gray-700">{comment.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 py-4">No comments yet. Be the first to comment!</p>
        )}
      </div>

      {/* Add Comment Form - Only for Users */}
      {currentUser?.role === "USER" && (
        <div className="mt-8 border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Add a Comment</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const textarea = e.target.querySelector("textarea");
              addComment(textarea.value);
              textarea.value = "";
            }}
          >
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows="4"
              placeholder="Share your thoughts..."
              disabled={loading}
            ></textarea>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
              {loading ? "Posting..." : "Post Comment"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ArticleCard;

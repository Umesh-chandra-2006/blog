import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import {
  formCard,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
} from "../styles/common";
import { API_ENDPOINTS } from "../config/api";
import { toast } from "react-hot-toast";

function AddArticle() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const submitForm = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(API_ENDPOINTS.AUTHOR_ARTICLES, data, {
        withCredentials: true,
      });

      if (response.status === 201) {
        toast.success("Article created successfully!");
        reset();
        navigate("/author-dashboard");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to create article";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Error creating article:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center p-4">Creating article...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-6">Create New Article</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          {error}
        </div>
      )}

      <form className={formCard} onSubmit={handleSubmit(submitForm)}>
        <div className={formGroup}>
          <label className={labelClass}>Title</label>
          <input
            type="text"
            {...register("title", {
              required: "Title is required",
              minLength: { value: 5, message: "Min Length is 5" },
            })}
            placeholder="Enter article title"
            className={inputClass}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div className={formGroup}>
          <label className={labelClass}>Category</label>
          <input
            type="text"
            {...register("category", {
              required: "Category is required",
            })}
            placeholder="e.g., Technology, Travel, Food"
            className={inputClass}
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>

        <div className={formGroup}>
          <label className={labelClass}>Content</label>
          <textarea
            {...register("content", {
              required: "Content is required",
              minLength: { value: 20, message: "Min Length is 20" },
            })}
            placeholder="Write your article content here..."
            className={`${inputClass} resize-none`}
            rows="10"
          />
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content.message}</p>
          )}
        </div>

        <div className="flex gap-3">
          <button type="submit" className={submitBtn} disabled={loading}>
            Publish Article
          </button>
          <button
            type="button"
            onClick={() => navigate("/author-dashboard")}
            className="w-full bg-gray-600 text-white font-semibold py-2.5 rounded-full hover:bg-gray-700 transition-colors cursor-pointer text-sm tracking-tight"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddArticle;

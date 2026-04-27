// API Base URL Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// API Endpoints
export const API_ENDPOINTS = {
  // Common/Auth
  LOGIN: `${API_BASE_URL}/common-api/login`,
  REGISTER: `${API_BASE_URL}/common-api/register`,
  LOGOUT: `${API_BASE_URL}/common-api/logout`,
  CHECK_AUTH: `${API_BASE_URL}/common-api/check-auth`,
  FORGOT_PASSWORD: `${API_BASE_URL}/common-api/forgot-password`,
  UPDATE_PASSWORD: `${API_BASE_URL}/common-api/update-password`,

  // User APIs
  USER_ARTICLES: `${API_BASE_URL}/user-api/articles`,
  ADD_COMMENT: (articleId) => `${API_BASE_URL}/user-api/comment/articleid/${articleId}`,

  // Author APIs
  AUTHOR_ARTICLES: `${API_BASE_URL}/author-api/articles`,
  AUTHOR_MY_ARTICLES: `${API_BASE_URL}/author-api/articles/myarticles`,
  EDIT_ARTICLE: (articleId) => `${API_BASE_URL}/author-api/articles/${articleId}`,
  DELETE_ARTICLE: (articleId) => `${API_BASE_URL}/author-api/articles/${articleId}`,

  // Admin APIs
  ADMIN_ARTICLES: `${API_BASE_URL}/admin-api/articles`,
  ADMIN_USERS: (userId) => `${API_BASE_URL}/admin-api/users/${userId}`,
  ADMIN_ARTICLE: (articleId) => `${API_BASE_URL}/admin-api/articles/${articleId}`,
};

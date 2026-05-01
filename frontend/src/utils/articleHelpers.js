// Utility function to calculate reading time
export const calculateReadingTime = (content) => {
  if (!content) return 0;
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return readingTime;
};

// Format date
export const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return d.toLocaleDateString("en-US", options);
};

// Truncate text to specified length
export const truncateText = (text, length = 100) => {
  if (!text) return "";
  return text.length > length ? text.substring(0, length) + "..." : text;
};

// Get excerpt from content (first 150 chars)
export const getExcerpt = (content, length = 120) => {
  return truncateText(content, length);
};

// Generate color for category badge
export const getCategoryColor = (category) => {
  const colors = {
    technology: "bg-blue-100 text-blue-800",
    travel: "bg-green-100 text-green-800",
    food: "bg-orange-100 text-orange-800",
    health: "bg-red-100 text-red-800",
    lifestyle: "bg-purple-100 text-purple-800",
    business: "bg-indigo-100 text-indigo-800",
    education: "bg-cyan-100 text-cyan-800",
    entertainment: "bg-pink-100 text-pink-800",
  };
  return colors[category?.toLowerCase()] || "bg-gray-100 text-gray-800";
};

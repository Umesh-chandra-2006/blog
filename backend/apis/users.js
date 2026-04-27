import express from "express";
import { ArticleModel } from "../models/article.js";
import { verifyToken } from "../middleware/verifyToken.js";

export const userApp = express.Router();

//read all articles
userApp.get("/articles", verifyToken("USER"), async (req, res) => {
  let articles = await ArticleModel.find({ isArticleActive: true }).populate(
    "author comments.user",
    "firstName email",
  );
  res.status(200).json({ message: "All Articles", articles: articles });
});

//add comment to an article
userApp.put(
  "/comment/articleid/:articleId",
  verifyToken("USER"),
  async (req, res) => {
    let { articleId } = req.params;
    let { user, comment } = req.body;

    if (user !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Forbidden. Unauthorized Access." });
    }

    let article = await ArticleModel.findByIdAndUpdate(
      articleId,
      {
        $push: { comments: { user: req.user.id, comment: comment } },
      },
      { new: true, runValidators: true },
    ).populate("comments.user", "firstName email");
    
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res
      .status(200)
      .json({ message: "Comment added successfully", article: article });
  },
);

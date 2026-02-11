import express from "express";
import { ArticleModel } from "../models/article.js";
import { checkRole, verifyToken } from "../middleware/verifyToken.js";
import { register } from "../services/auth-service.js";

export const userApp = express.Router();

//read all articles
userApp.get("/articles", verifyToken, async (req, res) => {
  let articles = await ArticleModel.find().populate(
    "author",
    "firstName email",
  );
  articles = articles.filter(article => article.isArticleActive);
  res.status(200).json({ articles: articles });
});

//add comment to an article
userApp.put(
  "/comment/articleid/:articleId",
  verifyToken,
  checkRole("USER"),
  async (req, res) => {
    let { articleId } = req.params;
    let { comment } = req.body;
    let article = await ArticleModel.findByIdAndUpdate(
      articleId,
      {
        $push: { comments: { user: req.user.id, comment: comment } },
      },
      { new: true },
    ).populate("comments.user");
    res
      .status(200)
      .json({ message: "Comment added successfully", article: article });
  },
);

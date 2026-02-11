import express from "express";
import { UserModel } from "../models/user.js";
import { ArticleModel } from "../models/article.js";
import { verifyToken, checkRole } from "../middleware/verifyToken.js";
export const adminApp = express.Router();

//read all articles
adminApp.get("/articles", verifyToken, async (req, res) => {
  let articles = await ArticleModel.find().populate(
    "author",
    "firstName email isActive",
  );
  res.status(200).json({ articles: articles });
});

//block/unblock user roles
adminApp.put(
  "/users/:userId",
  verifyToken,
  checkRole("ADMIN"),
  async (req, res) => {
    let { userId } = req.params;
    let { isActive } = req.body;
    //display oinly name and email of user in response
    let user = await UserModel.findByIdAndUpdate(
      userId,
      { isActive: isActive },
      { new: true, select: "firstName lastName email role isActive" },
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User status updated successfully", user: user });
  },
);

//block/unblock
adminApp.put(
  "/articles/:articleId",
  verifyToken,
  checkRole("ADMIN"),
  async (req, res) => {
    let { articleId } = req.params;
    let { isArticleActive } = req.body;
    let article = await ArticleModel.findByIdAndUpdate(
      articleId,
      { isArticleActive: isArticleActive },
      { new: true, select: "title isArticleActive author" },
    );
    if (!article) res.status(400).json({ message: "Article not found" });
    res.status(200).json({
      message: "Article status updated successfully",
      article: article,
    });
  },
);

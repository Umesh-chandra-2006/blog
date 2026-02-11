import express from "express";
import { ArticleModel } from "../models/article.js";
import { verifyToken, checkRole } from "../middleware/verifyToken.js";
import { register } from "../services/auth-service.js";

export const authorApp = express.Router();

//create article
authorApp.post(
  "/articles",
  verifyToken,
  checkRole("AUTHOR"),
  async (req, res) => {
    let newArticle = req.body;
    newArticle.author = req.user.id;
    newArticle = new ArticleModel(newArticle);
    await newArticle.save();
    res
      .status(201)
      .json({ message: "Article Created Successfully", Payload: newArticle });
  },
);

//read articles of author
authorApp.get(
  "/articles/myarticles",
  verifyToken,
  checkRole("AUTHOR"),
  async (req, res) => {
    let articles = await ArticleModel.find({ author: req.user.id }).populate(
      "author",
      "firstName email",
    );
    res.status(200).json({ articles: articles });
  },
);

//edit article
authorApp.put(
  "/articles/:articleId",
  verifyToken,
  checkRole("AUTHOR"),
  async (req, res) => {
    let { articleId } = req.params;
    let newArticle = req.body;
    if (newArticle.author || newArticle.comments) {
      return res
        .status(400)
        .json({ message: "Cannot update author or comments" });
    }
    newArticle = await ArticleModel.findOneAndUpdate(
      { author: req.user.id, _id: articleId },
      { $set: newArticle },
      { new: true },
    );
    if (!newArticle) {
      return res.status(404).json({ message: "Article Not Found" });
    }
    res
      .status(200)
      .json({ message: "Article Updated Successfully", Payload: newArticle });
  },
);

//delete article(soft delete)
authorApp.delete(
  "/articles/:articleId",
  verifyToken,
  checkRole("AUTHOR"),
  async (req, res) => {
    let { articleId } = req.params;
    let article = await ArticleModel.findOneAndUpdate(
      { author: req.user.id, _id: articleId },
      { $set: { isArticleActive: false } },
      { new: true },
    );
    if (!article) {
      return res.status(404).json({ message: "Article Not Found" });
    }
    res
      .status(200)
      .json({ message: "Article Deleted Successfully", Payload: article });
  },
);

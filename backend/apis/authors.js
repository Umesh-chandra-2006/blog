import express from "express";
import { ArticleModel } from "../models/article.js";
import { verifyToken } from "../middleware/verifyToken.js";

export const authorApp = express.Router();

//create article
authorApp.post("/articles", verifyToken("AUTHOR"), async (req, res) => {
  let newArticle = req.body;
  newArticle.author = req.user.id;
  newArticle = new ArticleModel(newArticle);
  await newArticle.save();
  res
    .status(201)
    .json({ message: "Article Created Successfully", Payload: newArticle });
});

//read articles of author
authorApp.get(
  "/articles/myarticles",
  verifyToken("AUTHOR"),
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
  verifyToken("AUTHOR"),
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
authorApp.patch(
  "/articles/:articleId",
  verifyToken("AUTHOR"),
  async (req, res) => {
    let { articleId } = req.params;
    let { isArticleActive } = req.body;

    let article = await ArticleModel.findById(articleId).select(
      "isArticleActive author",
    );

    if (!article) {
      return res.status(404).json({ message: "Article Not Found" });
    }

    //only author can delete their own article
    if (req.user.id !== article.author.toString()) {
      return res
        .status(403)
        .json({ message: "Forbidden. Unauthorized Access." });
    }

    if (article.isArticleActive === isArticleActive) {
      return res.status(400).json({
        message: `Article is already ${isArticleActive ? "active" : "inactive"}`,
      });
    }
    article.isArticleActive = isArticleActive;
    await article.save();

    
    if (!article) {
      return res.status(404).json({ message: "Article Not Found" });
    }
    res
      .status(200)
      .json({ message: "Article Updated Successfully", Payload: article });
  },
);

import express from "express";
import { UserModel } from "../models/user.js";
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";

export const userApp = express.Router();

//create user
userApp.post("/users", async (req, res) => {
  let newUser = req.body;
  let role = newUser.role.toUpperCase();
  newUser.role = role;
  await new UserModel(newUser).validate();
  let hashedPassword = await hash(newUser.password, 10);
  newUser.password = hashedPassword;
  newUser = new UserModel(newUser);
  await newUser.save({ validateBeforeSave: false });
  res.status(201).json({ message: "User Created Successfully" });
});

//authenticate user
userApp.post("/users/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await UserModel.findOne({ email: email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  let isMatch = await compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  let token = jwt.sign(
    { firstName: user.firstName },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" },
  );
  res.cookie("auth-token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });
  res.status(200).json({ message: "Login successful", token: token });
});

//read all articles
userApp.get("/articles", async (req, res) => {
  let articles = await ArticleModel.find();
  res.status(200).json({ articles: articles });
});

//add comment to an article
userApp.post("/comment/userid/:id/articleid/:id", async (req, res) => {
  let { userId, articleId } = req.params;
  let comment = req.body;
  let article = await ArticleModel.findByIdAndUpdate(articleId, {
    $push: { comments: { user: userId, comment: comment } },
  },{new:true}).populate("article.user");
  res.status(200).json({ message: "Comment added successfully", article: article });
});

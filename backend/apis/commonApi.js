import express from "express";
import { login, register, updatePassword } from "../services/auth-service.js";
import { UserModel } from "../models/user.js";
import { verifyToken } from "../middleware/verifyToken.js";

export const commonApp = express.Router();

//login user
commonApp.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let { token, user } = await login({ email, password });
  if (!token) return res.status(401).json({ message: "Invalid credentials" });
  const isProduction = process.env.NODE_ENV === "production";
  res.cookie("auth-token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });
  res.status(200).json({ message: "Login Successful", payload: user });
});

//register user
commonApp.post("/register", async (req, res) => {
  let newUser = req.body;
  newUser.role = newUser.role.toUpperCase();
  if (newUser.role !== "USER" && newUser.role !== "AUTHOR") {
    return res.status(400).json({
      message: "Invalid role specified. Role must be either USER or AUTHOR",
    });
  }
  const newUserObj = await register(newUser);
  if (!newUserObj) {
    return res.status(400).json({ message: "Registration failed." });
  }
  res.status(201).json({ message: "User Registration Successful" });
});

//logout user
commonApp.get("/logout", (req, res) => {
  const isProduction = process.env.NODE_ENV === "production";
  res.clearCookie("auth-token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });
  res.status(200).json({ message: "Logout Successful" });
});

//forgot password
commonApp.put("/forgot-password", async (req, res) => {
  let { email, oldPassword, newPassword } = req.body;
  let result = await updatePassword({ email, oldPassword, newPassword });
  res.status(200).json(result);
});

//updating password
commonApp.put("/update-password", async (req, res) => {
  let { oldPassword, newPassword } = req.body;
  let userId = req.user.id;
  let { email } = await UserModel.findById(userId).select("email");
  let result = await updatePassword({ email, oldPassword, newPassword });
  res.status(200).json(result);
});

commonApp.get("/check-auth", verifyToken("USER","AUTHOR","ADMIN"), async(req, res) => {
  let user = await UserModel.findById(req.user.id).select("-password");
  res.status(200).json({ message: " Authenticated", payload: user });
});

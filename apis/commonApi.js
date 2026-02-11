import express from "express";
import { login, register, updatePassword } from "../services/auth-service.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { UserModel } from "../models/user.js";

export const commonApp = express.Router();

//login user
commonApp.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let { token, user } = await login({ email, password });
  if (!token) return res.status(401).json({ message: "Invalid credentials" });
  res.cookie("auth-token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
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
  res.clearCookie("auth-token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
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
commonApp.put("/update-password", verifyToken, async (req, res) => {
  let { oldPassword, newPassword } = req.body;
  let userId = req.user.id;
  let { email } = await UserModel.findById(userId).select("email");
  let result = await updatePassword({ email, oldPassword, newPassword });
  res.status(200).json(result);
});

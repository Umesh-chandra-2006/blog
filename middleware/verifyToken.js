import { UserModel } from "../models/user.js";
import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  let token = req.cookies["auth-token"];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
  let decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = decodedToken;
  next();
}

export function checkRole(requiredRole) {
  return async (req, res, next) => {
    if (req.user.role !== requiredRole) {
      return res
        .status(403)
        .json({ message: "Access denied. Insufficient permissions." });
    }
    let user = await UserModel.findById(req.user.id);
    if (!user.isActive) {
      return res
        .status(403)
        .json({ message: "Access denied. User is blocked." });
    }
    next();
  };
}

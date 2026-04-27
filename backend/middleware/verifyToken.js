import jwt from "jsonwebtoken";

export function verifyToken(...allowedRoles) {
  return (req, res, next) => {
    try {
      let token = req.cookies["auth-token"];
      if (!token) {
        return res
          .status(401)
          .json({ message: "Access denied. No token provided." });
      }
      let decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

      if (!allowedRoles.includes(decodedToken.role)) {
        return res
          .status(403)
          .json({ message: "Forbidden. Insufficient permissions." });
      }
      req.user = decodedToken;
      next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Token expired. Please login again." });
      }
      if (err.name === "JsonWebTokenError") {
        return res
          .status(401)
          .json({ message: "Invalid token. Please login again." });
      }
      // Handle unexpected errors
      return res
        .status(500)
        .json({ message: "Token verification failed." });
    }
  };
}
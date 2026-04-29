import express from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import { userApp } from "./apis/users.js";
import { authorApp } from "./apis/authors.js";
import { adminApp } from "./apis/admins.js";
import { commonApp } from "./apis/commonApi.js";
import cookieParser from "cookie-parser";
import cors from "cors";

//load environment variables from .env file
config();

//validate environment variables
const requiredEnvVars = ["MONGODB_URL", "PORT", "JWT_SECRET_KEY"];
const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);
if (missingEnvVars.length > 0) {
  console.error(
    `Missing required environment variables: ${missingEnvVars.join(", ")}`,
  );
  process.exit(1);
}

//create express app
const app = express();

//use cors middleware
const allowedOrigins = process.env.ORIGIN 
  ? process.env.ORIGIN.split(',').map(url => url.trim())
  : ["http://localhost:5173"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    //allow requests from these origins
  }),
);

//add body parser middleware to parse JSON data from incoming requests
app.use(express.json());
//add cookie parser middleware to parse cookies from incoming requests
app.use(cookieParser());

//add routes
app.use("/user-api", userApp);
app.use("/author-api", authorApp);
app.use("/admin-api", adminApp);
app.use("/common-api", commonApp);

//connect to MongoDB and start the server
const connectToDB = async () => {
  try {
    await connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

connectToDB();

//handle invalid paths
app.use((req, res, next) => {
  res.json({ message: `${req.url} is Invalid path` }); //template literal `${req.url}`
});

//global error handler
app.use((err, req, res, next) => {
  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.errors,
    });
  }
  // Invalid ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }
  // Duplicate key
  if (err.code === 11000) {
    return res.status(409).json({
      message: "Duplicate field value",
    });
  }
  res.status(500).json({
    message: "Internal Server Error",
  });
});

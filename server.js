import express from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import { userApp } from "./apis/users.js";
import { authorApp } from "./apis/authors.js";
import { adminApp } from "./apis/admins.js";
import { commonApp } from "./apis/commonApi.js";
import cookieParser from "cookie-parser";

//load environment variables from .env file
config();

//create express app
const app = express();

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
app.use((req,res,next) =>{
  res.json({message: `${req.url} is Invalid path`}); //template literal `${req.url}` 
})

//global error handler
app.use((err, req, res, next) => { 
  res.status(500).json({ message: "error", error: err.message });
});

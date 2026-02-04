import express from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import { userApp } from "./routes/users.js";
//import { authorApp } from "./routes/authors.js";
//import { adminApp } from "./routes/admims.js";
config();

const app = express();
//add body parser middleware
app.use(express.json()); //This middleware parses incoming JSON requests and puts the parsed data in req.body

app.use("/user-api", userApp);
//app.use("/author-api", authorApp);
//app.use("/admin-api", adminApp);

//funciton declaration vs function expression

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

app.use((err, req, res, next) => {
  res.status(500).json({ message: "Error", error: err.message });
});

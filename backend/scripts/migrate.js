import mongoose from "mongoose";
import { UserModel } from "../models/user.js";
import { ArticleModel } from "../models/article.js";
import dotenv from "dotenv";

dotenv.config();

const localURI = process.env.MONGODB_URL || "mongodb://localhost:27017/blog-app";
const atlasURI = process.argv[2];

if (!atlasURI) {
  console.error("Error: Please provide your MongoDB Atlas Connection URI as an argument.");
  console.error("Usage: node scripts/migrate.js \"mongodb+srv://<username>:<password>@cluster.mongodb.net/blog-app\"");
  process.exit(1);
}

const runMigration = async () => {
  let localConnection;
  let atlasConnection;

  try {
    console.log("Connecting to local MongoDB database...");
    localConnection = await mongoose.createConnection(localURI).asPromise();
    console.log("Connected to local database successfully.");

    console.log("Connecting to MongoDB Atlas database...");
    atlasConnection = await mongoose.createConnection(atlasURI).asPromise();
    console.log("Connected to Atlas database successfully.");

    // Retrieve models bound to connections
    const LocalUser = localConnection.model("user", UserModel.schema);
    const LocalArticle = localConnection.model("article", ArticleModel.schema);

    const AtlasUser = atlasConnection.model("user", UserModel.schema);
    const AtlasArticle = atlasConnection.model("article", ArticleModel.schema);

    // Fetch local data
    console.log("Fetching data from local database...");
    const users = await LocalUser.find({});
    const articles = await LocalArticle.find({});

    console.log(`Found ${users.length} users and ${articles.length} articles locally.`);

    if (users.length === 0 && articles.length === 0) {
      console.log("No local data found to migrate.");
      return;
    }

    // Migrate Users
    if (users.length > 0) {
      console.log("Migrating users to MongoDB Atlas...");
      // Delete existing users in Atlas to avoid duplicates on unique fields (email)
      await AtlasUser.deleteMany({});
      await AtlasUser.insertMany(users);
      console.log("Users migrated successfully.");
    }

    // Migrate Articles
    if (articles.length > 0) {
      console.log("Migrating articles to MongoDB Atlas...");
      await AtlasArticle.deleteMany({});
      await AtlasArticle.insertMany(articles);
      console.log("Articles migrated successfully.");
    }

    console.log("Database migration completed successfully!");

  } catch (error) {
    console.error("Migration failed with error:", error);
  } finally {
    if (localConnection) await localConnection.close();
    if (atlasConnection) await atlasConnection.close();
    console.log("Connections closed.");
  }
};

runMigration();

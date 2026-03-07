import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DOTENV = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${DOTENV.DB_USER}:${DOTENV.DB_PASSWORD}@irshadcluster.w5dqwxs.mongodb.net/${DOTENV.DB_NAME}?retryWrites=true&w=majority&appName=IrshadCluster`);

    console.log("MongoDB Connected Successfully");

  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

export default connectDB;
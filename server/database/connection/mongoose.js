import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

let cached = global.mongoose || { conn: null, promise: null };

const connectDB = async () => {
  if (cached.conn) {
    console.log("Using the existing database connection");
    return cached.conn;
  }

  if (!MONGO_URI) {
    throw new Error("MONGO_URI is missing in the environment variables");
  }

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGO_URI, {
      bufferCommands: false,
    });

  cached.conn = await cached.promise;
  console.log("New database connection established");
  return cached.conn;
};

export default connectDB;

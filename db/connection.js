import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// console.log(process.env.MONGO_URI)
const dbConnection = async () => {
  try {

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    // process.exit(1); // Exit the process on connection failure
  }
};

export default dbConnection;

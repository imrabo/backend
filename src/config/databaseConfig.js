import mongoose from "mongoose";

const connectionDatabase = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("Database is connected");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

export default connectionDatabase;

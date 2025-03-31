import mongoose from "mongoose";

async function connectDB() {
 
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Mongodb Connected`)
    return mongoose.connection.readyState; // 1 = connected
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // Exit process on failure
  }
}

export default connectDB;

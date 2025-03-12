import mongoose, { Schema } from "mongoose";

// Define the schema with validation
const UserSchema = new Schema({
  name: { 
    type: String, 
    required: [true, "Name is required"], 
    trim: true, 
    minlength: [3, "Name must be at least 3 characters long"],
    maxlength: [50, "Name must be at most 50 characters long"]
  },
  email: { 
    type: String, 
    unique: true, 
    required: [true, "Email is required"], 
    trim: true, 
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
  },
  secret: { 
    type: String, 
    minlength: [6, "Secret must be at least 6 characters long"],
    required: [true, "Secret is required"]
  }
});

// Create the model
const UserModel = mongoose.model("User", UserSchema);

export default UserModel;

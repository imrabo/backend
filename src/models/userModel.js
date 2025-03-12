import mongoose, { Schema } from "mongoose";

// Define the schema
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  secret: { type: String },
});

// Create the model
const UserModel = mongoose.model("User", UserSchema);

export default UserModel;

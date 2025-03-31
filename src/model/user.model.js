import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    secret: String,
    phoneNumber: String,
    
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    automations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Automation" }],
    integrations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Integration" }],
    devices: [{ type: mongoose.Schema.Types.ObjectId, ref: "Device" }],
    isActive: {
      type: Boolean,
      default: false,
    },
    isVerified:{
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;

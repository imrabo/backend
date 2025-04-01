import mongoose from 'mongoose';


const DeviceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  deviceName: { type: String, required: true, unique: true },
  deviceType: { type: String, required: true },
  lastUsed: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: false },
  lastConnected: { type: Date, default: null },
  isTrusted: { type: Boolean, default: false },
  reading: [{
    type: { type: String, required: true }, // Type of reading (e.g., temperature, humidity, etc.)
    timestamp: { type: Date, default: Date.now },
    value: { type: mongoose.Schema.Types.Mixed, required: true },
    unit: { type: String, required: true }
  }] // Store only a single reading instead of an array
});

const DeviceModel = mongoose.model('Devices', DeviceSchema);

export default DeviceModel;

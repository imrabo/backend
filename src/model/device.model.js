import mongoose from 'mongoose';

const DeviceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  deviceName: { type: String, required: true, unique:true },
  deviceType: { type: String, required: true },
  lastUsed: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: false },
  lastConnected: { type: Date, default: null },
  isTrusted: { type: Boolean, default: false },
});


const DeviceModel = mongoose.model('Devices', DeviceSchema);

export default DeviceModel;

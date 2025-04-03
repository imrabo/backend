import mongoose from 'mongoose';


const DeviceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  deviceName: { type: String, required: true, unique: true },
  deviceType: { type: String, required: true },
  lastUsed: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: false },
  lastConnected: { type: Date, default: null },
  isTrusted: { type: Boolean, default: false },
  apiURL: { type: String, required: true },
  webSocketURL: { type: String, required: true },
  mqttURL: { type: String, required: true },
  reading: [{
    timestamp: { type: Date, default: Date.now },
    data: { type: mongoose.Schema.Types.Mixed, required: true },
  }] 
}, {timestamps:true});

DeviceSchema.pre("save", function (next) {
  const baseDomain = "example.com";
  this.apiURL = `https://imrabo.onrender.com/iot?deviceId=${this.device_id}`;
  this.webSocketURL = `wss://imrabo.onrender.com/iot?deviceId=${this.device_id}`;
  this.mqttURL = `mqtt://imrabo.onrender.com/mqtt/pub?topic=${this.device_id}`;
  next();
});

const DeviceModel = mongoose.model('Devices', DeviceSchema);

export default DeviceModel;

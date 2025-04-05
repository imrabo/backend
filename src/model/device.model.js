import mongoose from "mongoose";

const ReadingSchema = new mongoose.Schema(
  {
    timestamp: {
      type: Date,
      default: Date.now,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  { _id: false } // Optional: prevents _id for each reading subdocument
);

const DeviceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deviceName: {
      type: String,
      required: true,
      unique: true,
    },
    deviceType: {
      type: String,
      required: true,
    },
    lastUsed: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    lastConnected: {
      type: Date,
      default: null,
    },
    isTrusted: {
      type: Boolean,
      default: false,
    },
    apiURL: {
      type: String,
    },
    webSocketURL: {
      type: String,
    },
    mqttURL: {
      type: String,
    },
    reading: [ReadingSchema],
  },
  { timestamps: true }
);

// Middleware to auto-generate URLs before saving
DeviceSchema.pre("save", function (next) {
  if (!this.isNew) return next(); // Only generate URLs for new devices

  const baseURL = "imrabo.onrender.com";
  const deviceId = this._id.toString();

  this.apiURL = `https://${baseURL}/iot?deviceId=${deviceId}`;
  this.webSocketURL = `wss://${baseURL}/iot?deviceId=${deviceId}`;
  this.mqttURL = `mqtt://${baseURL}/mqtt/pub?topic=${deviceId}`;

  next();
});

const DeviceModel = mongoose.model("Devices", DeviceSchema);

export default DeviceModel;

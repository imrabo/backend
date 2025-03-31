import mongoose from "mongoose";

const ConditionSchema = new mongoose.Schema({
  parameter: { type: String, required: true }, // e.g., "temperature", "humidity"
  operator: { type: String, enum: [">", "<", ">=", "<=", "==", "!="], required: true }, // e.g., ">", "<="
  value: { type: Number, required: true }, // e.g., 40 for temperature > 40
});

const ActionSchema = new mongoose.Schema({
  actionType: { type: String, required: true }, // e.g., "send_alert", "toggle_device", "publish_mqtt"
  targetDeviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Device", required: false }, // Optional, for device actions
  payload: { type: mongoose.Schema.Types.Mixed, required: false }, // Custom data for the action
});

const AutomationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Owner of the automation
  automationName: { type: String, required: true },
  conditions: [ConditionSchema], // List of conditions (e.g., temperature > 40 AND humidity < 30)
  actions: [ActionSchema], // List of actions when conditions are met
  isEnabled: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

AutomationSchema.index({ userId: 1, automationName: 1 }, { unique: true });

const AutomationModel = mongoose.model("Automation", AutomationSchema);

export default AutomationModel;

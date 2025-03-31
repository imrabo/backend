import mongoose from 'mongoose';

const IntegrationSchema = new mongoose.Schema({
  integrationName: { type: String, required: true },
  userId:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { 
    type: String, 
    required: true, 
    enum: ['API', 'Webhook', 'MQTT', 'iPaaS', 'Other'], 
  },
  apiKey: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  connectedAt: { type: Date, default: Date.now },
  updateAt:{ type: Date, default: Date.now } 
});

const IntegrationModel = mongoose.model('Integration', IntegrationSchema);

export default IntegrationModel;


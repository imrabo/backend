import IntegrationModel from "../model/integration.model.js";
import UserModel from "../model/user.model.js";
import { validationResult } from "express-validator";

export async function postIntegrationController(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { integrationName, apiKey, type } = req.body;
  const userId = req.userId; // Extracted from JWT middleware

  try {
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const existingIntegration = await IntegrationModel.findOne({ userId, integrationName });
    if (existingIntegration) return res.status(400).json({ msg: "Integration already exists" });

    const newIntegration = await IntegrationModel.create({ userId, integrationName, apiKey , type });

    // Push integration reference to user model
    user.integrations.push(newIntegration._id);
    await user.save();

    res.status(201).json({ msg: "Integration added successfully", integration: newIntegration });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
}


// 📌 Read (GET) All Integrations
export async function getIntegrationsController(req, res) {
  const userId = req.userId;

  try {
    const integrations = await IntegrationModel.find({ userId });
    res.json({ integrations });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
}


// 📌 Read (GET) Single Integration by ID
export async function getIntegrationByIdController(req, res) {
  const userId = req.userId;
  const { Id } = req.params;

  try {
    const integration = await IntegrationModel.findOne({ _id: Id, userId });
    if (!integration) return res.status(404).json({ msg: "Integration not found" });

    res.json({ integration });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
}


// 📌 Update (PUT) Integration
export async function putIntegrationController(req, res) {
  const userId = req.userId;
  const { integrationId } = req.params;
  const { integrationName, apiKey, isActive } = req.body;

  try {
    const integration = await IntegrationModel.findOne({ _id: integrationId, userId });
    if (!integration) return res.status(404).json({ msg: "Integration not found" });

    // Prevent duplicate integration names
    const duplicate = await IntegrationModel.findOne({ userId, integrationName, _id: { $ne: integrationId } });
    if (duplicate) return res.status(400).json({ msg: "Integration with this name already exists" });

    if (integrationName) integration.integrationName = integrationName;
    if (apiKey) integration.apiKey = apiKey;
    if (typeof isActive === "boolean") integration.isActive = isActive;

    await integration.save();
    res.json({ msg: "Integration updated successfully", integration });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
}


// 📌 Delete (DELETE) Integration
export async function deleteIntegrationController(req, res) {
  const userId = req.userId;
  const { integrationId } = req.params;

  try {
    const integration = await IntegrationModel.findOneAndDelete({ _id: integrationId, userId });
    if (!integration) return res.status(404).json({ msg: "Integration not found" });

    // Remove integration reference from user model
    await UserModel.findByIdAndUpdate(userId, { $pull: { integrations: integrationId } });

    res.json({ msg: "Integration deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
}


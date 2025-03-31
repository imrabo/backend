import express from "express";
import {
  postAutomationController,
  getAutomationsController,
  getAutomationByIdController,
  putAutomationController,
  deleteAutomationController,
} from "../controller/automation.controller.js";
import {
  validateCreateAutomation,
  validateUpdateAutomation,
  validateAutomationId,
} from "../validator/automation.validator.js";


const automationRouter = express.Router();


// 📌 Create Automation
automationRouter.post("/", validateCreateAutomation, postAutomationController);

// 📌 Get All Automations
automationRouter.get("/", getAutomationsController);

// 📌 Get Automation by ID
automationRouter.get("/:automationId", validateAutomationId, getAutomationByIdController);

// 📌 Update Automation
automationRouter.put("/:automationId", validateUpdateAutomation, putAutomationController);

// 📌 Delete Automation
automationRouter.delete("/:automationId", validateAutomationId, deleteAutomationController);

export default automationRouter;

import { body, param } from "express-validator";

// 📌 Validate Create Automation Request
export const validateCreateAutomation = [
  body("automationName").notEmpty().withMessage("Automation name is required"),
  body("triggerEvent").notEmpty().withMessage("Trigger event is required"),
  body("actions")
    .isArray({ min: 1 })
    .withMessage("At least one action is required"),
];

// 📌 Validate Update Automation Request
export const validateUpdateAutomation = [
  param("automationId").isMongoId().withMessage("Invalid automation ID"),
  body("automationName").optional().notEmpty().withMessage("Invalid name"),
  body("triggerEvent").optional().notEmpty().withMessage("Invalid trigger event"),
  body("actions")
    .optional()
    .isArray()
    .withMessage("Actions should be an array"),
  body("isEnabled")
    .optional()
    .isBoolean()
    .withMessage("isEnabled must be a boolean value"),
];

// 📌 Validate Automation ID for GET & DELETE Requests
export const validateAutomationId = [
  param("automationId").isMongoId().withMessage("Invalid automation ID"),
];

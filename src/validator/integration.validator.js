import { body, param } from "express-validator";

// 📌 Validate Create Integration Request
export const validateCreateIntegration = [
  body("integrationName").trim().notEmpty().withMessage("Integration name is required"),
  body("apiKey").trim().notEmpty().withMessage("API Key is required"),
  body("type").trim().notEmpty().withMessage("API Key is required"),
];

// 📌 Validate Update Integration Request
export const validateUpdateIntegration = [
  param("integrationId").isMongoId().withMessage("Invalid integration ID"),
  body("integrationName").optional().trim().notEmpty().withMessage("Invalid name"),
  body("apiKey").optional().trim().notEmpty().withMessage("Invalid API Key"),
  body("type").optional().isBoolean().withMessage("isActive must be a boolean value"),
];

// 📌 Validate Integration ID for GET & DELETE Requests
export const validateIntegrationId = [
  param("Id").isMongoId().withMessage("Invalid integration ID"),
];

import express from "express";
import {
  postIntegrationController,
  getIntegrationsController,
  getIntegrationByIdController,
  putIntegrationController,
  deleteIntegrationController,
} from "../controller/integration.controller.js";
import {
  validateCreateIntegration,
  validateUpdateIntegration,
  validateIntegrationId,
} from "../validator/integration.validator.js";

const integrationRouter = express.Router();


// 📌 Create Integration
integrationRouter.post("/", validateCreateIntegration, postIntegrationController );

// 📌 Get All Integrations
integrationRouter.get("/get", getIntegrationsController);

// 📌 Get Integration by ID
integrationRouter.get("/get/:Id",validateIntegrationId,getIntegrationByIdController
);

// 📌 Update Integration
integrationRouter.put(
  "/:integrationId",

  validateUpdateIntegration,
  putIntegrationController
);

// 📌 Delete Integration
integrationRouter.delete(
  "/:integrationId",
  validateIntegrationId,
  deleteIntegrationController
);

export default integrationRouter;

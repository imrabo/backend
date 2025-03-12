import { Router } from "express";
import emailLogInController from "../controllers/auth/emailLogInController.js";
import emailSignUpController from "../controllers/auth/emailSignUpController.js";
import emailVerificationController from "../controllers/auth/emailVerificationController.js";
import { validateEmailLogin, validateEmailSignUp, validateEmailVerification } from "../middlewares/authValidatore.js";

const IntegrationRoute = Router();

IntegrationRoute.post("/log-in",validateEmailLogin, emailLogInController);
IntegrationRoute.post("/sign-up", validateEmailSignUp,emailSignUpController);
IntegrationRoute.post("/verify", validateEmailVerification,emailVerificationController);

export default IntegrationRoute;


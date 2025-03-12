import { Router } from "express";
import emailLogInController from "../controllers/auth/emailLogInController.js";
import emailSignUpController from "../controllers/auth/emailSignUpController.js";
import emailVerificationController from "../controllers/auth/emailVerificationController.js";
import { validateEmailLogin, validateEmailSignUp, validateEmailVerification } from "../middlewares/authValidatore.js";

const AutomationRoute = Router();

AutomationRoute.post("/log-in",validateEmailLogin, emailLogInController);
AutomationRoute.post("/sign-up", validateEmailSignUp,emailSignUpController);
AutomationRoute.post("/verify", validateEmailVerification,emailVerificationController);

export default AutomationRoute;


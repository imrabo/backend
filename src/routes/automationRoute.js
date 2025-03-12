import { Router } from "express";
import emailLogInController from "../controllers/auth/emailLogInController.js";
import emailSignUpController from "../controllers/auth/emailSignUpController.js";
import emailVerificationController from "../controllers/auth/emailVerificationController.js";


const AutomationRoute = Router();

AutomationRoute.post("/log-in", emailLogInController);


export default AutomationRoute;


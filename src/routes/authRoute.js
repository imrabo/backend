import { Router } from "express";
import emailLogInController from "../controllers/auth/emailLogInController.js";
import emailSignUpController from "../controllers/auth/emailSignUpController.js";
import emailVerificationController from "../controllers/auth/emailVerificationController.js";
import { validateEmailLogin, validateEmailSignUp, validateEmailVerification } from '../validators/index.js';

const AuthRouter = Router();

AuthRouter.post("/log-in",validateEmailLogin, emailLogInController);
AuthRouter.post("/sign-up", validateEmailSignUp,emailSignUpController);
AuthRouter.post("/verify", validateEmailVerification,emailVerificationController);

export default AuthRouter;


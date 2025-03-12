import { Router } from "express";
import emailLogInController from "../controllers/auth/emailLogInController.js";


const AutomationRoute = Router();

AutomationRoute.post("/log-in", emailLogInController);


export default AutomationRoute;


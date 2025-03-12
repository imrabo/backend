import { Router } from "express";
import emailLogInController from "../controllers/auth/emailLogInController.js";


const ProfileRoute = Router();

ProfileRoute.post("/:useremail", emailLogInController);

export default ProfileRoute;


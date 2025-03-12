import { Router } from "express";
import  profileManagementController  from "../controllers/profile/profileManagementController.js";


const ProfileRoute = Router();

ProfileRoute.post("/update", profileManagementController);

export default ProfileRoute;


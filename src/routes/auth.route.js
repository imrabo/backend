import { Router } from 'express';

import {
  logInAuthController,
  signUpAuthController,
  verificationAuthController,
} from '../controller/auth.controller.js';
import {
  logInValidator,
  signUpValidator,
  verificationValidator,
} from '../validator/auth.validator.js';

const authRouter = Router();

authRouter.post('/log-in', logInValidator, logInAuthController);
authRouter.post('/sign-up', signUpValidator, signUpAuthController);
authRouter.post(
  '/verify',
  verificationValidator,
  verificationAuthController
);

export default authRouter;

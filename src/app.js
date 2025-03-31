import express from 'express';
import authRouter from './routes/auth.route.js';
import CORS from 'cors';
import automationRouter from './routes/automation.route.js';
import integrationRouter from './routes/integration.route.js';
import deviceRouter from './routes/device.route.js';
import { requestLogger } from './middleware/logger.middleware.js';
import {
  errorHandler,
  notFoundHandler,
} from './middleware/errorHandler.middleware.js';
import { authenticateUser } from './middleware/authicate.middleware.js';
import { handleValidationErrors } from './middleware/validation.middleware.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(CORS());

app.use(requestLogger);

app.use('/auth', authRouter);
app.use('/automation',authenticateUser,handleValidationErrors,automationRouter);
app.use('/integration',authenticateUser ,integrationRouter);
app.use('/device',  authenticateUser,deviceRouter);

app.use(notFoundHandler);
app.use(errorHandler);
export default app;

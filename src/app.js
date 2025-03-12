import express from "express";
import CORS from "cors";
import pino from "pino-http";

import AuthRouter from "./routes/authRoute.js";
import logger from "./utils/loggerUtil.js";
import errorHandler from "./helpers/errorHandlerHelpers.js";
import ProfileRoute from "./routes/profileRoute.js";
import IntegrationRoute from "./routes/integrationRoute.js";
import AutomationRoute from "./routes/automationRoute.js";
import LogRoute from "./routes/logRoutes.js";
import authMiddlewares from "./middlewares/authMiddlewares.js";

const app = express();


app.use(
  pino({
    logger,
    level: "info",
  }),
);


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(CORS());

// Route Declration
app.use('/api/v1/auth',AuthRouter); 
app.use('/api/v1/profile',authMiddlewares,ProfileRoute); 
app.use('/api/v1/integration',authMiddlewares,IntegrationRoute); 
app.use('/api/v1/automation', authMiddlewares,AutomationRoute); 

// Logs Router for testing
app.use('/api/v1/automation',LogRoute); 


app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({ message: "Something went wrong!" });
});



app.get("/error", (req, res, next) => {
    try {
        throw new Error("This is a sample error");
    } catch (err) {
        next(err); 
    }
})

app.use(errorHandler)



export default app;

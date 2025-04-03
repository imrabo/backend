import { Router } from 'express';
import { mqttSubscrib, mqttPublish } from '../controller/mqtt.controller.js';


const mqttRouter = Router();

mqttRouter.get('/sub', mqttSubscrib);
mqttRouter.get('/pub', mqttPublish);


export default mqttRouter;

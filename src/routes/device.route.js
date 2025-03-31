import { Router } from 'express';
import {
  deleteDeviceController,
  getDeviceByIdController,
  updateDeviceController,
  postDeviceController,
  getDevicesController
} from '../controller/device.controller.js';
import { validateDeviceCreation, validateDeviceId, validateDeviceUpdate } from '../validator/device.validator.js';

const deviceRouter = Router();

deviceRouter.post('/', validateDeviceCreation, postDeviceController); // ✅ Create Device
deviceRouter.get('/', getDevicesController); // ✅ Get Device by ID
deviceRouter.get('/:deviceId', validateDeviceId, getDeviceByIdController); // ✅ Get Device by ID
deviceRouter.put('/:deviceId', validateDeviceUpdate, updateDeviceController); // ✅ Update Device
deviceRouter.delete('/:deviceId', validateDeviceId, deleteDeviceController); // ✅ Delete Device


export default deviceRouter;

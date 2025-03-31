import { body, param } from 'express-validator';

export const validateDeviceCreation = [
  body('deviceName').notEmpty().withMessage('Device ID is required'),
  body('deviceType').notEmpty().withMessage('Device type is required'),
];

export const validateDeviceUpdate = [
  param('deviceId').notEmpty().withMessage('Device ID is required'),
  body('deviceType').optional().notEmpty().withMessage('Invalid device type'),
  body('isActive').optional().isBoolean().withMessage('isActive must be a boolean'),
  body('isTrusted').optional().isBoolean().withMessage('isTrusted must be a boolean'),
];

export const validateDeviceId = [
  param('deviceId').notEmpty().withMessage('Device ID is required'),
];

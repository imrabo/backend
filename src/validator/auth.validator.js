import { body } from 'express-validator';

export const logInValidator = [
  body('email').isEmail().withMessage('Invalid email format'),
];

export const signUpValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email format'),
];

export const verificationValidator = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('otp')
    .isLength({ min: 4, max: 6 })
    .withMessage('OTP must be 4-6 digits'),
];

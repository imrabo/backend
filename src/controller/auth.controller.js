import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import UserModel from '../model/user.model.js';
import { generateOtp } from '../services/otp.services.js';
import { sendOTPEmail } from '../services/mail.services.js';
import dotenv from 'dotenv';

dotenv.config();

// ✅ User Registration (With OTP)
export const signUpAuthController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email } = req.body; // ✅ No password needed

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const otp = generateOtp();
    const hashedOTP = await bcrypt.hash(otp, 10);

    await sendOTPEmail(email, otp); // ✅ Send OTP to user

    // ✅ Store OTP hash instead of password
    await UserModel.create({
      name,
      email,
      secret: hashedOTP,
      isVerified: false,
    });

    res.status(200).json({ msg: 'OTP sent to email' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};


export const verificationAuthController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, otp } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // Check if OTP is correct
    const isOtpValid = await bcrypt.compare(otp, user.secret);
    if (!isOtpValid) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    // ✅ Mark user as verified
    await UserModel.updateOne({ email }, { $set: { isVerified: true } });

    // ✅ Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ Send token in response body
    res.status(200).json({ msg: "Login successful", token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// ✅ User Login (Send OTP)
export const logInAuthController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    const otp = generateOtp(); 
    const hashedOTP = await bcrypt.hash(otp, 10); 
    await sendOTPEmail(email, otp); 

    // ✅ Update user OTP in the database
    await UserModel.updateOne(
      { email },
      { $set: { secret: hashedOTP, isVerified: false } }
    );

    res.status(200).json({ msg: 'OTP sent to email' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

import UserModel from "../../models/userModel.js";

import { generateOTP, hashOTP } from "../../helpers/otpHelper.js";
import sendOTPEmail from "../../services/emailSending.js";

const emailSignUpController = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      status: 400,
      msg: "Name and Email are required.",
    });
  }

  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        status: 409,
        msg: "User already exists. Please log in.",
      });
    }

    const otp = generateOTP();
    const hashedOTP = await hashOTP(otp);

    const user = await UserModel.create({
      name,
      email,
      secret: hashedOTP,
    });

    // Send OTP email
    const emailSent = await sendOTPEmail(name, email, otp);

    if (!emailSent) {
      return res.status(500).json({
        success: false,
        status: 500,
        msg: "Failed to send OTP email. Please try again.",
      });
    }

    return res.status(201).json({
      success: true,
      status: 201,
      msg: "Sign-up successful. OTP sent to email.",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error in emailSignUpController:", error);

    return res.status(500).json({
      success: false,
      status: 500,
      msg: "Internal Server Error",
    });
  }
};

export default emailSignUpController;

import UserModel from "../../models/userModel.js";
import { verifyOTP } from "../../helpers/otpHelper.js";
import { generateToken } from "../../utils/tokenGeneratorUtil.js";

const emailVerificationController = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({
      success: false,
      status: 400,
      msg: "Email and OTP are required",
    });
  }

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        status: 404,
        msg: "User not found",
      });
    }

    if (!user.secret) {
      return res.status(400).json({
        success: false,
        status: 400,
        msg: "OTP secret not found for user",
      });
    }

    const isValid = await verifyOTP(otp, user.secret); // Simplified function call

    if (!isValid) {
      return res.status(400).json({
        success: false,
        status: 400,
        msg: "Invalid OTP",
      });
    }

    const token = generateToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    return res.status(200).json({
      success: true,
      status: 200,
      msg: "Email verified successfully",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    console.error("Error in email verification:", error);

    return res.status(500).json({
      success: false,
      status: 500,
      msg: "Internal Server Error",
      error: error,
    });
  }
};

export default emailVerificationController;

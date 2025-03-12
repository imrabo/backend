import bcrypt from "bcrypt";

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function hashOTP(otp) {
  const saltRounds = 10;
  return await bcrypt.hash(otp, saltRounds);
}

async function verifyOTP(inputOtp, hashedOtp) {
  return await bcrypt.compare(inputOtp, hashedOtp);
}

export { generateOTP, hashOTP, verifyOTP };

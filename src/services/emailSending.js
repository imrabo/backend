import nodemailer from "nodemailer";

const sendOTPEmail = async ({ name, email, otp }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.UserEmail,
        pass: process.env.UserPassword,
      },
    });

    const mailOptions = {
      from: `"Imrabo" <no-reply@imrabo.com>`,
      to: email,
      subject: `${name}, please verify your account`,
      html: `
               <div style="width: 100%; background-color: #f4f4f4; padding: 40px 0; display: flex; justify-content: center;">
    <div style="max-width: 600px; width: 100%; background: #ffffff; font-family: Arial, sans-serif; padding: 25px; border-radius: 8px; border: 1px solid #ddd; box-shadow: 0px 4px 10px rgba(0,0,0,0.1); text-align: left;">

        <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 25px;">
            <div style="display: flex; align-items: center; padding: 10px 15px; border-radius: 50px; background-color: black;">
                <img src="https://app.imrabo.com/logo/imrabo-logo.png" alt="Imrabo Logo" style="height: 24px; margin-right: 10px;">
                <p style="color: white; font-size: 18px; font-weight: bold; margin: 0;">Imrabo</p>
            </div>
        </div>

        <h2 style="color: #333; margin-top: 0;">Hello ${name},</h2>
        <p style="color: #555; line-height: 1.5;">Welcome! To ensure the safety and security of your account, we need to verify your email address.</p>
        <p style="font-size: 16px; font-weight: 600; margin-bottom: 15px;">Your One-Time Password (OTP):</p>
        <div style="font-size: 24px; font-weight: bold; color: #0078D4; background: #eef6ff; padding: 12px 20px; display: inline-block; border-radius: 6px; letter-spacing: 2px;">
            ${otp}
        </div>
        <p style="margin-top: 15px;">Please enter this OTP within <strong>10 minutes</strong> of receiving this email to complete your verification process.</p>
        <p style="margin-top: 20px;">Thank you for your cooperation,</p>
        <p style="font-weight: bold; color: #333;"> Imrabo Team</p>
    </div>
</div>

<div style="width: 100%; text-align: center; padding: 20px; font-size: 13px; color: #666; border-top: 1px solid #ddd; background-color: #f4f4f4;">
    <p style="margin: 5px 0;">This email was intended for <strong>${name}</strong> (${email}).</p>
    <p style="margin: 5px 0;">If you did not request this email, please ignore it.</p>
    <p style="margin: 15px 0;">
        Need help? <a href="mailto:support@imrabo.com" style="color: #0078D4; text-decoration: none; font-weight: 600;">Contact Support</a>
    </p>
    <p style="margin: 10px 0;">
        <a href="https://imrabo.com/privacy-policy" style="color: #0078D4; text-decoration: none; font-weight: 600;">Privacy Policy</a> · 
        <a href="https://imrabo.com/terms" style="color: #0078D4; text-decoration: none; font-weight: 600;">Terms of Service</a> · 
        <a href="https://imrabo.com/unsubscribe" style="color: #0078D4; text-decoration: none; font-weight: 600;">Unsubscribe</a>
    </p>
    <p style="margin: 10px 0;">&copy; ${new Date().getFullYear()} Imrabo. All rights reserved.</p>
    <p style="margin: 5px 0;">Imrabo, 1000 Tech Park Avenue, Sunnyvale, CA 94085</p>
</div>

<style>
@media screen and (max-width: 600px) {
    div {
        padding: 15px !important;
    }
    h2 {
        font-size: 20px !important;
    }
    p, a {
        font-size: 14px !important;
    }
    div[style*="padding: 12px 20px"] {
        font-size: 20px !important;
        padding: 10px 15px !important;
    }
}
</style>
            `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`OTP Email sent: ${info.messageId}`);

    return true;
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return false;
  }
};

export default sendOTPEmail;

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    },
});

export async function sendOTPEmail(recipientEmail, otp) {
    const mailOptions = {
        from: `"${process.env.MAIL_SENDER_NAME}" <${process.env.MAIL_SENDER_EMAIL}>`,
        to: recipientEmail,
        subject: "Your OTP Code",
        html: `
        <html>
        <head>
            <style>
                .email-container {
                    max-width: 500px;
                    margin: auto;
                    padding: 20px;
                    font-family: Arial, sans-serif;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    text-align: center;
                }
                .otp-code {
                    background: #f8f8f8;
                    padding: 15px;
                    font-size: 24px;
                    font-weight: bold;
                    letter-spacing: 4px;
                }
                .footer {
                    color: #999;
                    font-size: 14px;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <h2>Your Verification Code</h2>
                <p>Use the following OTP to complete your sign-in process. Do not share this with anyone.</p>
                <div class="otp-code">${otp}</div>
                <p>This OTP is valid for 10 minutes.</p>
                <p class="footer">If you did not request this, please ignore this email.</p>
            </div>
        </body>
        </html>
    `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ OTP email sent to ${recipientEmail}`);
        return { success: true, message: "OTP email sent successfully!" };
    } catch (error) {
        console.error("❌ Error sending email:", error);
        return { success: false, message: "Failed to send OTP email", error };
    }
}

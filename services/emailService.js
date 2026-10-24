
import axios from "axios";

export const sendVerificationEmail = async (email, otp) => {
  const response = await axios.post(
    "https://api.brevo.com/v3/smtp/email",
    {
      sender: {
        name: process.env.BREVO_SENDER_NAME,
        email: process.env.BREVO_SENDER_EMAIL
      },
      to: [{ email }],
      subject: "Your Email Verification OTP",
      htmlContent: `
        <h2>Welcome!</h2>
        <p>Use the following OTP to verify your email address:</p>
        <h1 style="letter-spacing: 6px;">${otp}</h1>
        <p>This OTP expires in 5 minutes.</p>
        <p>If you did not create this account, ignore this email.</p>
      `
    },
    {
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json",
        accept: "application/json"
      },
      timeout: 10000
    }
  );

  return response.data;
};


export const sendPasswordResetEmail = async (email, resetToken) => {
  const resetLink =
    `${process.env.FRONTEND_URL}/reset-password?token=${encodeURIComponent(resetToken)}`;

  const response = await axios.post(
    "https://api.brevo.com/v3/smtp/email",
    {
      sender: {
        name: process.env.BREVO_SENDER_NAME,
        email: process.env.BREVO_SENDER_EMAIL,
      },
      to: [{ email }],
      subject: "Reset Your Password",
      htmlContent: `
        <h2>Password Reset Request</h2>
        <p>We received a request to reset your password.</p>
        <p>Click the link below to set a new password:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>This link expires in 15 minutes.</p>
        <p>If you did not request this, you can ignore this email.</p>
      `,
    },
    {
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  return response.data;
};





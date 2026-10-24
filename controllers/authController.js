
import jwt from "jsonwebtoken";
import {
  signupUser,
  verifyEmailOtp,
  loginUser, forgotPasswordUser,
  resetPasswordUser,
} from "../services/authService.js";
import { sendVerificationEmail ,sendPasswordResetEmail } from "../services/emailService.js";

// Signup and send OTP
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !name.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
      password.length < 8 ||
      password.length > 72
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Provide a valid name and email, and a password of 8–72 characters."
      });
    }

    const { user, otp } = await signupUser({
      name,
      email,
      password
    });

    try {
      await sendVerificationEmail(user.email, otp);
    } catch (emailError) {
      // Remove the newly created account if email delivery fails.
      await user.deleteOne();

      console.error(
        "OTP email error:",
        emailError.response?.data || emailError.message
      );

      return res.status(502).json({
        success: false,
        message: "Unable to send verification OTP. Please try again."
      });
    }

    return res.status(201).json({
      success: true,
      message:
        "Account created. Check your email for the verification OTP."
    });
  } catch (error) {
    if (error.statusCode === 409 || error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered."
      });
   

    }

    console.error("Signup error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to create account."
    });
  }
};

// Verify email using the submitted OTP
export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (
      typeof email !== "string" ||
      !email.trim() ||
      typeof otp !== "string" ||
      !/^\d{6}$/.test(otp)
    ) {
      return res.status(400).json({
        success: false,
        message: "A valid email and six-digit OTP are required."
      });
    }

    const user = await verifyEmailOtp(email, otp);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Email verified successfully. You can now log in."
    });
  } catch (error) {
    console.error("OTP verification error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to verify email."
    });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password ||
      password.length > 72
    ) {
      return res.status(400).json({
        success: false,
        message: "Valid email and password are required."
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not configured.");

      return res.status(500).json({
        success: false,
        message: "Server authentication is not configured."
      });
    }

    const result = await loginUser(email, password);

    if (result.error === "INVALID_CREDENTIALS") {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password."
      });
    }

    if (result.error === "EMAIL_NOT_VERIFIED") {
      return res.status(403).json({
        success: false,
        message: "Please verify your email before logging in."
      });
    }

    const user = result.user;

    const token = jwt.sign(
      { role: user.role },
      process.env.JWT_SECRET,
      {
        subject: user._id.toString(),
        expiresIn: process.env.JWT_EXPIRES_IN || "1h"
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Login error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to log in."
    });
  }
};



export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || typeof email !== "string") {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    const result = await forgotPasswordUser(email);

    // Always return the same response to avoid revealing
    // whether an email address is registered.
    if (result) {
      try {
        await sendPasswordResetEmail(email.trim().toLowerCase(), result.resetToken);
      } catch (emailError) {
        // Invalidate the token if the email could not be sent.
        result.user.resetPasswordTokenHash = undefined;
        result.user.resetPasswordExpires = undefined;
        await result.user.save();

        throw emailError;
      }
    }

    return res.status(200).json({
      success: true,
      message: "If an account exists for this email, a password reset link will be sent.",
    });
  } catch (error) {
    console.error("Forgot password error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to process the request right now. Please try again later.",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (
      typeof token !== "string" ||
      !/^[a-f0-9]{64}$/i.test(token)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset link",
      });
    }

    if (
      typeof newPassword !== "string" ||
      newPassword.length < 8 ||
      newPassword.length > 72
    ) {
      return res.status(400).json({
        success: false,
        message: "Password must be between 8 and 72 characters",
      });
    }

    const user = await resetPasswordUser(token, newPassword);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset link",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Password reset successfully. Please log in with your new password.",
    });
  } catch (error) {
    console.error("Reset password error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to reset password right now. Please try again later.",
    });
  }
};


import mongoose from "mongoose";
import crypto from 'crypto';
import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();
console.log(
  "Brevo API key loaded:",
  Boolean(process.env.BREVO_API_KEY)
);
import {
  createUser,
  findUserByPhone,
  findUserById,
  findAllUsers,
  updateUser,
  deleteUser,
  isPhoneRegistered,
} from "../services/blinkitUserServices.js";


// Temporary OTP storage for this demonstration.
// Use Redis or a database in production.
const otpStore = new Map();

// Generate a secure six-digit OTP.
function generateOTP() {
  return crypto.randomInt(100000, 1000000).toString();
}

// Validate an international phone number.
function isValidPhone(phone) {
  return (
    typeof phone === "string" &&
    /^\+[1-9]\d{7,14}$/.test(phone)
  );
}

// Send OTP using Brevo's transactional SMS API.
async function sendSMS(phone, otp) {
  const response = await axios.post(
    "https://api.brevo.com/v3/transactionalSMS/send",
    {
      sender: process.env.BREVO_SMS_SENDER,
      recipient: phone.replace("+", ""),
      content: `Your MyApp login OTP is ${otp}. It expires in 5 minutes.`,
      type: "transactional"
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
}



//sendotp to user 
// Route 1: Send OTP

export const sendOtp = async (req,res)=>{

  try {
    const { phone } = req.body;

    if (!isValidPhone(phone)) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid phone number with country code."
      });
    }

    const otp = generateOTP();

    // Send SMS first.
    const result = await sendSMS(phone, otp);

    // Store OTP only after Brevo accepts the SMS request.
    otpStore.set(phone, {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
      attempts: 0
    });

    return res.json({
      success: true,
      message: "OTP request accepted by Brevo.",
      messageId: result.messageId
    });
  } catch (error) {
    console.error(
      "Brevo SMS error:",
      error.response?.data || error.message
    );

    return res.status(502).json({
      success: false,
      message: "Unable to send OTP. Please try again later."
    });
  }
}


export const verifyOtp= async(req,res)=>{

}


// 1. Create a user
export const createBlinkitUser = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid 10-digit Indian mobile number",
      });
    }

    const registered = await isPhoneRegistered(phone);

    if (registered) {
      return res.status(409).json({
        success: false,
        message: "This mobile number is already registered",
      });
    }

    // IMPORTANT:
    // In your OTP flow, call this only AFTER the backend
    // has successfully verified the OTP.
    const user = await createUser({
      phone,
      isPhoneVerified: true,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error("Create user error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "This mobile number is already registered",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create user",
    });
  }
};

// 2. Find a user by phone number
export const getUserByPhone = async (req, res) => {
  try {
    const { phone } = req.params;

    if (!/^[6-9]\d{9}$/.test(phone || "")) {
      return res.status(400).json({
        success: false,
        message: "Invalid mobile number",
      });
    }

    const user = await findUserByPhone(phone);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Find user by phone error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to find user",
    });
  }
};

// 3. Find a user by MongoDB ID
export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const user = await findUserById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Find user by ID error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to find user",
    });
  }
};

// 4. Find all users
// Protect this endpoint with admin authorization.
export const getAllBlinkitUsers = async (req, res) => {
  try {
    const users = await findAllUsers();

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Find all users error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

// 5. Update a user's profile
export const updateBlinkitUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email } = req.body;

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    if (name === undefined && email === undefined) {
      return res.status(400).json({
        success: false,
        message: "Provide a name or email to update",
      });
    }

    if (
      name !== undefined &&
      name !== null &&
      typeof name !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Name must be a string",
      });
    }

    if (
      email !== undefined &&
      email !== null &&
      email !== "" &&
      (typeof email !== "string" ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    ) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid email address",
      });
    }

    const user = await updateUser(userId, { name, email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Update user error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};

// 6. Delete a user by ID
// Protect this endpoint with admin authorization.
export const removeBlinkitUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const user = await deleteUser(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete user error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
};

// 7. Check whether a phone number is registered
export const checkPhoneRegistered = async (req, res) => {
  try {
    const { phone } = req.params;

    if (!/^[6-9]\d{9}$/.test(phone || "")) {
      return res.status(400).json({
        success: false,
        message: "Invalid mobile number",
      });
    }

    const registered = await isPhoneRegistered(phone);

    return res.status(200).json({
      success: true,
      registered,
    });
  } catch (error) {
    console.error("Check phone error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to check mobile number",
    });
  }
};

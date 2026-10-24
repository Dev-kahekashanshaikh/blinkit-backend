
import crypto from "crypto";
import bcrypt from "bcrypt";
import User from "../model/blinkitUserModel.js";

// Generate a secure six-digit OTP
const generateOTP = () => {
  return crypto.randomInt(100000, 1000000).toString();
};

// Hash the OTP before storing it
const hashOTP = (otp) => {
  return crypto
    .createHash("sha256")
    .update(otp)
    .digest("hex");
};

// Register a new user and generate an OTP
export const signupUser = async ({ name, email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await User.findOne({
    email: normalizedEmail
  });

  if (existingUser) {
    const error = new Error("Email is already registered.");
    error.statusCode = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const otp = generateOTP();

  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    passwordHash,
    isEmailVerified: false,
    emailOtpHash: hashOTP(otp),
    emailOtpExpires: new Date(Date.now() + 5 * 60 * 1000)
  });

  return { user, otp };
};

// Verify the email using the OTP
export const verifyEmailOtp = async (email, otp) => {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await User.findOne({
    email: normalizedEmail,
    emailOtpHash: hashOTP(otp),
    emailOtpExpires: { $gt: new Date() },
    isEmailVerified: false
  }).select("+emailOtpHash +emailOtpExpires");

  if (!user) {
    return null;
  }

  user.isEmailVerified = true;
  user.emailOtpHash = undefined;
  user.emailOtpExpires = undefined;

  await user.save();

  return user;
};

// Log in an existing user
export const loginUser = async (email, password) => {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await User.findOne({
    email: normalizedEmail
  }).select("+passwordHash");

  if (!user) {
    return { error: "INVALID_CREDENTIALS" };
  }

  const passwordMatches = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!passwordMatches) {
    return { error: "INVALID_CREDENTIALS" };
  }

  if (!user.isEmailVerified) {
    return { error: "EMAIL_NOT_VERIFIED" };
  }

  return { user };
};



// Step 1: Generate a password reset token
export const forgotPasswordUser = async (email) => {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await User.findOne({
    email: normalizedEmail
  });

  // Don't reveal whether the email is registered.
  if (!user) {
    return;
  }

  // Generate a secure random token
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Store only the token hash
  const resetTokenHash = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordTokenHash = resetTokenHash;
  user.resetPasswordExpires = new Date(
    Date.now() + 15 * 60 * 1000
  );

  await user.save();

  // Return the original token for the email link
  return { user, resetToken };
};

// Step 2: Verify token and update password
export const resetPasswordUser = async (token, newPassword) => {
  const resetTokenHash = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordTokenHash: resetTokenHash,
    resetPasswordExpires: { $gt: new Date() }
  }).select("+resetPasswordTokenHash +resetPasswordExpires");

  if (!user) {
    return null;
  }

  // Hash the new password before saving
  user.passwordHash = await bcrypt.hash(newPassword, 12);

  // Invalidate the token after successful use
  user.resetPasswordTokenHash = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  return user;
};

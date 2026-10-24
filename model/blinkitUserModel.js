
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 254,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address"
      ]
    },

    passwordHash: {
      type: String,
      required: [true, "Password is required"],
      select: false
    },

    isEmailVerified: {
      type: Boolean,
      default: false
    },

    // Hashed OTP and its expiration time
    emailOtpHash: {
      type: String,
      select: false
    },

    emailOtpExpires: {
      type: Date,
      select: false
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    
resetPasswordTokenHash: {
  type: String,
  select: false
},

resetPasswordExpires: {
  type: Date,
  select: false
},

  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

export default User;

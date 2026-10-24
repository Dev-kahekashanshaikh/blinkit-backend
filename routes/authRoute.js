import express from 'express'
import { signup, verifyEmail,
  login,forgotPassword ,resetPassword} from "../controllers/authController.js";
export const authenticationRoute = express.Router();



//Create account and send verification email
authenticationRoute.post('/signup',signup);


//Verify email
authenticationRoute.post('/verify-email',verifyEmail);

// //Authenticate user
authenticationRoute.post('/login',login);

// //Request password reset
authenticationRoute.post('/forgot-password',forgotPassword);

// //Set a new password
authenticationRoute.post('/reset-password',resetPassword);

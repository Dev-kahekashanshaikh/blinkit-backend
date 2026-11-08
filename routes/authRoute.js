import express from 'express'
import { signup, verifyEmail,
  login,logout,forgotPassword ,resetPassword} from "../controllers/authController.js";
import { requireAuth } from "../middleware/authMiddleware.js";


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


authenticationRoute.post("/logout", logout);

authenticationRoute.get("/me", requireAuth, (req, res) => {
  return res.status(200).json({
    message: "Authenticated user",
    user:  {
      id: req.user.id,
      role: req.user.role,
      name: req.user.name,
      email: req.user.email,
      address: req.user.address,
    },
  });
});

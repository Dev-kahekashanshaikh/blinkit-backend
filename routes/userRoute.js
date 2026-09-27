import express from "express"
import {createAccount,getProfile,userLogin,changeMobNum, showProfile}  from "../controllers/userController.js";
let userRoute = express.Router();

userRoute.post('/createuser',createAccount);
userRoute.post('/profile',showProfile);
userRoute.get('/userprofile/:email',getProfile);
userRoute.post('/login',userLogin);
userRoute.post('/updatemobile',changeMobNum);

export default userRoute;



// 3) /user/updatemobile email,updatedmobile post 
//    message mobile number updated successfully
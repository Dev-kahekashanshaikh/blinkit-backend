import express from 'express';
 let blikitAppUserRoute = express.Router();

import {createBlinkitUser,sendOtp,verifyOtp} from '../controllers/blinkitUserController.js'


blikitAppUserRoute.post('/createUserAccount',createBlinkitUser);
blikitAppUserRoute.post('/send-otp',sendOtp);
blikitAppUserRoute.post('/verify-otp',verifyOtp);




export default blikitAppUserRoute;
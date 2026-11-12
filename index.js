import express from 'express';
import cookieParser from "cookie-parser";
import axios from 'axios';
import crypto from 'crypto';

import userRoute from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import cartRoute  from './routes/cartRoute.js';
import user1Route  from './routes/userRoute1.js';
import chatRoute from "./routes/chatRoute.js";
import emailRoutes from "./routes/emailRoutes.js";
import blikitAppUserRoute from "./routes/blinkitUserRoute.js"
import { authenticationRoute } from './routes/authRoute.js';

import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import  connectDB  from "./db/connectdb.js";
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://blinkit-frontend-z9de.vercel.app/"
];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/user',userRoute);
app.use('/user1',user1Route);
app.use('/product',productRoute);
app.use('/cart',cartRoute);
app.use("/api", chatRoute);
app.use("/orders", emailRoutes);
app.use('/blinkit/user',blikitAppUserRoute);

app.use(cookieParser());
app.use('/api/auth',authenticationRoute)

connectDB(process.env.MONGODB_URL,process.env.DB_NAME);





app.listen(process.env.PORT,()=>{
    console.log(`server is runnig at port ${process.env.PORT}`);
})







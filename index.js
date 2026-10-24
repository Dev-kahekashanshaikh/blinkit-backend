import express from 'express';
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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/user',userRoute);
app.use('/user1',user1Route);
app.use('/product',productRoute);
app.use('/cart',cartRoute);
app.use("/api", chatRoute);
app.use("/mail", emailRoutes);
app.use('/blinkit/user',blikitAppUserRoute);
app.use('/api/auth',authenticationRoute)

connectDB(process.env.MONGODB_URL,process.env.DB_NAME);





app.listen(process.env.PORT,()=>{
    console.log(`server is runnig at port ${process.env.PORT}`);
})







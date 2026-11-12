
import express from 'express';
import cookieParser from "cookie-parser";
import axios from 'axios';
import crypto from 'crypto';

import userRoute from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import cartRoute from './routes/cartRoute.js';
import user1Route from './routes/userRoute1.js';
import chatRoute from "./routes/chatRoute.js";
import emailRoutes from "./routes/emailRoutes.js";
import blikitAppUserRoute from "./routes/blinkitUserRoute.js";
import { authenticationRoute } from './routes/authRoute.js';

import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./db/connectdb.js";

dotenv.config();

const app = express();

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://blinkit-frontend-z9de.vercel.app",
  "https://blinkit-frontend-sigma.vercel.app",
  "https://blinkit-frontend-3j23tj78k-dev-kahekashanshaikhs-projects.vercel.app",
  "https://blinkit-frontend-pf5celom9-dev-kahekashanshaikhs-projects.vercel.app"
];

// CORS configuration
app.use(cors({
  origin: (origin, callback) => {
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      /^https:\/\/blinkit-frontend-[a-z0-9-]+\.vercel\.app$/.test(origin)
    ) {
      callback(null, true);
    } else {
      console.log("CORS blocked origin:", origin);
      callback(new Error(`CORS blocked for origin: ${origin}`));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/user', userRoute);
app.use('/user1', user1Route);
app.use('/product', productRoute);
app.use('/cart', cartRoute);
app.use("/api", chatRoute);
app.use("/orders", emailRoutes);
app.use('/blinkit/user', blikitAppUserRoute);
app.use('/api/auth', authenticationRoute);

// Database connection
connectDB(process.env.MONGODB_URL, process.env.DB_NAME);

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});

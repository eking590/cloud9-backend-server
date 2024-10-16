import mongoose from "mongoose";
import { config } from "dotenv";

config() 


//const MONGO_URL = 'mongodb://localhost:27017/Cloud9'

export const Mongoose = mongoose.connect(process.env.MONGO_URL, {  })
.then(() => console.log('Connected to Cloud9 Database...'))
.catch(err => console.error('Could not connect to Cloud9 Database...'))

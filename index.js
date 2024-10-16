import express from 'express'; 
// import mongoose from 'mongoose'; 
import cors from "cors"; 
import { config } from "dotenv";
import bodyParser from "body-parser";
import { Mongoose } from './config/db.js';
import bookingRoute from './routes/bookingRoutes.js';
import paymentRoute from './routes/paymentsRoutes.js';
import dotenv from 'dotenv';

import userRoute from './routes/userRoutes.js'

import { errorHandler } from './middlewares/errorHandler.js'; 
import apicache from 'apicache';
//import { ValidateToken } from './middleware/ValidateToken.js';


// Load environment variables before using them
dotenv.config();

const app = express(); 
const PORT = process.env.PORT || 5000;
// const MONGO_URL = process.env.MONGO_URL

//increase the payload limit(e.g., 10mb)
app.use(cors({
  origin: '*', // or specify allowed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json({}));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    next(); 
}); 

// Initialize cache with default options
let cache = apicache.middleware;

// Apply cache to all routes
// You can specify the duration for which you want to cache the response
//app.use(cache('5 minutes'));


app.get('/', cache('10 minutes'), (req, res) => {
    res.send('Welcome to Cloud9 Backend !!!'); 
});






// add errorhandler here 
app.use(errorHandler);

//routing 

app.use('/api/v1/user', /*cache('60 minutes')*/ userRoute);
app.use('/api/v1/bookings', bookingRoute);
app.use('/api/v1/payments', paymentRoute);


config();


// Ensure MONGO_URL is defined before connecting
// if (!MONGO_URL) {
//   console.error('MONGO_URL is not defined in the environment variables');
//   process.exit(1);
// }

// connect to mongodb
// mongoose.connect(MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//     .then(() => console.log('Connected to MongoDB...'))
//     .catch(err => console.error('Could not connect to MongoDB...', err));
  
  app.listen(PORT,'0.0.0.0', () => {
    console.log(`Cloud9 is listening at http://localhost:${PORT}`);
  });
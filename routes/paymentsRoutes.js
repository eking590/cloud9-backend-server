import express from 'express';
import { initiatePayment, confirmPayment, handlePaystackWebhook, generateTicket } from '../controllers/paymentController.js';
import { ValidateToken } from '../middlewares/validateToken.js';

const router = express.Router();

// Route to initialize payment
router.post('/initiate', ValidateToken, initiatePayment);

// Route to verify payment
router.get('/verify/:reference', ValidateToken, confirmPayment);


router.post('/webhook', express.raw({ type: 'application/json' }), ValidateToken, handlePaystackWebhook);


router.post('/generate-ticket', ValidateToken, generateTicket); 

//Finally, don't forget to configure the webhook URL in your Paystack dashboard to point to this route
//(e.g., /api/v1/payments/webhook)


export default router;

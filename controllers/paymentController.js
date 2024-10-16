
import { initializePayment, verifyPayment } from '../services/paystackServices.js';
import crypto from 'crypto';
import BookingRepository from '../repositories/bookingRepository.js';
import UserRepository from '../repositories/userRepository.js';
import Booking from '../models/bookingModel.js';
//import bookingRepository from '../repositories/bookingRepository.js';
// import { id } from 'apicache';


export const initiatePayment = async (req, res) => {
  const { email, amount } = req.body;

  if (!email || !amount) {
    return res.status(400).json({ message: 'Email and amount are required' });
  }

  const paymentData = {
    email,
    amount: amount * 100,  // Convert amount to kobo
  };

  try {
    const response = await initializePayment(paymentData);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const confirmPayment = async (req, res) => {
  const { reference } = req.params;

  try {
    const paymentResponse = await verifyPayment(reference);
    if (paymentResponse.data.status === 'success') {
      // Handle successful payment
      return res.status(200).json(paymentResponse);
    } else {
      return res.status(400).json({ message: 'Payment not successful' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// export const webhook = async (req, res) => {
//     const { event, data } = req.body;
  
//     if (event === 'charge.success') {
//       // Process successful payment
//       res.status(200).json({ message: 'Payment successful', data });
//     } else {
//       res.status(400).json({ message: 'Unhandled event' });
//     }
//   };

export const handlePaystackWebhook = async (req, res) => {
  // Paystack signature from the header
  // const paystackSignature = req.headers['x-paystack-signature'];

  // Verify that the webhook is from Paystack
  // const secret = process.env.PAYSTACK_TEST_SECRET_KEY; // This should be your Paystack secret key
  // const hmac = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex'); 
  // res.status(200).json(hmac); 

  // // console.log(hmac); 

  // if (paystackSignature !== hmac) {
  //   return res.status(401).send('Unauthorized: Invalid signature');
  // }

  const { event, data } = req.body;
  // Process the event data
  // const event = (req.body);

  if (event === 'charge.success') {
    // Handle successful payment event
    res.status(200).json({ message: 'Payment successful!!', data })
    
        res.status(400).send('Invalid event');
  }

  res.status(200).send('Webhook received successfully');
};


// Function to generate random alphanumeric string
function generateRandomString(length){
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};

//generate booking ticket 
export const generateTicket = async (req, res) => {
  try {
      const userId  = req.user._id;
      const userBookings = await BookingRepository.findByUser(userId) 
      //console.log(userBookings); 
      if(!userBookings) {
        return res.status(400).send('user booking details not found!!!')
      } 
      
      
      
      // const randomString = generateRandomString(6);
      // Step 3: Generate the booking ticket
        //const ticketNumber = `TICKET-${Cloud9Games}-${new Date().getTime()}`; // Unique ticket reference
      const ticketNumber = `TICKET-${'Cloud9Games'}-${new Date().getTime()}`; // Unique ticket reference

      // Step 4: Send ticket response
        res.status(200).json({
          message: 'Booking successful',
          ticket: {
            //reference: paymentDetails.reference,
            booking_details: userBookings,
            ticketNumber: ticketNumber,
          // gameTitle: userBookings.gameTitle,
          // platform: userBookings.platform,
          // bookingDate: userBookings.bookingDate,
          // returnDate: userBookings.returnDate
        }
      });
    
      // Optional: Send booking ticket to user's email
      // await sendEmail(user.email, 'Booking Confirmation', `Your ticket: ${ticketNumber}`);

    } catch (error) {
      res.status(500).send('Internal Server Error!!!');
    }

}
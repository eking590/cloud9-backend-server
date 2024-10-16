import express from 'express';
import { bookVideoGame, getAllBookings, getBookingById, getUserBookings, deleteBooking } from '../controllers/bookingController.js';
import { ValidateToken } from '../middlewares/validateToken.js';


const router = express.Router();

// Routes for booking operations

router.post('/book-game', ValidateToken, bookVideoGame);
router.get('', ValidateToken, getAllBookings);
router.get('/user', ValidateToken, getUserBookings);
router.get('/:id', ValidateToken, getBookingById);
router.delete('/:id', ValidateToken, deleteBooking);



export default router;

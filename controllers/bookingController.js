import BookingRepository from '../repositories/bookingRepository.js';
import asyncHandler from 'express-async-handler';

// Controller to book a video game
export const bookVideoGame = asyncHandler(async (req, res) => {
  const { gameTitle, platform, returnDate } = req.body;

  // Validate required fields
  if (!gameTitle || !platform || !returnDate) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Create a booking
  const booking = await BookingRepository.create({
    user: req.user,  // Assuming `req.user` is populated from token middleware
    gameTitle,
    platform,
    returnDate
  });

  return res.status(201).json({ message: 'Booking created successfully', booking });
});

// Controller to get all bookings
export const getAllBookings = asyncHandler(async (req, res) => {
  const bookings = await BookingRepository.findAll();
  return res.status(200).json(bookings);
});

// Controller to get booking by ID
export const getBookingById = asyncHandler(async (req, res) => {
  const booking = await BookingRepository.findById(req.params.id);

  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
  }

  return res.status(200).json(booking);
});

// Controller to get all bookings of a user
export const getUserBookings = asyncHandler(async (req, res) => {
  const bookings = await BookingRepository.findByUser(req.user._id);  // Use the user ID from token
  return res.status(200).json(bookings);
});

// Controller to delete a booking
export const deleteBooking = asyncHandler(async (req, res) => {
 
    try {
    //const bookingId = req.params.id
        const booking = await BookingRepository.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        //   console.log(booking.user)
        // Ensure the user deleting the booking is the one who made it
        if (booking.user._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'User not authorized to delete this booking' });
        }

            await BookingRepository.delete(req.params.id);
            return res.status(200).json({ message: 'Booking deleted successfully' });
    } catch(error){
    return res.status(500).json({ message: error.message });
}
});


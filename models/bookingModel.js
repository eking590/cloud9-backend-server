import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  gameTitle: {
    type: String,
    required: [true, 'Please provide the game title']
  },
  platform: {
    type: String,
    required: [true, 'Please specify the platform (e.g., PC, PS5, Xbox)']
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  returnDate: {
    type: Date,
    required: [true, 'Please specify the return date']
  }
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;

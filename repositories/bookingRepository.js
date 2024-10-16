import Booking from '../models/bookingModel.js';

class BookingRepository {
  // Create a new booking
  async create(bookingData) {
    const newBooking = new Booking(bookingData);
    return await newBooking.save();
  }

  // Find all bookings
  async findAll() {
    return await Booking.find().populate('user');
  }

  // Find a booking by ID
  async findById(id) {
    return await Booking.findById(id).populate('user');
  }

   // Find all bookings for a specific user
   async findByUser(userId) {
    return await Booking.find({ user: userId }).populate('user');
  }

  // Update a booking by ID
  async update(id, bookingData) {
    return await Booking.findByIdAndUpdate(id, bookingData, { new: true });
  }

  // Delete a booking by ID
  async delete(id) {
    // return await Booking.findByIdAndRemove(id);
    return await Booking.findByIdAndDelete(id);
  }

  // Find all bookings for a specific user
  async findByUser(userId) {
    return await Booking.find({ user: userId });
  }
}

export default new BookingRepository();

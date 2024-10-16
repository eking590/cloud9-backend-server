import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  password: String,
  
}, {
  timestamps: true,
});

const user = mongoose.model('User', userSchema);

export default user;


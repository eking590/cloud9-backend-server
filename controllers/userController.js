import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; 
import UserRepository from '../repositories/userRepository.js';
import { PasswordCorrect } from '../utils/hashPassword.js';
import asyncHandler from "express-async-handler";
import { config } from "dotenv";
import user from '../models/userModel.js';

config()




const JWT_SECRET =  'eking@190';

// create account 
export const createUser = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 8);
  try {
    //check if there is an existing email 
    const existingUser = await UserRepository.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send({ message: 'user already exists' });
    }

   const newUser = {
    phoneNumber:req.body.phoneNumber,
    password:hashedPassword,
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    email:req.body.email
   }

  
      const user = await UserRepository.create(newUser);
      //await WelcomeEmail(newUser.email, newUser.fullName)
      return res.status(201).send({ user, message:"user created successfully" });
   

  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}


export const LoginUser = async(req, res) => {
   try{
    const { email, password } = req.body;
    
    const user = await UserRepository.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
      const passwordCorrect = await bcrypt.compare(password, user.password) 
        if(passwordCorrect) {
          const user1 = {
            data: user
        }
        
          const accessToken = jwt.sign({ user1: user  }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        return res.status(200).send({
          msg: 'Login Successful',
          accessToken
      }); }
      //password is not correct 
        return res.status(404).send({ msg: "Incorrect password "})
    
   
    } catch (error) {
        console.error('Error comparing passwords:', error);
        return res.status(500).json({ message: 'An error occurred during login' });
      }
}












//get the current user

//Get current user 


// export const getCurrentUser = async (req, res) => {
//   console.log("current user", req.user)
//   const userId = req.user;
//   const current_user = await userRepository.findById(userId);
//   return res.status(200).send(current_user);
  
// }


export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user;  // This should be the ID extracted from the token
    console.log("Current User ID:", userId);

    
    const currentUser = await UserRepository.findById(userId);

    if (!currentUser) {
      return res.status(404).send({ message: 'User not found' });
    }

    return res.status(200).json(currentUser);
  } catch (error) {
    console.error('Error fetching current user:', error);
    return res.status(500).send({ message: 'Internal server error' });
  }
}


//delete a user 
export const deleteUser = asyncHandler(async (req, res) => {
  try {
      // console.log('user delete route is working')
      const user1 = await UserRepository.findById(req.params.id);
      if (!user1) {
          return res.status(404).json({ message: 'User not found' });
      }
        console.log(user1)
      // Ensure the user deleting the booking is the one who made it
      if (user1._id.toString() !== req.user._id.toString()) {
          return res.status(403).json({ message: 'User not authorized to delete this booking' });
      }

        await UserRepository.delete(req.params.id);
        return res.status(200).json({ message: 'user deleted successfully' });
  } catch(error){
  return res.status(500).json({ message: error.message });
}
}); 




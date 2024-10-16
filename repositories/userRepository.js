import user from "../models/userModel.js";

class UserRepository {
  async create(User) {
    const newUser = new user(User);
    return await newUser.save();
  }

  async findAll() {
    return await user.find();
  }

  async findById(id) {
    return await user.findById(id);
  }


  async update(id, userData) {
    return await user.findByIdAndUpdate(id, userData, { new: true });
  }

  async delete(id) {
    return await user.findByIdAndDelete(id);
  }

  async findOne(query) {
    return await user.findOne(query)
  }

  
}

export default new UserRepository();

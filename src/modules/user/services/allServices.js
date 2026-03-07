import User from "../schema/userSchema.js";
import bcrypt from "bcryptjs";

const craeteUserService = async (userData)=>{
      // Hash password before saving
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = new User({ ...userData, password: hashedPassword });
      const savedUser = await user.save();
      return savedUser;
}

const updatedUserService = (id , userData)=>{
    const updateduser = User.findByIdAndUpdate(id, userData, {new : true});
    return updateduser;
}

const deleteUserService = (id)=>{
    const deletedUser = User.findByIdAndDelete(id);
    return deletedUser;
}

const getCurrentUserService = (userId)=>{
    const currentUser = User.findById(userId);
    return currentUser;
}


export {
    craeteUserService,
    updatedUserService,
    deleteUserService,
    getCurrentUserService
}
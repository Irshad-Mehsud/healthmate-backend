import User from "../schema/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
         const { password: _, ...userData } = user.toObject(); 
          const token = jwt.sign(
                 { id: user._id, email: user.email },
                process.env.JWT_SECRET
            );
    res.status(200).json({
      message: "User login successful",
      data: userData,
      userId: userData._id,
      token,
    });
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};


export default loginUser;
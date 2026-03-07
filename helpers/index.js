import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authentication = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    if (!authorization.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Invalid token format",
      });
    }

    const token = authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // attach user data to request
    next();

  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized access",
      error: error.message,
    });
  }
};

export default authentication;
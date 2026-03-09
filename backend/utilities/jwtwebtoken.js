
import jwt from "jsonwebtoken";
 
const generateToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
   res.cookie("jwt", token, {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    httpOnly: true,
    SameSite: "Strict",
    secure: process.env.SECURE !== "DEVELOPMENT" 
  }); 
}

 export default generateToken;
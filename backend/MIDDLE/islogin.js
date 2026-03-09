import jwt from "jsonwebtoken";
import User from "../models/userModels.js";
// import Message from "../models/messagescheme.js";

 const isLogin = async(req,res,next)=>{
    try {
     
        const token = req.cookies.jwt;
  
        if (!token) {
          return res.status(401).json({ message: "Unauthorized" });
        }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if(!decoded){
                return res.status(401).json({ message: "Unauthorized" });
            }
            const user = await User.findById(decoded.id).select("-password");
            if (!user) {
                return res.status(401).json({ message: "Unauthorized" });
            }
             req.user = user;
            next();
    }catch (error) {
        res.status(500).json({ message: "Server error" });
        console.error(error);
    }
}
export default isLogin; 
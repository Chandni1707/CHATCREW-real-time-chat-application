
import User from "../models/userModels.js";
import bcryptjs from "bcryptjs";
import jwtwebtoken from  '../utilities/jwtwebtoken.js'
export const UserRegister = async (req, res) => {
  try {

    const { fullname, username, email, password, profilepic } = req.body;

    if (!fullname || !username || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ success: false, msg: "User already exists" });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const profilePicture =
      profilepic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

    const newUser = new User({
      fullname,
      username,
      email,
      password: hashedPassword,
      profilepic: profilePicture,
    });
 if(newUser){
  jwtwebtoken(newUser._id, res);  
    await newUser.save();
 }else{
  return res.status(400).json({ success: false, msg: "Failed to create user" });
 }



    res.status(201).json({
      _id: newUser._id,
      fullname: newUser.fullname,
      username: newUser.username,
      email: newUser.email,
      profilepic: newUser.profilepic,
    });

  } catch (error) {
    console.error("Error in UserRegister:", error);
    res.status(500).json({
      success: false,
      msg: "Failed to create user",
      error: error.message
    });
  }
};
  export const UserLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if(!user){
        return res.status(400).json({ success: false, msg: "Invalid email or doesnt exist or may problem with password" });
      }
      const comparePassword = bcryptjs.compareSync(password, user.password );
      if(!comparePassword){
        return res.status(400).json({ success: false, msg: "PASSWORD PROBLEM BRO" });
      }
      jwtwebtoken(user._id, res);
      res.status(200).json({
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        profilepic: user.profilepic,
        message : "Login successful"
      });
    }catch (error) {
       console.error("Error in UserRegister:", error);
    res.status(500).json({
      success: false,
      msg: "Failed to create user",
      error: error.message
    });
  }
}


 export const UserLogout = async (req, res) => {
  try {
    res.cookie("jwt", ' ',{ 
      maxAge: 0,
    })
    res.status(200).json({
      success: true,
      msg: "Logout successful"
    })
  }catch (error) {
   res.status(500).send({
    success: false,
    msg: "Failed to logout",
    error: error.message
   })
   console.log("error in logout bro");
  } 

 }
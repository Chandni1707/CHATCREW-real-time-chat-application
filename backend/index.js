import express from "express";
import dotenv from "dotenv"

import dbconnect from "./DB/dbconnect.js";
import authroute  from "./route/authuser.js";
import messageRoute from "./route/messageroute.js";
import cookieParser from "cookie-parser";
import userRoute from "./route/useroute.js";  
dotenv.config();



const app = express();
app.use(express.json());
 app.use(cookieParser());

 app.use('/api/auth', authroute)
 app.use('/api/message', messageRoute)
 app.use('/api/user', userRoute)

app.get("/", (req, res) => {
  res.send("kaadhu");
});
const PORT =  process.env.PORT || 3000;
app.listen(PORT, () => {
    dbconnect();

  console.log(`Server working at ${PORT}`);
}); 
import express from "express";
import isLogin from "../MIDDLE/islogin.js"; 
import { sendMessage , getMessages} from "../routeController/messagecontroller.js";


const router = express.Router();

router.post("/send/:id", isLogin, sendMessage);
router.get("/:id", isLogin, getMessages);

export default router;

import express from "express"
import isLogin from "../MIDDLE/islogin.js";
import { getCurrentChatUser, getUserBySearch } from "../routeController/usersearch.js";
 const router = express.Router();

 router.get('/search', isLogin, getUserBySearch);
  
  router.get('/currentchat', isLogin, getCurrentChatUser) ; 
 export default router;
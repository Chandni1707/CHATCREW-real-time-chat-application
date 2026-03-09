import express from "express"
 const route = express.Router();
import { UserRegister } from "../routeController/userController.js";
import { UserLogin } from "../routeController/userController.js";
import { UserLogout } from "../routeController/userController.js";

route.post('/register', UserRegister);
route.post('/login', UserLogin);
route.post('/logout', UserLogout);

  export default route;
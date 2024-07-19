import express from 'express'
 
import {signin,signup} from '../Controller/AuthController.js'
 const authRouter = express.Router();

 authRouter.post("/signin",signin);
 authRouter.post("/signup",signup);

 export default authRouter;
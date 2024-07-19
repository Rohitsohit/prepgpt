import express from 'express'
 
import {customGptChat,customDataCollector}from "../Controller/CustomGptController.js"
 const gptRouters = express.Router();

 gptRouters.post("/upload-data",customDataCollector)
 gptRouters.post("/message",customGptChat);


 export default gptRouters;
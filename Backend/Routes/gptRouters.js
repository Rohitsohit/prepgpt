import express from 'express'
 
import {customGptChat,customDataCollector,QuizGenerator}from "../Controller/CustomGptController.js"
 const gptRouters = express.Router();

 gptRouters.post("/upload-data",customDataCollector)
 gptRouters.post("/message",customGptChat);
gptRouters.post("/quiz",QuizGenerator)

 export default gptRouters;
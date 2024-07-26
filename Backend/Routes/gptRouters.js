import express from 'express'
 
import {customGptChat,customDataCollector,QuizGenerator, saveQuizData, getSavedQuiz}from "../Controller/CustomGptController.js"
 const gptRouters = express.Router();

 gptRouters.post("/upload-data",customDataCollector)
 gptRouters.post("/message",customGptChat);
gptRouters.post("/quiz",QuizGenerator)
gptRouters.post("/save-quiz",saveQuizData);
gptRouters.get("/get-quiz",getSavedQuiz);
 export default gptRouters;
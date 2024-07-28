import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout';
import Home from './Components/Home';
import CustomGPT from './Components/CustomGPT/CustomGPT';
import AuthForm from './Components/AuthForm';
import Quiz from './Components/QuizGPT/Quiz';
import QuestionLayout from './Components/QuizGPT/QuizLayout';

export default function App() {
 
  return (
    <>
     <Layout>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/customGPT" exact element={<CustomGPT />} />
        <Route path="/quiz" exact element={<Quiz></Quiz>} /> 
        <Route path="/quiz-question" exact element={<QuestionLayout/>} />
        <Route path="/auth" exact element={<AuthForm />} />
      </Routes>
      </Layout>
    </>

  );
}


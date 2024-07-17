import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout';
import Home from './Components/Home';
import CustomGPT from './Components/CustomGPT';
import AuthForm from './Components/AuthForm';
import Quiz from './Components/Quiz';
import Question from './Components/Question';
import Navbar from './Components/Navbar';
import BackgroundAnimation from './Components/BackgroundAnimation';
import Interviewprep from './Components/Interviewprep';


export default function App() {
  return (
    <>
     <Layout>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/customGPT" exact element={<CustomGPT />} />
        <Route path="/quiz" exact element={<Quiz></Quiz>} />
        <Route path="/quiz-question" exact element={<Question />} />
        <Route path="/auth" exact element={<AuthForm />} />
        <Route path="/interview-prep" exact element={<Interviewprep />} />
      </Routes>
      </Layout>
    </>

  );
}


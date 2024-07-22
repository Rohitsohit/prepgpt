import React, { useState } from 'react';
import QuestionComponent from './QuestionComponent';
import { useSearchParams } from 'react-router-dom';

const QuestionLayout = () => {

  const questions = [
    "What is your name?",
    "Describe your experience with React.",
    "What is Tailwind CSS?",
    "Explain the difference between REST and GraphQL.",
    "How do you optimize a React application?",
    "What are the new features in ES6?",
    // Add more questions as needed
  ];

  return (
    <div className="flex flex-col lg:flex-row pt-32"> {/* Added padding-top */}
      <div className="w-full lg:w-1/3 p-4 overflow-y-auto h-96 bg-white shadow-md rounded mb-4 lg:mb-0 lg:mr-4">
        <h2 className="text-xl font-bold mb-4">Saved Questions</h2>
        <ul>
          {questions.map((question, index) => (
            <li key={index} className="p-2 border-b border-gray-300">
              {question}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full lg:w-2/3 p-4 bg-white shadow-md rounded">
        <QuestionComponent/>
      </div>
    </div>
  );
};

export default QuestionLayout;

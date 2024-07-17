import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Question = () => {
  const location = useLocation();
  const { questions } = location.state || {};
  console.log(questions);
  const [selectedValues, setSelectedValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (questionIndex, value) => {
    setSelectedValues({ ...selectedValues, [questionIndex]: value });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="relative flex flex-col md:flex-row justify-center items-start min-h-screen bg-gray-100 p-4">
      <div className="md:sticky md:top-4 md:mr-8 bg-gray-200 p-4 rounded-lg z-10 w-full max-w-xs mb-4 md:mb-0">
        <h2 className="text-lg font-bold">Summary</h2>
        <p className="text-sm">This is the summary text below the heading.</p>
      </div>
      <div className="flex flex-col p-4 bg-white text-black rounded-lg shadow-lg w-full max-w-2xl">
        {questions.map((q, index) => (
          <div key={index} className="mb-8 w-full">
            <div className="flex items-center justify-between mb-2 w-full">
              <div className="text-lg font-extrabold text-gray-800">{q.question}</div>
              <div className="bg-black text-white p-1 rounded text-xs font-semibold">Question {index + 1}</div>
            </div>
            <div className="flex flex-col w-full">
              {q.options.map((option, optIndex) => (
                <div key={optIndex}>
                  <input
                    type="radio"
                    id={`q${index}-value-${optIndex}`}
                    name={`quiz-${index}`}
                    value={option}
                    className="hidden"
                    onChange={() => handleChange(index, option)}
                  />
                  <label
                    htmlFor={`q${index}-value-${optIndex}`}
                    className={`flex bg-white p-3 mt-2 text-sm font-semibold rounded-lg cursor-pointer border ${selectedValues[index] === option ? 'border-red-500 text-red-500' : 'border-gray-200'}`}
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
            {submitted && (
              <div className={`mt-2 font-semibold text-xs transition-all ${selectedValues[index] === q.answer ? 'text-green-500 flex' : 'hidden'}`}>
                Success!
              </div>
            )}
            {submitted && selectedValues[index] && selectedValues[index] !== q.answer && (
              <div className={`mt-2 font-semibold text-xs transition-all text-red-500 flex`}>
                Error! The correct answer is {q.answer}.
              </div>
            )}
          </div>
        ))}
        
        <button
          onClick={handleSubmit}
          className="mt-4 p-2 bg-blue-500 text-white rounded-lg font-semibold"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Question;

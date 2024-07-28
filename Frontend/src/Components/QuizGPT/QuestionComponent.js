import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SaveQuizModal from './SaveWindow'; // Import the modal component

const QuestionComponent = ({ quizData }) => {
  const location = useLocation();
  let { questions } = location.state || {};
  const { isQuestion } = location.state || {};

  if (quizData) {
    questions = quizData.quizQuestions;
  }

  // State variables
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preciseQuestion, setPreciseQuestion] = useState();

  // Retrieve user profile from local storage
  const user = JSON.parse(localStorage.getItem("profile-prepGPT"));

  // Handle next button click
  const handleNext = () => {
    // Show warning if no answer is selected
    if (!userAnswers[currentQuestionIndex]) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
      // Move to the next question or show results if it's the last question
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowResults(true);
      }
    }
  };

  // Handle checkbox change for bookmarking questions
  const handleCheckboxChange = (question) => {
    setPreciseQuestion(question);
    setIsChecked(!isChecked);
    setIsModalOpen(true); // Open the modal
  };

  // Handle answer change
  const handleAnswerChange = (e) => {
    setUserAnswers({
      ...userAnswers,
      [currentQuestionIndex]: e.target.value,
    });
    setShowWarning(false); // Reset warning when user inputs an answer
  };

  // Calculate score based on user answers
  const calculateScore = () => {
    return questions.reduce((score, question, index) => {
      if (question.answer === userAnswers[index]) {
        return score + 1;
      }
      return score;
    }, 0);
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Render the question component
  return questions && questions.length != 0 ? (
    <>
      {isQuestion !== 'false' ? (
        <div className={`flex items-center justify-center p-6 rounded-lg max-w-md w-full ${isModalOpen ? 'bg-opacity-90 backdrop-blur-sm' : 'bg-opacity-100'}`}>
          {!showResults ? (
            <div className="w-full">
              <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">
                  Question {currentQuestionIndex + 1}:
                </h2>
                <p className="text-lg">{questions[currentQuestionIndex].question}</p>
              </div>

              <div className="flex flex-col mb-4">
                {questions[currentQuestionIndex].options.map((option, index) => (
                  <label key={index} className="mb-2">
                    <input
                      type="radio"
                      name={`question-${currentQuestionIndex}`}
                      value={option}
                      onChange={handleAnswerChange}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>

              <div className="flex justify-end space-x-4 mb-4">
                {user && (
                  <div className="relative cursor-pointer flex items-center justify-center">
                    <input
                      type="checkbox"
                      id="checkboxInput"
                      className="hidden"
                      checked={isChecked}
                      onChange={() => handleCheckboxChange(questions[currentQuestionIndex])}
                    />
                    <label
                      htmlFor="checkboxInput"
                      className="bookmark relative flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 384 512"
                        className="svgIcon h-8"
                      >
                        <path
                          d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"
                          className={`fill-current ${isChecked ? 'text-green-600' : 'text-gray-600'}`}
                        />
                      </svg>
                      <span
                        className={`absolute text-white font-bold ${isChecked ? 'text-xs top-1' : 'text-xl top-0'}`}
                      >
                        {isChecked ? '\u2713' : '\u002B'}
                      </span>
                      <span
                        className={`absolute w-2 h-2 bg-green-700 rounded-full z-[-1] ${isChecked ? 'animate-puff-out-center' : ''}`}
                      ></span>
                    </label>
                  </div>
                )}

                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Next
                </button>
              </div>
              {showWarning && (
                <div className="flex items-center p-3 bg-red-500 text-white rounded-lg shadow-md w-80">
                  <div className="mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#fff"
                        d="M13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex-1 font-medium text-sm">
                    Please give the answer
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full">
              <h2 className="text-xl font-bold mb-4">Quiz Results</h2>
              <p className="text-lg mb-4">
                Your Score: {calculateScore()} / {questions.length}
              </p>
              <div>
                {questions.map((question, index) => (
                  <div key={index} className="mb-4">
                    <p className="text-lg">
                      {index + 1}. {question.question}
                    </p>
                    <p
                      className={`text-sm ${
                        question.answer === userAnswers[index]
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                      Your Answer: {userAnswers[index]}
                    </p>
                    {question.answer !== userAnswers[index] && (
                      <p className="text-sm text-blue-500">
                        Correct Answer: {question.answer}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>no quiz</div>
      )}
      
      <SaveQuizModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        savedQuizzes={preciseQuestion} // Pass saved quizzes to modal
      />
    </>
  ) : (
    <div>Loading...</div>
  );
};

export default QuestionComponent;

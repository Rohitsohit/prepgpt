import React, { useState, useEffect } from 'react';
import QuestionComponent from './QuestionComponent';
import axios from 'axios';

// Backend URL
let backend = 'http://localhost:8000';

const QuestionLayout = () => {
  // State variables
  const [QuizTitles, setQuizTitles] = useState([]);
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const user = JSON.parse(localStorage.getItem("profile-prepGPT"));

  // Fetch quiz titles when the component mounts and user is available
  useEffect(() => {
    if (user) {
      fetchTitles();
    }
  }, []);

  // Fetch existing quiz titles from the backend
  const fetchTitles = async () => {
    try {
      const response = await axios.get(`${backend}/gpt/getallquiz`, {
        params: {
          username: user.username
        }
      });
      setQuizTitles(response.data.quizTitles || []);
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Fetch a specific quiz from the backend
  const fetchQuiz = async (titleToRetrieve, username) => {
    try {
      if (user) {
        const res = await axios.post(`${backend}/gpt/get-quiz`, { titleToRetrieve, username });
       
        const parsedQuizData = res.data.quizQuestions.map(question => JSON.parse(question.question));
        setQuizData(parsedQuizData);
         // Update the state with the fetched quiz data
      } else {
        console.log("Please log in");
      }
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };

  // Handle click on a quiz title to fetch its questions
  const handleQuestionClick = (title) => {
    fetchQuiz(title, user.username);
  };

  // Render the layout
  return (
    <div className="relative flex justify-center items-center min-h-screen bg-animation">
      <div className="flex flex-col lg:flex-row w-full lg:w-3/4 px-4">
        <div className="w-full lg:w-2/5 p-4 overflow-y-auto h-96 bg-white bg-opacity-85 shadow-md rounded mb-4 lg:mb-0 lg:mr-4">
          <h2 className="text-xl font-bold mb-4">Saved Questions</h2>
          {user ? (
            loading ? (
              <p>Loading...</p>
            ) : (
              <ul>
                {QuizTitles.map((title, index) => (
                  <li key={index} onClick={() => handleQuestionClick(title)} className="p-2 border-b border-gray-300 cursor-pointer">
                    {title}
                  </li>
                ))}
              </ul>
            )
          ) : (
            <p>Need to login to get the saved questions</p>
          )}
        </div>
        <div className="w-full lg:w-3/5 p-4 h-96 overflow-y-auto bg-white bg-opacity-85 shadow-md rounded">
          <QuestionComponent quizData={quizData} />
        </div>
      </div>
    </div>
  );
};

export default QuestionLayout;

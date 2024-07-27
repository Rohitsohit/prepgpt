import React, { useState,useEffect } from 'react';
import QuestionComponent from './QuestionComponent';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
let backend = 'http://localhost:8000';
const QuestionLayout = () => {

  const [QuizTitles, setQuizTitles] = useState([]);
  
  const user=JSON.parse(localStorage.getItem("profile-prepGPT"))
  console.log(user.username)
  useEffect(() => {
    
    fetchTitles();
    
  }, [])

  const fetchTitles = async () => {
    try {
     

      const response = await axios.get(`${backend}/gpt/getallquiz`, {
        params: {
          username: user.username
        }
      });
      
      setQuizTitles(response.data.
        quizTitles
         || []);
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };

  
  const fetchQuiz = async (titleToRetrieve,username)=>{
    try {
      const res = await axios.post(`${backend}/gpt/get-quiz`, {titleToRetrieve,username});
     console.log(res.data)
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  }

  const handleQuestionClick = (title)=>{
      console.log(title)
      fetchQuiz(title,user.username)
  }


  return (
    <div className="flex flex-col lg:flex-row pt-32"> {/* Added padding-top */}
      <div className="w-full lg:w-1/3 p-4 overflow-y-auto h-96 bg-white shadow-md rounded mb-4 lg:mb-0 lg:mr-4">
        <h2 className="text-xl font-bold mb-4">Saved Questions</h2>
        <ul>
          {QuizTitles.map((title, index) => (
            <li key={index} onClick={()=>handleQuestionClick(title)} className="p-2 border-b border-gray-300">
              {title}
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

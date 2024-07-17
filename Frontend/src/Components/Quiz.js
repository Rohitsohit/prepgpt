import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

let backend = "http://localhost:8000";

export default function Quiz() {
  const [numberOfQuizzes, setNumberOfQuizzes] = useState('');
  const [fileUploaded, setFileUploaded] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [quizLoading, setQuizLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadstart = () => {
        setUploadProgress(0);
      };
      reader.onprogress = (data) => {
        if (data.lengthComputable) {
          const progress = Math.round((data.loaded / data.total) * 100);
          setUploadProgress(progress);
        }
      };
      reader.onloadend = () => {
        setFileUploaded(true);
        sendCustomData(reader.result);
      };
      reader.readAsText(file);
    }
  };

  const handleQuizNumberChange = (e) => {
    setNumberOfQuizzes(e.target.value);
  };

  const sendCustomData = async (customData) => {
    if (customData) {
      const response = await fetch(`${backend}/api/custom-data`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: customData })
      });
      const data = await response.json();
    } else {
      console.log('custom data is empty');
    }
    console.log(customData);
  };

  const handleSubmit = async () => {
    setQuizLoading(true);
    try {
      const quizResponse = await axios.post(`${backend}/api/quiz`, {
        numberOfQuestions: numberOfQuizzes,
      });
      console.log(quizResponse.data.jsonData);
      navigate('/quiz-question', { state: { questions: quizResponse.data.jsonData } });
    } catch (error) {
      console.error('Error uploading file or generating quiz:', error);
    } finally {
      setQuizLoading(false);
    }
  };

  return (  
    <div className="flex items-center justify-center min-h-screen">
    <div className="bg-white/80 p-12 rounded-3xl shadow-md w-full max-w-xl border border-gray-100 backdrop-blur-lg">
      {quizLoading ? (
        <div className="flex justify-center items-center space-x-2">
          <div className="w-5 h-5 bg-purple-600 rounded-full animate-bounce"></div>
          <div className="w-5 h-5 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-5 h-5 bg-green-600 rounded-full animate-bounce"></div>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center h-full mb-6">
            <label className="flex flex-col items-center px-6 py-8 bg-white rounded-lg shadow-lg tracking-wide uppercase border border-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white text-blue-600 ease-linear transition-all duration-150">
              <svg
                className="w-10 h-10"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16.88 11.74a1 1 0 00-.68-.74l-3.45-.86-1.55-3.1a1 1 0 00-1.8 0l-1.55 3.1-3.45.86a1 1 0 00-.68.74 1 1 0 00.18.87l2.5 2.44-.58 3.43a1 1 0 001.45 1.05L10 17.57l3.09 1.63a1 1 0 001.45-1.05l-.58-3.43 2.5-2.44a1 1 0 00.18-.87zM10 14.45V6a1 1 0 10-2 0v8.45l-2.17-1.14-.5 3a1 1 0 001.45 1.05L10 17.57l2.22 1.16a1 1 0 001.45-1.05l-.5-3L10 14.45z" />
              </svg>
              <span className="mt-4 text-lg leading-normal">Upload File</span>
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quizNumber">
              Number of quizzes to generate
            </label>
            <input
              type="number"
              id="quizNumber"
              className="border border-gray-300 p-2 rounded w-full"
              placeholder="Enter the number of quiz you want to practice"
              value={numberOfQuizzes}
              onChange={handleQuizNumberChange}
            />
          </div>
          <div>
            <button
              className="bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700 transition-all duration-150"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  </div>
    
  );
}

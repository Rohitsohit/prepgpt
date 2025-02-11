import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Backend URL
let backend = "http://localhost:8000";

export default function Quiz() {
  // State variables
  const [numberOfQuizzes, setNumberOfQuizzes] = useState('');
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileName, setFileName] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [quizLoading, setQuizLoading] = useState(false);
  const [difficulty, setDifficulty] = useState('Easy');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("profile-prepGPT"));

  // Handle file upload and read its content
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
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

  // Handle changes in the number of quizzes input
  const handleQuizNumberChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value <= 5) {
      setNumberOfQuizzes(value);
      setErrorMessage('');
    } else {
      setErrorMessage('The number of quizzes cannot exceed 5.');
    }
  };

  // Handle changes in the difficulty selection
  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  // Send custom data to the backend
  const sendCustomData = async (customData) => {
    if (customData) {
      try {
        const response = await fetch(`${backend}/gpt/upload-data`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: customData }),
        });
      } catch (error) {
        console.error('Error uploading custom data:', error);
      }
    } else {
      console.log('Custom data is empty');
    }
  };

  // Handle form submission to generate quiz
  const handleSubmit = async () => {
    if (numberOfQuizzes > 5) {
      setErrorMessage('The number of quizzes cannot exceed 5 as limited api usage.');
      return;
    }
    setQuizLoading(true);

    // Example questions, replace this with the actual backend call
    let questions = [
      {
        question: 'Which two world powers were not initially involved in World War I but had a significant impact when they joined the conflict?',
        options: [
          'China and Japan',
          'United States and Soviet Union',
          'India and Brazil',
          'Canada and Australia'
        ],
        answer: 'United States and Soviet Union'
      },
      {
        question: 'True or False: World War I ended solely with the signing of the Treaty of Versailles?',
        options: ['True', 'False'],
        answer: 'False',
        explanation: "While the Treaty of Versailles was a significant document that officially ended the war with Germany, it's important to note that multiple treaties and agreements were signed with other Central Powers, such as the Treaty of Saint-Germain with Austria, the Treaty of Trianon with Hungary, and the Treaty of Sèvres (later replaced by the Treaty of Lausanne) with the Ottoman Empire."
      },
    ];

    try {
      // Uncomment and use the following code when backend is ready
      // const quizResponse = await axios.post(`${backend}/gpt/quiz`, {
      //   numberOfQuestions: numberOfQuizzes,
      //   difficulty: difficulty,
      // });
      // navigate('/quiz-question', { state: { questions: quizResponse.data.jsonData } });

      navigate('/quiz-question', { state: { questions: questions } });
    } catch (error) {
      console.error('Error generating quiz:', error);
    } finally {
      setQuizLoading(false);
    }
  };

  // Navigate to saved questions
  const handleAccessSavedQuestions = () => {
    navigate('/quiz-question', { state: { isQuestion: "false" } });
  };

  // Render the component
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white/80 p-6 rounded-3xl shadow-md w-full max-w-md border border-gray-100 backdrop-blur-lg">
        {quizLoading ? (
          <div className="flex justify-center items-center space-x-2">
            <div className="w-5 h-5 bg-purple-600 rounded-full animate-bounce"></div>
            <div className="w-5 h-5 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-5 h-5 bg-green-600 rounded-full animate-bounce"></div>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center h-full mb-6">
              <label className="flex flex-col items-center px-4 py-6 bg-white rounded-lg shadow-lg tracking-wide uppercase border border-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white text-blue-600 ease-linear transition-all duration-150">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M16.88 11.74a1 1 0 00-.68-.74l-3.45-.86-1.55-3.1a1 1 0 00-1.8 0l-1.55 3.1-3.45.86a1 1 0 00-.68.74 1 1 0 00.18.87l2.5 2.44-.58 3.43a1 1 0 001.45 1.05L10 17.57l3.09 1.63a1 1 0 001.45-1.05l-.58-3.43 2.5-2.44a1 1 0 00.18-.87zM10 14.45V6a1 1 0 10-2 0v8.45l-2.17-1.14-.5 3a1 1 0 001.45 1.05L10 17.57l2.22 1.16a1 1 0 001.45-1.05l-.5-3L10 14.45z" />
                </svg>
                <span className="mt-2 text-sm leading-normal">Upload File</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
              {fileName && <p className="mt-2 text-sm text-gray-600">{fileName}</p>}
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
              {errorMessage && (
                <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
              )}
            </div>
            <div className="mb-5">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="difficulty">
                Select Difficulty
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="difficulty"
                    value="Easy"
                    checked={difficulty === 'Easy'}
                    onChange={handleDifficultyChange}
                    className="form-radio"
                  />
                  <span className="ml-2">Easy</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="difficulty"
                    value="Medium"
                    checked={difficulty === 'Medium'}
                    onChange={handleDifficultyChange}
                    className="form-radio"
                  />
                  <span className="ml-2">Medium</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="difficulty"
                    value="Hard"
                    checked={difficulty === 'Hard'}
                    onChange={handleDifficultyChange}
                    className="form-radio"
                  />
                  <span className="ml-2">Hard</span>
                </label>
              </div>
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
      {user && (
        <button
          className="bg-green-600 text-white p-2 rounded mt-4 hover:bg-green-700 transition-all duration-150"
          onClick={handleAccessSavedQuestions}
        >
          Access Saved Questions
        </button>
      )}
    </div>
  );
}

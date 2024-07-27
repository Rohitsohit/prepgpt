import React, { useState, useEffect } from 'react';
import axios from 'axios';
let backend = 'http://localhost:8000';

const SaveQuizModal = ({ isOpen, onClose, savedQuizzes }) => {
  const [selectedTitle, setSelectedTitle] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [quizTitles, setQuizTitles] = useState([]);

  const user=JSON.parse(localStorage.getItem("profile-prepGPT"))

  useEffect(() => {
    if (isOpen) {
      setSelectedTitle('');
      setNewTitle('');
      setTermsAccepted(false);
      fetchTitles();
    }
  }, [isOpen]);

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

  if (!isOpen) return null;

  const handleSave = async () => {
    
    if (termsAccepted) {
      const titleToSave = selectedTitle === 'new' ? newTitle : selectedTitle;
        
      try {
        await axios.post(`${backend}/gpt/save-quiz`, {titleToSave, savedQuizzes});
        setSelectedTitle('');
        setNewTitle('');
        setTermsAccepted(false);
        onClose();
      } catch (error) {
        console.error('Error saving quiz:', error);
      }
    } else {
      alert('Please accept the terms of use to save the quiz.');
    }
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectedTitle(value);

    if (value !== 'new') {
      setNewTitle('');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="w-80 rounded-2xl bg-white">
        <div className="flex flex-col gap-2 p-8">
          <select
            value={selectedTitle}
            onChange={handleSelectChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-100 mb-4"
          >
            <option value="" disabled>Select a saved quiz</option>
            {quizTitles.map((quiz, index) => (
              <option key={index} value={quiz}>{quiz}</option>
            ))}
            <option value="new">Create New Quiz</option>
          </select>
          {selectedTitle === 'new' && (
            <input
              placeholder="Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-100 mb-4"
            />
          )}
          <label className="flex cursor-pointer items-center justify-between p-1">
            Accept terms of use
            <div className="relative inline-block">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
                className="peer h-6 w-12 cursor-pointer appearance-none rounded-full border border-gray-300 bg-white checked:border-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
              />
              <span className="pointer-events-none absolute left-1 top-1 block h-4 w-4 rounded-full bg-gray-400 transition-all duration-200 peer-checked:left-7 peer-checked:bg-gray-900"></span>
            </div>
          </label>
          <button
            onClick={handleSave}
            className="inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="mt-2 inline-block cursor-pointer rounded-md bg-gray-500 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 active:scale-95"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveQuizModal;

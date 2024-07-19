import React, { useState } from "react";

let backend = 'http://localhost:8000';

export default function CustomGPT() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [fileUploaded, setFileUploaded] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [chatStarted, setChatStarted] = useState(false);
  const [messageLoading, setMessageLoading] = useState(false);

  const sendMessage = async () => {
    setMessages((prevMessages) => [...prevMessages, { user: 'User', text: message }]);
    setMessageLoading(true);
    setMessages((prevMessages) => [...prevMessages, { user: 'Loading', text: '...' }]);

    try {
      const response = await fetch(`${backend}/gpt/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message }),
      });

      const data = await response.json();

      setMessages((prevMessages) =>
        prevMessages.slice(0, -1).concat({ user: 'Bot', text: data.message })
      );
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prevMessages) => prevMessages.slice(0, -1));
    } finally {
      setMessage("");
      setMessageLoading(false);
    }
  };

  const sendCustomData = async (customData) => {
    const response = await fetch(`${backend}/gpt/upload-data`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: customData }),
    });
    const data = await response.json();
    setMessages((prevMessages) => [...prevMessages, { user: 'Bot', text: data.message }]);
  };

  const handleUploadFile = (event) => {
    const file = event.target.files[0];

    if (file.type === 'application/pdf') {
      extractTextFromPDF(file);
    } else if (file.type === 'text/plain') {
      extractTextFromTXT(file);
    } else {
      alert('Unsupported file type');
    }
  };

  const extractTextFromPDF = (file) => {
    // Your code for extracting text from PDF goes here
    simulateProgress();
  };

  const extractTextFromTXT = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadstart = () => {
        setUploadProgress(0);
        simulateProgress();
      };
      reader.onloadend = () => {
        setFileUploaded(true);
        sendCustomData(reader.result);
      };
      reader.readAsText(file);
    }
  };

  const simulateProgress = () => {
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 15;
      });
    }, 50); // Adjust the interval duration to control the speed of the progress
  };

  const handleStartChat = () => {
    setChatStarted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-900">
      {!chatStarted ? (
        <div className="flex flex-col items-center justify-center h-full">
          <label className="flex flex-col items-center px-6 py-8 bg-white rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-700 hover:text-white text-blue-700 ease-linear transition-all duration-150 text-lg">
            <svg
              className="w-12 h-12"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M16.88 11.74a1 1 0 00-.68-.74l-3.45-.86-1.55-3.1a1 1 0 00-1.8 0l-1.55 3.1-3.45.86a1 1 0 00-.68.74 1 1 0 00.18.87l2.5 2.44-.58 3.43a1 1 0 001.45 1.05L10 17.57l3.09 1.63a1 1 0 001.45-1.05l-.58-3.43 2.5-2.44a1 1 0 00.18-.87zM10 14.45V6a1 1 0 10-2 0v8.45l-2.17-1.14-.5 3a1 1 0 001.45 1.05L10 17.57l2.22 1.16a1 1 0 001.45-1.05l-.5-3L10 14.45z" />
            </svg>
            <span className="mt-4 text-lg leading-normal">Upload File</span>
            <input type="file" className="hidden" onChange={handleUploadFile} />
          </label>
          {uploadProgress > 0 && (
            <div className="w-full bg-gray-200 rounded-full mt-6">
              <div
                className="bg-blue-500 text-sm leading-none py-2 text-center text-white rounded-full transition-all duration-500"
                style={{ width: `${uploadProgress}%` }}
              >
                {uploadProgress}%
              </div>
            </div>
          )}
          <div className={`transition-opacity duration-500 mt-6 ${uploadProgress === 100 ? 'opacity-100' : 'opacity-0'}`}>
            <button
              onClick={handleStartChat}
              className="p-6 bg-blue-500 text-white rounded-lg text-lg"
            >
              Start the chat
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full max-w-4xl h-full p-4 bg-gray-100 rounded shadow-lg">
          <div className="flex flex-col flex-grow h-96 p-4 overflow-y-auto bg-gray-100 rounded">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.user === "User" ? "justify-end" : "justify-start"} mb-2`}
              >
                {msg.user === "Loading" ? (
                  <div className="flex justify-center mb-2">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <div
                    className={`${
                      msg.user === "User" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
                    } p-2 rounded max-w-xs`}
                  >
                    {msg.text}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 flex">
            <input
              type="text"
              className="flex-grow p-2 border border-gray-300 rounded"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={sendMessage} className="ml-2 p-2 bg-blue-500 text-white rounded">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

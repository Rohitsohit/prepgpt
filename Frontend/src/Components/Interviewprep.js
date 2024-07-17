import React, { useState } from 'react'

export default function Interviewprep() {

  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    setFileName(e.target.files[0].name);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col sm:flex-row bg-gray-200 p-6 rounded-lg shadow-lg mb-6 max-w-3xl w-full">
        <div className="bg-white p-6 m-2 rounded-lg shadow-md relative transition duration-300 max-w-xs w-full">
          <div className="text-center">
            <span className="text-xl font-semibold">Upload your Resume here</span>
            <p className="mt-2">Select a resume to upload from your computer or device.</p>
          </div>
          <div className="mt-4 flex items-center justify-center">
            <label htmlFor="file" className="cursor-pointer bg-transparent border-dashed border-2 border-gray-500 p-2 w-full text-center">
              Choose File
              <input hidden type="file" id="file" onChange={handleFileChange} />
            </label>
          </div>
          {fileName && (
            <div className="mt-4 bg-blue-100 flex items-center relative rounded-lg p-2">
              <p className="font-light">{fileName}</p>
              <span className="absolute top-1 right-2 flex items-center justify-center bg-gray-800 h-8 w-8 rounded-full text-white font-bold cursor-pointer" onClick={() => setFileName('')}>
                X
              </span>
            </div>
          )}
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6 m-2 shadow-md max-w-md w-full">
          <h1 className="text-center text-slate-600 text-xl font-bold mb-2">Job Description</h1>
          <textarea
            placeholder="Paste your job description here"
            className="bg-slate-100 text-slate-600 h-28 placeholder:text-slate-600 placeholder:opacity-50 border border-slate-200 w-full resize-none outline-none rounded-lg p-2 duration-300 focus:border-slate-600"
          ></textarea>
        </div>
      </div>
      <button className="bg-blue-500 text-white rounded-lg p-3 text-lg transition duration-300 hover:bg-blue-600">
        Submit
      </button>
    </div>
  )
}

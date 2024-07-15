import React, { useState } from 'react';
import axios from 'axios';

export default function AuthForm() {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

const handleSubmit =async (e)=>{
    if(isSignup){
        e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/signup', { username, password });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
    }else{
        e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/login', { username, password });
      // Save token to localStorage or state
    } catch (err) {
      console.error(err);
    }
    }
}





  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          {isSignup ? 'Sign Up' : 'Sign In'}
        </h2>
        <form className="mt-8 space-y-6">
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              onChange={(e)=>setUsername(e.target.value)}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={(e)=>setPassword(e.target.value)}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          {isSignup && (
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          )}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleSubmit}
            >
              {isSignup ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
          <div className="flex items-center justify-center mt-4">
            <button
              type="button"
              onClick={toggleForm}
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

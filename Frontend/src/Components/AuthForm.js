// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export default function AuthForm() {
//   let backend = "http://localhost:8000/";
//   const navigate = useNavigate();
//   const [isSignup, setIsSignup] = useState(false);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (isSignup) {
//       if (password.length < 7) {
//         setErrorMessage('Password must be at least 7 characters long');
//         return;
//       }
//       if (password !== confirmPassword) {
//         setErrorMessage('Passwords do not match');
//         return;
//       }
//     }
//     setLoading(true);
//     const url = isSignup ? `${backend}auth/signup` : `${backend}auth/signin`;
//     try {
//       const res = await axios.post(url, { username, password });
//       localStorage.setItem("profile-prepGPT", JSON.stringify({ username: res.data.username }));
//       setErrorMessage(''); // Clear any previous error messages
//       setLoading(false);
//       window.location.reload(); // Refresh the page
//       navigate('/'); // Redirect to home page
//     } catch (err) {
//       setErrorMessage(err.response.data.message || 'An error occurred');
//       setLoading(false);
//     }
//   };

//   const toggleForm = () => {
//     setIsSignup(!isSignup);
//     setErrorMessage(''); // Clear any error messages when toggling forms
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-transparent">
//       <div className="w-full max-w-md p-8 space-y-6 bg-white bg-opacity-90 rounded-lg shadow-md z-20">
//         <h2 className="text-2xl font-bold text-center text-gray-900">
//           {isSignup ? 'Sign Up' : 'Sign In'}
//         </h2>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="relative">
//             <div className="relative">
//               <input
//                 placeholder='username'
//                 className="w-full rounded-lg border-gray-300 p-4 pe-12 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
//                 id="username"
//                 type="text"
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//             </div>
//           </div>
//           <div className="relative">
//             <div className="relative">
//               <input
//                 placeholder='password'
//                 className="w-full rounded-lg border-gray-300 p-4 pe-12 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
//                 id="password"
//                 type={showPassword ? 'text' : 'password'}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <span className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer" onClick={togglePasswordVisibility}>
//                 <svg
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   className="h-6 w-6 text-gray-400"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                     strokeWidth="2"
//                     strokeLinejoin="round"
//                     strokeLinecap="round"
//                   ></path>
//                   <path
//                     d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                     strokeWidth="2"
//                     strokeLinejoin="round"
//                     strokeLinecap="round"
//                   ></path>
//                 </svg>
//               </span>
//             </div>
//           </div>
//           {isSignup && (
//             <div className="relative">
//               <div className="relative">
//                 <input
//                   placeholder='confirm password'
//                   className="w-full rounded-lg border-gray-300 p-4 pe-12 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
//                   id="confirm-password"
//                   type={showConfirmPassword ? 'text' : 'password'}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   required
//                 />
//                 <span className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer" onClick={toggleConfirmPasswordVisibility}>
//                   <svg
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     className="h-6 w-6 text-gray-400"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                       strokeWidth="2"
//                       strokeLinejoin="round"
//                       strokeLinecap="round"
//                     ></path>
//                     <path
//                       d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                       strokeWidth="2"
//                       strokeLinejoin="round"
//                       strokeLinecap="round"
//                     ></path>
//                   </svg>
//                 </span>
//               </div>
//             </div>
//           )}
//           <div className="flex items-center justify-between">
//             <button
//               type="submit"
//               disabled={loading}
//               className={`inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white ${loading ? 'bg-gray-500' : 'bg-blue-600'} border border-transparent rounded-md shadow-sm ${loading ? '' : 'hover:bg-blue-500'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
//             >
//               {loading ? 'Loading...' : (isSignup ? 'Sign Up' : 'Sign In')}
//             </button>
//           </div>
//           {errorMessage && (
//             <div className="mt-2 text-sm font-medium text-red-600 text-center">
//               {errorMessage}
//             </div>
//           )}
//           <div className="flex items-center justify-center mt-4">
//             <button
//               type="button"
//               onClick={toggleForm}
//               className="text-sm font-medium text-blue-600 hover:underline"
//             >
//               {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

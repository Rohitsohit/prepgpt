import React from 'react';

export default function Home() {
  return (
   
      <section className="text-white body-font  bg-opacity-95">
        <div className="container mx-auto text-center py-28">
          <h2 className="text-4xl font-bold mb-12">Features</h2>
          <div className="flex flex-wrap justify-center -m-4">
            <div className="p-4 lg:w-1/3">
              <div className="h-full bg-gray-800 bg-opacity-75 border-2 border-gray-700 px-6 pt-8 pb-12 rounded-lg overflow-hidden text-center relative transition transform hover:-translate-y-2 hover:shadow-2xl">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">CATEGORY</h2>
                <h1 className="title-font sm:text-2xl text-xl font-medium text-white mb-3">CUSTOMGPT</h1>
                <p className="leading-relaxed mb-3 text-gray-300">Upload .txt or pdf file to have chat and get the custom information about the uploaded file</p>
                <a className="text-blue-400 inline-flex items-center" href='/customGPT'>Explore More
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7-7"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className="p-4 lg:w-1/3">
              <div className="h-full bg-gray-800 bg-opacity-75 border-2 border-gray-700 px-6 pt-8 pb-12 rounded-lg overflow-hidden text-center relative transition transform hover:-translate-y-2 hover:shadow-2xl">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">CATEGORY</h2>
                <h1 className="title-font sm:text-2xl text-xl font-medium text-white mb-3">QUIZGPT</h1>
                <p className="leading-relaxed mb-3 text-gray-300">Upload .txt or pdf file to generate the quiz by selecting the Difficulty levels and save the quiz to practice for later.</p>
                <a className="text-blue-400 inline-flex items-center" href='/quiz'>Explore More
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7-7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
  
  );
}

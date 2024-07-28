import React from 'react';

export default function Home() {
  return (
    <div className="relative">
  <section className="text-white body-font">
    <div className="container px-5 py-28 mx-auto text-center">
      <h2 className="text-4xl mb-12">Features</h2>
      <div className="flex flex-wrap -m-4 ml-8">
        <div className="p-4 lg:w-1/3">
          <div className="h-full bg-transparent border-2 border-gray-300 px-6 pt-8 pb-12 rounded-lg overflow-hidden text-center relative">
            <h2 className="tracking-widest text-xs title-font font-medium text-gray-300 mb-1">CATEGORY</h2>
            <h1 className="title-font sm:text-2xl text-xl font-medium text-white mb-3">CUSTOMGPT</h1>
            <p className="leading-relaxed mb-3 text-gray-200">Upload .txt or pdf file to have chat and get the custom information about the uploaded file</p>
            <a className="text-blue-400 inline-flex items-center" href='/customGPT'>Explore More
              <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
        <div className="p-4 lg:w-1/3">
          <div className="h-full bg-transparent border-2 border-gray-300 px-6 pt-8 pb-12 rounded-lg overflow-hidden text-center relative">
            <h2 className="tracking-widest text-xs title-font font-medium text-gray-300 mb-1">CATEGORY</h2>
            <h1 className="title-font sm:text-2xl text-xl font-medium text-white mb-3">QUIZGPT</h1>
            <p className="leading-relaxed mb-3 text-gray-200">Upload .txt or pdf file to genrate the quiz by selecting the Difficulty levels and save the quiz to practice for later.</p>
            <a className="text-blue-400 inline-flex items-center" href='/quiz'>Explore More
              <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
        <div className="p-4 lg:w-1/3">
          <div className="h-full bg-transparent border-2 border-gray-300 px-6 pt-8 pb-12 rounded-lg overflow-hidden text-center relative">
            <h2 className="tracking-widest text-xs title-font font-medium text-gray-300 mb-1">CATEGORY</h2>
            <h1 className="title-font sm:text-2xl text-xl font-medium text-white mb-3">Selvage Poke Waistcoat Godard</h1>
            <p className="leading-relaxed mb-3 text-gray-200">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
            <a className="text-blue-400 inline-flex items-center">Explore More
              <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>









  );
}

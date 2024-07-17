import React from 'react';
import Navbar from './Navbar'; // Adjust the path if needed
import BackgroundAnimation from './BackgroundAnimation'; // Adjust the path if needed

export default function Layout({ children }) {
  return (
    <div>
      <BackgroundAnimation />
      <Navbar />
      <main className="relative z-10">{children}</main>
    </div>
  );
}

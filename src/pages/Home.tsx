import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/netflix-hero.jpg')` }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-70" />
      {/* Hero Text */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 animate-fade-in">
        <h1 className="text-5xl font-bold mb-6">Ticket Pulse Admin Portal</h1>
        <p className="text-xl mb-8 max-w-xl">Secure access to your cinema’s dashboard. Manage shows, track sales, and analyze audience data with real-time insights.</p>
        <div className="flex space-x-4">
          <Link to="/login" className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded text-lg font-semibold">Get Started</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

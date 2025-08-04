import React from 'react';
import { Link } from 'react-router-dom';
import nexintelLogo from '../assets/nexintel.jpg'; // Assuming you have a logo in assets

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <img src={nexintelLogo} alt="Nexintel AI Logo" className="h-10 mr-3" />
          <span className="text-2xl font-bold text-gray-800">Nexintel AI</span>
        </div>
        <nav>
          <Link to="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
            Register
          </Link>
          <Link to="/login" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
            Login
          </Link>
        </nav>
      </header>
      <main className="container mx-auto mt-10 p-6 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Welcome to Nexintel AI Legal Summarizer
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Your intelligent partner for legal document analysis and summarization.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/register" className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-xl">
            Get Started
          </Link>
          <Link to="/login" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg text-xl">
            Existing User? Login
          </Link>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
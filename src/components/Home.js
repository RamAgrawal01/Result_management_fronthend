// Home.js
import React from 'react';
import { Link } from 'react-router-dom';



const Home = ({ onAdminClick }) => {

    
  return (
    <div className="home-container flex flex-col items-center justify-center min-h-screen bg-yellow-100">
      <h1 className="text-3xl font-bold mb-6 text-black">Welcome to Torned Education Online Results</h1>
      <div className="space-y-4">
        <Link to="/student" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Student Result
        </Link>
        <button onClick={onAdminClick} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
          Admin Panel
        </button>
      </div>
    </div>
  );
};

export default Home;

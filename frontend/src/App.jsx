import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow text-center">
        <h2 className="text-2xl mb-4">Welcome to the Quiz Platform</h2>
        <p className="mb-4">Test your knowledge with our quizzes or create your own if you're an admin!</p>
        <Link to="/dashboard" className="bg-blue-500 text-white px-4 py-2 rounded">Go to Dashboard</Link>
      </div>
    </div>
  );
};

export default App;
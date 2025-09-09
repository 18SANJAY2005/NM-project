import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Navbar from './Navbar';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await api.get('/api/quizzes');
        setQuizzes(response.data);
      } catch (err) {
        setError('Error fetching quizzes');
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-2xl mb-4">Available Quizzes</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {user.role === 'ADMIN' && (
          <Link to="/create-quiz" className="bg-green-500 text-white px-4 py-2 rounded mb-4 inline-block">
            Create New Quiz
          </Link>
        )}
        <Link to="/results" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block ml-4">
          View Results
        </Link>
        <div className="grid gap-4">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="p-4 border rounded">
              <h3 className="text-xl">{quiz.title}</h3>
              <Link to={`/quiz/${quiz.id}`} className="text-blue-500">Take Quiz</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
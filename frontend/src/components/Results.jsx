import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from './Navbar';
import { AuthContext } from '../context/AuthContext';

const Results = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const endpoint = user.role === 'ADMIN' ? '/api/results/all' : '/api/results/my-results';
        const response = await api.get(endpoint);
        setResults(response.data);
      } catch (err) {
        setError('Error fetching results');
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [user]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-2xl mb-4">{user.role === 'ADMIN' ? 'All Results' : 'My Results'}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="grid gap-4">
          {results.length === 0 ? (
            <p>No results found.</p>
          ) : (
            results.map((result) => (
              <div key={result.id} className="p-4 border rounded">
                <p>Quiz ID: {result.quizId}</p>
                <p>User ID: {result.userId}</p>
                <p>Score: {result.score}%</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;
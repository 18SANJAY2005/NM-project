import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from './Navbar';
import { AuthContext } from '../context/AuthContext';

const Quiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await api.get(`/api/quizzes/${id}`);
        setQuiz(response.data);
      } catch (err) {
        setError('Error fetching quiz');
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [id]);

  const handleAnswer = useCallback((questionIndex, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!quiz) return;
    let calculatedScore = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctOption) {
        calculatedScore += 1;
      }
    });
    const finalScore = Math.round((calculatedScore / quiz.questions.length) * 100);
    try {
      await api.post('/api/results/submit', { quizId: id, score: finalScore });
      setScore(finalScore);
    } catch (err) {
      setError('Error submitting result');
    }
  }, [quiz, answers, id]);

  if (loading) return <p>Loading...</p>;
  if (!quiz) return <p>Quiz not found</p>;

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-2xl mb-4">{quiz.title}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {quiz.questions.map((question, qIndex) => (
          <div key={qIndex} className="mb-6">
            <p className="text-lg mb-2">{question.questionText}</p>
            {question.options.map((option, oIndex) => (
              <div key={oIndex} className="mb-2">
                <input
                  type="radio"
                  name={`question-${qIndex}`}
                  checked={answers[qIndex] === oIndex}
                  onChange={() => handleAnswer(qIndex, oIndex)}
                  className="mr-2"
                />
                {option}
              </div>
            ))}
          </div>
        ))}
        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit Quiz
        </button>
        {score !== null && <p className="mt-4">Your score: {score}%</p>}
      </div>
    </div>
  );
};

export default Quiz;
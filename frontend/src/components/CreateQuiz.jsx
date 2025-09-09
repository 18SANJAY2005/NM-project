import React, { useState, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from './Navbar';
import { AuthContext } from '../context/AuthContext';

const CreateQuiz = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ questionText: '', options: ['', '', '', ''], correctOption: 0 }]);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (user.role !== 'ADMIN') {
    navigate('/dashboard');
    return null;
  }

  const addQuestion = useCallback(() => {
    setQuestions((prev) => [...prev, { questionText: '', options: ['', '', '', ''], correctOption: 0 }]);
  }, []);

  const updateQuestion = useCallback((index, field, value) => {
    setQuestions((prev) => {
      const newQuestions = [...prev];
      newQuestions[index][field] = value;
      return newQuestions;
    });
  }, []);

  const updateOption = useCallback((qIndex, oIndex, value) => {
    setQuestions((prev) => {
      const newQuestions = [...prev];
      newQuestions[qIndex].options[oIndex] = value;
      return newQuestions;
    });
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.post('/api/quizzes', { title, questions });
      if (response.status === 200) {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Error creating quiz');
    }
  }, [title, questions, navigate]);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-2xl mb-4">Create Quiz</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Quiz Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
            required
          />
          {questions.map((question, qIndex) => (
            <div key={qIndex} className="mb-6 p-4 border rounded">
              <input
                type="text"
                placeholder="Question Text"
                value={question.questionText}
                onChange={(e) => updateQuestion(qIndex, 'questionText', e.target.value)}
                className="w-full mb-2 p-2 border rounded"
                required
              />
              {question.options.map((option, oIndex) => (
                <div key={oIndex} className="flex items-center mb-2">
                  <input
                    type="text"
                    placeholder={`Option ${oIndex + 1}`}
                    value={option}
                    onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                    className="w-full p-2 border rounded mr-2"
                    required
                  />
                  <input
                    type="radio"
                    name={`correct-${qIndex}`}
                    checked={question.correctOption === oIndex}
                    onChange={() => updateQuestion(qIndex, 'correctOption', oIndex)}
                  />
                </div>
              ))}
            </div>
          ))}
          <button type="button" onClick={addQuestion} className="bg-green-500 text-white px-4 py-2 rounded mb-4">
            Add Question
          </button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Create Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;
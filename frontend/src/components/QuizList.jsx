import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    api.get('/quizzes').then(res => setQuizzes(res.data));
  }, []);

  return (
    <div>
      <h2>Available Quizzes</h2>
      <ul>
        {quizzes.map(q => (
          <li key={q.id}>
            {q.title} - <Link to={`/take-quiz/${q.id}`}>Take Quiz</Link>
          </li>
        ))}
      </ul>
      <Link to="/results">View Results</Link>
    </div>
  );
}

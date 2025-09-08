import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';

export default function TakeQuiz() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/quizzes').then(res => {
      const q = res.data.find(item => item.id === id);
      setQuiz(q);
    });
  }, [id]);

  const handleSubmit = async () => {
    const result = { quizId: id, answers };
    const res = await api.post('/quiz-results', result);
    alert(res.data);
    navigate('/results');
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div>
      <h2>{quiz.title}</h2>
      {quiz.questions.map((q, idx) => (
        <div key={idx}>
          <p>{q.question}</p>
          {q.options.map((opt, i) => (
            <label key={i}>
              <input
                type="radio"
                name={`q${idx}`}
                value={opt}
                onChange={() => setAnswers({ ...answers, [q.question]: opt })}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

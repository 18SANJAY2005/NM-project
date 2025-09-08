import { useEffect, useState } from 'react';
import api from '../api/api';

export default function Results() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    api.get('/results').then(res => setResults(res.data));
  }, []);

  return (
    <div>
      <h2>Results</h2>
      <ul>
        {results.map((r, idx) => (
          <li key={idx}>
            Quiz: {r.quizId}, Answers: {JSON.stringify(r.answers)}, User: {r.userId}
          </li>
        ))}
      </ul>
    </div>
  );
}

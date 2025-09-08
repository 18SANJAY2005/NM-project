import { Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <h1>Quiz Platform</h1>
      <nav>
        <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
      </nav>
    </div>
  );
}

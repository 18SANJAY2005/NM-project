import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">Quiz Platform</Link>
      <div>
        {user ? (
          <>
            <span className="mr-4">Welcome, {user.username} ({user.role})</span>
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4 bg-green-500 px-4 py-2 rounded">Login</Link>
            <Link to="/register" className="bg-green-500 px-4 py-2 rounded">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';

const Logout = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('user'); // Clear user from local storage
    setUser(null); // Clear user from context
    navigate('/login'); // Redirect to login
  }, [setUser, navigate]);

  return <p>Logging out...</p>;
};

export default Logout;
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Perform logout action here (e.g., making an API call to the server to log out the user)
    // After logout, redirect the user to the login page
    navigate('/login');
  }, [navigate]);
  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  );
};

export default Logout;

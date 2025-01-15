import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendLoginRequest } from '../services/Api'; // API service function

function LoginPage() {
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendLoginRequest(name);
      if (response.success) {
        // Save partner's thermometer level in local storage or state
        localStorage.setItem('partnerThermometer', response.partnerThermometer);
        localStorage.setItem('userName', name);
        // Navigate to the dashboard
        navigate('/dashboard');
      } else {
        setError('Failed to log in. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please check your connection.');
    }
  };

  return (
    <div className="login-page">
      <h1>Welcome to the Thermometer App</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Enter Your Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default LoginPage;

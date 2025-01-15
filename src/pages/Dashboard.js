import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateThermometer } from '../services/Api'; // API service function
import Thermometer from '../components/Thermomether';

function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [myLevel, setMyLevel] = useState(5); // Default level for user's thermometer
  const [partnerLevel, setPartnerLevel] = useState(0); // Partner's thermometer level

  // Fetch initial data from localStorage on mount
  useEffect(() => {
    const name = localStorage.getItem('userName');
    const partnerThermometer = localStorage.getItem('partnerThermometer');

    if (!name) {
      navigate('/'); // Redirect to login if no user data
    } else {
      setUserName(name);
      setPartnerLevel(parseInt(partnerThermometer, 10) || 0);
    }
  }, [navigate]);

  const handleSave = async () => {
    try {
      const response = await updateThermometer(userName, myLevel);
      if (response.success) {
        alert('Thermometer updated successfully!');
      } else {
        alert('Failed to update thermometer. Please try again.');
      }
    } catch (error) {
      alert('An error occurred while saving. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="dashboard">
      <h1>Welcome, {userName}</h1>
      <div className="thermometers">
        <div className="thermometer">
          <h2>My Thermometer</h2>
          <Thermometer level={myLevel} setLevel={setMyLevel} />
        </div>
        <div className="thermometer">
          <h2>Partner's Thermometer</h2>
          <Thermometer level={partnerLevel} readonly />
        </div>
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default Dashboard;

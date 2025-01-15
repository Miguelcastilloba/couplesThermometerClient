import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateThermometer } from '../services/Api';
import Thermometer from '../components/Thermomether';

function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [myLevel, setMyLevel] = useState(5); // Default level for user's thermometer
  const [partnerLevel, setPartnerLevel] = useState(0);

  // Notification state: message and type
  const [notification, setNotification] = useState({ message: '', type: '' });

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
        setNotification({
          message: 'Termómetro actualizado correctamente.',
          type: 'success',
        });
      } else {
        setNotification({
          message: 'Fallo al actualizar el termómetro. Por favor, inténtalo de nuevo.',
          type: 'error',
        });
      }
    } catch (error) {
      console.error(error);
      setNotification({
        message: 'Ocurrió un error al guardar. Por favor, inténtalo de nuevo.',
        type: 'error',
      });
    }
  };

  return (
    <div className="dashboard">
      <h1>Hola, {userName}!</h1>

      <div className="thermometers">
        <div className="thermometer">
          <h2>Mi termómetro:</h2>
          <Thermometer level={myLevel} setLevel={setMyLevel} />
        </div>
        <div className="thermometer">
          <h2>Mi pareja:</h2>
          <Thermometer level={partnerLevel} readonly />
        </div>
      </div>

      {/* Container for the button and the subtle notification */}
      <div className="dashboard-actions">
        <button onClick={handleSave}>Guardar</button>
        {notification.message && (
          <p className={`notification ${notification.type}`}>
            {notification.message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

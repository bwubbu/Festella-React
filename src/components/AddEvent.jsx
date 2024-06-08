import React from 'react';
import '../styles/CallVendor.css'; // Make sure to create a corresponding CSS file
import { useNavigate } from 'react-router-dom';

const CallVendor = () => {
  const navigate = useNavigate();

  const handleCreateEvent = () => {
    navigate('/add-event'); // Redirect to the form page
  };

  return (
    <div className="vendor-call-section">
      <div className="vendor-call-content">
        <h2>Are you hosting a Concert, Seminar or Sports Event? We can help!</h2>
        <button onClick={handleCreateEvent} className="create-event-button">
          <span className="plus-icon">+</span> Create Event Now
        </button>
        <p>Chat with us now to help you get started.</p>
      </div>
    </div>
  );
};

export default CallVendor;

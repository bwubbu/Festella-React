import React, { useState, useEffect } from 'react';
import { getEvents } from '../api/api'; // Import the getEvents function
import '../styles/Appo.css';

function InviteForm(props) {
  const [name, setName] = useState('');
  const [dietaryRequirements, setDietaryRequirements] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [events, setEvents] = useState([]); // State to store events

  useEffect(() => {
    // Fetch events when the component mounts
    const fetchEvents = async () => {
      try {
        const response = await getEvents();
        setEvents(response.data);
      } catch (error) {
        console.error('Failed to fetch events', error);
      }
    };

    fetchEvents();
  }, []);

  const nextClicked = (e) => {
    e.preventDefault();
    console.log('Form collected data');

    if (!name || !dietaryRequirements) {
      setErrorMessage('Please fill all fields');
      return;
    }

    props.showConfirmScreen(name, dietaryRequirements);
  };

  return (
    <div className="rsvpp-container">
      <p className="rsvpp-p">{errorMessage}</p>
      <form className="rsvpp-form" onSubmit={nextClicked}>
        <label className="rsvpp-label">
          Name:
          <br />
          <input
            type="text"
            name="name"
            className="rsvpp-textfield"
            onChange={e => setName(e.target.value)}
          />
        </label>
        <br /><br />
        <label className="rsvpp-label">
          Events:
          <br />
          <select
            className="rsvpp-select"
            onChange={e => setDietaryRequirements(e.target.value)}
          >
            <option value="" disabled selected>Select</option>
            {events.map(event => (
              <option key={event._id} value={event.name}>{event.name}</option>
            ))}
          </select>
          <br /><br />
        </label>
        <button type="submit" className="rsvpp-next-btn">Next</button>
      </form>
    </div>
  );
}

export default InviteForm;


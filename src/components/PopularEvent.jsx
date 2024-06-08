import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTopEvents } from '../api/api';
import '../styles/PopularEvent.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const MostPopularEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getTopEvents();
        console.log('Fetched events:', response.data); // Debugging
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const redirectToEventDetails = (eventId) => {
    navigate('/browse/eventdetails', { state: { eventId: eventId } });
  };

  return (
    <div className="most-popular">
      <div className="heading-section">
        <h4><em>Most Popular</em> Events</h4>
      </div>
      <div className="row">
        {events.map((event) => (
          <div key={event._id} className="col-lg-3 col-sm-6">
            <div className="item" onClick={() => redirectToEventDetails(event._id)}>
              {event.images && event.images.length > 0 && (
                <img src={event.images[0]} alt={event.name} />
              )}
              <h4>{event.name}<br /><span>{event.category}</span></h4>
              <ul>
                <li><i className="fas fa-star"></i> {event.rating}</li>
                <li><i className="fas fa-ticket-alt"></i> {event.downloads}</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostPopularEvents;

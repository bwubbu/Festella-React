// frontend/src/components/MostPopularEvents.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventContext } from './EventContext';
import '../styles/Events.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const PopularEvents = () => {
  const navigate = useNavigate();
  const { topEvents } = useContext(EventContext);

  const redirectToEventDetails = (eventId) => {
    navigate('/browse/eventdetails', { state: { eventId: eventId } });
  };

  return (
    <div className="most-popular">
      <div className="heading-section">
        <h4><span className='home-text'>Most Popular</span> Events</h4>
      </div>
      <div className="row">
        {topEvents.map((event) => (
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

export default PopularEvents;

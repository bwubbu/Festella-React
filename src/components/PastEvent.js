import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Events.css';
import { EventContext } from './EventContext';

const PastEvent = () => {
  const { pastEvents } = useContext(EventContext);
  const navigate = useNavigate();

  const redirectToEventDetails = (eventId) => {
    navigate('/browse/eventdetails', { state: { eventId: eventId } });
  };

  return (
    <div className="gaming-library">
      <h1>Past Events</h1>
      <div className="col-lg-12">
        {pastEvents.map((event, index) => (
          <div className={`item ${index === pastEvents.length - 1 ? 'last-item' : ''}`} key={event._id}>
            <ul>
              <li><img src={event.images[0]} alt="" className="templatemo-item" /></li>
              <li><h4>{event.name}</h4><span>{event.category}</span></li>
              <li><h4>Date Attended</h4><span>{new Date(event.date).toLocaleDateString()}</span></li>
              <li><h4>Currently</h4><span>{event.isFinished ? 'Finished' : 'Ongoing'}</span></li>
              <li>
                <div className="main-border-button">
                  <button onClick={() => redirectToEventDetails(event._id)}>Details</button>
                </div>
              </li>
            </ul>
          </div>
        ))}
      </div>
      <div className="col-lg-12">
        <div className="view-library-button main-button">
          <a href="/profile">View All Your Events</a>
        </div>
      </div>
    </div>
  );
};

export default PastEvent;

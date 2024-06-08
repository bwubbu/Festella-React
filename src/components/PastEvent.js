import React from 'react';
import './PastEvent.css'; 
import cs from '../assets/images/cs.png';
import taylor from '../assets/images/taylor.png';
import pena from '../assets/images/Penacony.jpeg';

const events = [
  {
    id: 1,
    image: pena,
    title: 'HSR Party',
    subtitle: 'Night Out',
    date: '24/08/2036',
    status: 'Finish',
    detailLink: 'past_event_details.html?id=1'
  },
  {
    id: 2,
    image: taylor,
    title: 'Taylor Swift Watch Party',
    subtitle: 'Night Out',
    date: '22/06/2036',
    status: 'Finished',
    detailLink: '#'
  },
  {
    id: 3,
    image: cs,
    title: 'CS Watch Party',
    subtitle: 'Sport',
    date: 'None',
    status: 'Cancelled',
    detailLink: '#'
  }
];

const GamingLibrary = () => {
  return (
    <div className="gaming-library">
      <h1>Your Past event</h1>
      <div className="col-lg-12">
        {events.map(event => (
          <div className={`item ${event.id === events.length ? 'last-item' : ''}`} key={event.id}>
            <ul>
              <li><img src={event.image} alt="" className="templatemo-item"/></li>
              <li><h4>{event.title}</h4><span>{event.subtitle}</span></li>
              <li><h4>Date Attended</h4><span>{event.date}</span></li>
              <li><h4>Currently</h4><span>{event.status}</span></li>
              <li><div className="main-border-button"><a href={event.detailLink}>Details</a></div></li>
            </ul>
          </div>
        ))}
      </div>
      <div className="col-lg-12">
            <div className="view-library-button main-button">
                <a href="profile.html">View All Your Events</a>
            </div>
        </div>
    </div>
  );
};

export default GamingLibrary;

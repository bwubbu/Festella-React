/*
import React from 'react';
import './PopularEvent.css';
import adoImage from '../assets/images/Ado.jpeg'; 
import coldplayImage from '../assets/images/Cold.jpg'; 
import comiketImage from '../assets/images/Comiket.png'; 
import runImage from '../assets/images/Run.jpg'; 
import imageE3 from '../assets/images/E3.jpeg';
import imageBalls from '../assets/images/Balls.jpg';
import imageCafkl from '../assets/images/Cafkl.jpeg';

const events = [
    {
        id: 1,
        name: "Ado Wish",
        category: "Concert",
        image: adoImage,
        rating: 4.8,
        downloads: "2.3M",
        detailsPage: "details_event1.html"
    },
    {
        id: 2,
        name: "Coldplay",
        category: "Concert",
        image: coldplayImage,
        rating: 4.8,
        downloads: "2.3M",
        detailsPage: "details_event2.html"
    },
    {
        id: 3,
        name: "Comiket",
        category: "Convention",
        image: comiketImage,
        rating: 4.8,
        downloads: "2.3M",
        detailsPage: "details_event3.html"
    },
    {
        id: 4,
        name: "KL Marathon",
        category: "Sport",
        image: runImage,
        rating: 4.8,
        downloads: "2.3M",
        detailsPage: "details_event4.html"
    },
    {
        id: 5,
        name: "E3 2023",
        category: "Convention",
        image: imageE3,
        rating: 632,
        downloads: "50,000",
        detailsPage: "details_event5.html"
      },
      {
        id: 6,
        name: "Football",
        category: "Sport",  // This was mistakenly set to an image path before
        image: imageBalls,
        rating: 1223,
        downloads: "0.5M",
        detailsPage: "details_event6.html"
      },
      {
        id: 7,
        name: "CAFKL",
        category: "Convention",
        image: imageCafkl,
        rating: 91,
        downloads: "10, 000",
        detailsPage: "details_event7.html"
      }
];

const MostPopularEvents = () => {
    const redirectToEventDetails = (eventId) => {
        // Navigation logic here
        window.location.href = `details_event${eventId}.html`;
    };

    return (
        <div className="most-popular">
            <div className="heading-section">
                <h4><em>Most Popular</em> Event</h4>
            </div>
            <div className="row">
                {events.map((event) => (
                    <div key={event.id} className="col-lg-3 col-sm-6">
                        <div className="item" onClick={() => redirectToEventDetails(event.id)}>
                            <img src={event.image} alt={event.name} />
                            <h4>{event.name}<br /><span>{event.category}</span></h4>
                            <ul>
                                <li><i className="fa fa-star"></i> {event.rating}</li>
                                <li><i className="fa fa-ticket"></i> {event.downloads}</li>
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MostPopularEvents;
*/

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTopEvents } from '../api/api';
import './PopularEvent.css';

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
                <li><i className="fa fa-star"></i> {event.rating}</li>
                <li><i className="fa fa-ticket"></i> {event.downloads}</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostPopularEvents;






import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { getEventById } from '../api/api';
import '../styles/Events.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';

function EventDetails() {
  const location = useLocation();
  const { eventId } = location.state || { eventId: 1 };
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await getEventById(eventId);
        setEventDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch event', error);
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!eventDetails) {
    return <div>Event not found</div>;
  }

  const {
    name,
    category,
    rating,
    downloads,
    images,
    videoLink,
    description,
    ticketSold = 0,
    totalTicket = 1000000
  } = eventDetails;

  const percentageSold = (ticketSold / totalTicket) * 100;

  return (
    <div className="event-details-container">
      <div className="event-details">
        <div className="image-section">
          <div className="main-image-container">
            <img src={images[0]} alt={name} className="main-image" />
          </div>
          <div className="video-thumbnail">
            <img src={images[1]} alt={name} className="thumbnail-image" />
            <a href={videoLink} target="_blank" rel="noopener noreferrer" className="play-button">
              <i className="fa fa-play"></i>
            </a>
          </div>
        </div>
        <h2 className="event-title">{name}</h2>
        <div className="event-info-container">
          <div className="event-info-left">
            <h4>{name}</h4>
            <span>{category}</span>
          </div>
          <div className="event-info-right">
            <ul>
              <li><i className="fa fa-star"></i> {rating}</li>
              <li><i className="fa fa-ticket"></i> {downloads}</li>
              <li><i className="fa fa-microphone"></i> Singer</li>
            </ul>
          </div>
        </div>
        <div className="game-details">
          <div className="content">
            <div className="col-lg-12">
              <p className='description'>{description}</p>
            </div>
            <div className="image-grid">
              {images.slice(2).map((image, index) => (
                <img key={index} src={image} alt={name} className="img-fluid" />
              ))}
            </div>
            <div className="col-lg-12">
              <div className="progress mt-3">
                <div className="progress-bar bg-success" role="progressbar" style={{ width: `${percentageSold}%` }} aria-valuenow={percentageSold} aria-valuemin="0" aria-valuemax="100">
                  <span className="progress-bar-text">{percentageSold.toFixed(2)}%</span>
                </div>
              </div>
              <div className="main-border-button">
              <Link to="/rsvpp">Buy the ticket now!</Link>
              </div>
              <div className="side-by-side-buttons">
                <div className="main-border-button">
                  <a href="#">Add to your list</a>
                </div>
                <div className="main-border-button">
                  <a href="#">Share the event</a>
                </div>
              </div>
            </div>
          </div>

          <div className="reviews-section">
            <ReviewList eventId={eventId} />
            <ReviewForm eventId={eventId} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;

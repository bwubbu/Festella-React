import React, { useEffect, useState, useContext } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { getEventById } from '../api/api';
import { AuthContext } from '../components/AuthContext';
import { useEvent } from '../components/EventContext';
import '../styles/Events.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';
import '../styles/share.css';
import Share from '../components/Share';
import axios from 'axios';
import CustomPopup from '../components/Popup';

function EventDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { eventId } = location.state || { eventId: 1 };
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const { user, updateUser } = useContext(AuthContext);
  const { setCurrentEventId } = useEvent();

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

  useEffect(() => {
    if (user) {
      fetchGroups();
    }
  }, [user]);

  const fetchGroups = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/groups');
      const allGroups = response.data;
      const userGroups = allGroups.filter(group => group.members.includes(user.userId));
      setGroups(allGroups);
      setUserGroups(userGroups);
      console.log('All groups:', allGroups);
      console.log('User groups:', userGroups);
    } catch (error) {
      console.error('Error fetching groups:', error.message);
    }
  };

  const handleBookmark = async () => {
    if (!user) {
      alert('You need to sign in to bookmark events');
      navigate('/login');
    } else {
      const updatedUser = {
        ...user,
        profile: {
          ...user.profile,
          registeredEvents: [...user.profile.registeredEvents],
          bookmarkedEvents: [...user.profile.bookmarkedEvents, eventId],
        },
      }

      try {
        await updateUser(updatedUser);
        alert('Event bookmarked successfully');
      } catch (error) {
        console.error('Failed to update user', error);
        alert('Failed to bookmark event');
      }
    }
  };

  const handleRSVP = () => {
    if (!user) {
      alert('You need to sign in to buy the ticket!');
      navigate('/login');
    } else {
      setCurrentEventId(eventId);
      navigate('/rsvpp');
    }
  };

  const handleAddToGroup = async () => {
    if (!selectedGroupId) {
      alert('Please select a group first.');
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/groups/${selectedGroupId}/addEvent`, { eventId });
      alert('Event added to group successfully');
      setIsPopupOpen(false);
    } catch (error) {
      console.error('Failed to add event to group', error);
      alert('Failed to add event to group. Please try again.');
    }
  };

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
    totalTicket = 1000000,
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
                <button onClick={handleRSVP}>Buy the ticket now!</button>
              </div>
              <div className="side-by-side-buttons">
                <div className="main-border-button">
                  {user && user.profile && user.profile.bookmarkedEvents.includes(eventId) ? (
                    <p>Event Added to Bookmark</p>
                  ) : (
                    <button onClick={handleBookmark}>Bookmark Event</button>
                  )}
                </div>
                <div className="main-border-button">
                  <Share description={"Check out this event on Festella!"}></Share>
                </div>
                <div className="main-border-button">
                  <button onClick={() => {
                    setIsPopupOpen(true);
                  }}>Add to Group</button><Share description={"Check out this event on Festella!"}></Share>
                </div>
                <div className="main-border-button">
                  <button onClick={() => {
                    setIsPopupOpen(true);
                  }}>Add to Group</button>
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

      <CustomPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      >
        <h2>Select Group</h2>
        <select onChange={(e) => setSelectedGroupId(e.target.value)} value={selectedGroupId}>
          <option value="">Select Group</option>
          {userGroups.map(group => (
            <option key={group._id} value={group._id}>{group.name}</option>
          ))}
        </select>
        <button onClick={handleAddToGroup}>Add to Group</button>
        <button onClick={() => setIsPopupOpen(false)}>Cancel</button>
      </CustomPopup>
    </div>
  );
}

export default EventDetails;

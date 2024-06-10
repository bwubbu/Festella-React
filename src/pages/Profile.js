import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "../styles/Profile.css";
import profilePicture from "../assets/pfpplaceholder.jpg";
import { useAuth } from "../components/AuthContext";
import { useEvent } from "../components/EventContext";

function Profile() {
  const { user } = useAuth();
  const { allEvents } = useEvent();
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [bookmarkedEvents, setBookmarkedEvents] = useState([]);

  useEffect(() => {
    if (user && user.profile) {
      const fetchRegisteredEvents = () => {
        const registeredEvents = allEvents.filter(event =>
          user.profile.registeredEvents.includes(event._id)
        );
        setRegisteredEvents(registeredEvents);
      }
      const fetchBookmarkedEvents = () => {
        const bookmarkedEvents = allEvents.filter(event =>
          user.profile.bookmarkedEvents.includes(event._id)
        );
        setBookmarkedEvents(bookmarkedEvents);
      }
      fetchRegisteredEvents();
      fetchBookmarkedEvents();
    }
  }, []);

  return (
    <div className="page-content">
      <div className="profile-container">
        <div className="profile-and-events">
          <div className="profile-and-registered-events">
            <div className="profile">
              <div className="profile-picture">
                {user && user.profile && user.profile.image !== '' ? (
                  <img src={user.profile.image} alt="User Profile" />
                ) : (
                  <img src={profilePicture} alt="User Profile" />
                )}
                <Link to="/profile/editprofile" className="edit-profile-button">
                  <button>Edit Profile</button>
                </Link>
              </div>
              <div className="profile-info">
                <p>Hey there!</p>
                {user && user.profile && user.profile.name !== '' ? (
                  <h2>{user.profile.name}</h2>
                ) : (
                  <h2>No Name</h2>
                )}
              </div>
            </div>
            <div className="registered-events">
              <div className="title">
                <h2 className="coloured-font">Registered</h2>
                <h2>Events</h2>
              </div>
              <div>
                {user && user.profile && user.profile.registeredEvents && user.profile.registeredEvents.length > 0 ? (
                  <div className="registered-events-container">
                    {registeredEvents.map(event => (
                      <div className="event-card" key={event._id}>
                        <img src={event.images[0]} alt={event.name} />
                        <h3>{event.name}</h3>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <p>No events registered</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="bookmarked-events">
            <div className="title">
              <h2 className="coloured-font">Bookmarked</h2>
              <h2>Events</h2>
            </div>
            <div>
              {user && user.profile && user.profile.bookmarkedEvents && user.profile.bookmarkedEvents.length > 0 ? (
                <div className="bookmarked-events-container">
                  {bookmarkedEvents.map(event => (
                    <div className="event-card" key={event._id}>
                      <img src={event.images[0]} alt={event.name} />
                      <h3>{event.name}</h3>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bookmarked-events-container">
                  <p>No events bookmarked</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Profile;

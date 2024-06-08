import React, {  } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "../styles/Profile.css";
import profilePicture from "../assets/pfpplaceholder.jpg";
import { useAuth } from "../components/AuthContext";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="page-content">
      <div className="profile-container">
        <div className="profile-and-events">
          <div className="profile-and-registered-events">
            <div className="profile">
              <div className="profile-picture">
                {user && user.profile ? (
                  <img src={user.profile.image} alt="User Profile" />
                ) : (
                  <img src={profilePicture} alt="User Profile" />
                )}
                <Link to="/profile/editprofile" className="edit-profile">
                <button>Edit Profile</button></Link>
              </div>
              <div className="profile-info">
                <p>Hey there!</p>
                {user && user.profile ? (
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
              <div className="registered-events-container">
                
              </div>
            </div>
          </div>
          <div className="bookmarked-events">
            <div className="title">
              <h2 className="coloured-font">Bookmarked</h2>
              <h2>Events</h2>
            </div>
            <div className="bookmarked-events-container">

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

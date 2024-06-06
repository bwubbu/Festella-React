import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import "../styles/Profile.css";
import profilePicture from "../assets/pfpplaceholder.jpg";

function Profile() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="page-content">
            <div className="row">
              <div className="col-lg-12">
                <div className="main-profile">
                  <div className="row">
                    <div className="col-lg-3">
                      <img
                        src={profilePicture}
                        alt="Profile"
                        className="profile-picture"
                      />
                    </div>
                    <div className="col-lg-7 align-self-center">
                      <div className="main-info header-text">
                        <p>
                          Hey There,
                        </p>
                        <h1 className="marginText2">PinkyP17</h1>
                        <div className="main-border-button">
                          <Link to="/profile/editprofile">Edit profile</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="clips">
                        <div className="row">
                          <div className="heading-section">
                            <h4>
                              <em>Registered</em> Events
                            </h4>
                            <div className="most-popular">
                              <div className="row" id="eventContainer"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

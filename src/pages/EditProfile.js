import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import "../styles/Vendor.css";

function EditProfile() {
  return (
    <div className="page-content">
      <div className="form-register">
        <h2>Change Your Profile Information!</h2>
        <form>
          <div className="form-row">
            <div>
              <label htmlFor="vendorFirstName">Username</label>
              <input
                type="text"
                id="vendorFirstName"
                name="firstName"
                placeholder="First Name"
              />
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="vendorEmail">Password</label>
              <input
                type="email"
                id="vendorEmail"
                name="email"
                placeholder="Email"
              />
            </div>
            <div>
              <label htmlFor="vendorPhone">Confirm Password</label>
              <input
                type="text"
                id="vendorPhone"
                name="phone"
                placeholder="Phone"
              />
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="vendorImage">Profile Picture</label>
              <input
                type="file"
                id="vendorImage"
                name="image"
                placeholder="Business Image"
              />
            </div>
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;

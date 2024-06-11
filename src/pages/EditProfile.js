import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import "../styles/Profile.css";
import { useAuth } from "../components/AuthContext";


function EditProfile() {
  const { user, editProfile } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    _id: user._id,
    username: user.username,
    email: user.email,
    password: '',
    profile: {
      name: user.profile.name || '',
      image: user.profile.image || '',
      bookmarkedEvents: user.profile.bookmarkedEvents || [],
      registeredEvents: user.profile.registeredEvents || []
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('profile.')) {
      const child = name.split('.')[1];
      setUserData(prev => ({ ...prev, profile: { ...prev.profile, [child]: value } }));
    } else {
      setUserData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUserData(prev => ({ ...prev, profile: { ...prev.profile, image: reader.result } }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user, userData)
    try {
      await editProfile(userData);
      alert('Profile edited successfully');
      navigate('/profile');
    } catch (error) {
      console.error('Error editing profile', error);
      alert('Failed to edit profile. Please try again.');
    }
  };

  return (
    <div className="page-content">
      <div className="edit-profile">
        <div className='back'>
          <Link to='/profile' className='button'>Back</Link>
        </div>
        <h2>Change Your Profile Information</h2>
        <form className="edit-profile-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div>
              <label htmlFor="name">Name</label>
              <input type="text" id="profile.name" name="profile.name" placeholder="Name" value={userData.profile.name} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username" placeholder="Username" value={userData.username} onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" placeholder="Password" value={userData.password} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="password">Confirm Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="image">Profile Picture</label>
              <input type="file" id="image" name="profile.image" placeholder="Profile Picture" onChange={handleImage} />
            </div>
          </div>
          <button type="submit">Update Profile</button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;

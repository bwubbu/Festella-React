import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import "../styles/Profile.css";
import { useAuth } from "../components/AuthContext";

function EditProfile() {
  const { user, editProfile } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(user ? {
    id: user._id,
    name: user.profile.name,
    username: user.username,
    password: '',
    image: user.profile.image,
  } : {
    id: '',
    name: '',
    username: '',
    password: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUserData(prev => ({ ...prev, image: reader.result }));
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
              <input type="text" id="name" name="name" required placeholder="Name" onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username" required placeholder="Username" onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required placeholder="Password" onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="password">Confirm Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" required placeholder="Confirm Password" onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="image">Profile Picture</label>
              <input type="file" id="image" name="image" placeholder="Profile Picture" onChange={handleImage} />
            </div>
          </div>
          <button type="submit">Update Profile</button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;

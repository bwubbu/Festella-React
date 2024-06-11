import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';
import '../styles/ForgotPassword.css';

function ChangePassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || { email: '' };
  const [password, setPassword] = useState({
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.password !== password.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password: password.password }),
      });
      const data = await response.json();
      if (data.message === 'Password changed successfully') {
        alert('Password changed successfully');
        navigate('/login');
      } else {
        alert('Error changing password');
      }
    } catch (error) {
      console.error('Error changing password', error);
      alert('Failed to change password. Please try again.');
    }
  };

  return (
    <div className='page-content'>
      <div className='change-password'>
        <h1>Change Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <label htmlFor="password">New Password</label>
            <input type="password" placeholder="New Password" name="password" value={password.password} required onChange={handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" placeholder="Confirm Password" name="confirmPassword" value={password.confirmPassword} required onChange={handleChange} />
          </div>
          <input type="submit" value="Change Password" className="btn solid" />
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import '../styles/ForgotPassword.css';
import '../App.css';

function ForgotPassword() {
  const containerRef = useRef(null);

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      if (!validateEmail(value)) {
        
      } else {
        
      }
    } else if (value.trim() === '') {
      
    }
  };

  return (
    <div className='page-content'>
      <div className='page-container' ref={containerRef}>
        <div className='forms-container'>
          <div className='signin-signup'>
            <form action="#" className="sign-in-form">
              <h1 className="title">Sign in</h1>
              <div className="input-field">
                <FontAwesomeIcon className="icon" icon={faUser} color="black"/>
                <input type="text" placeholder="Username" name="username" required onChange={handleInputChange} />
              </div>
              <div className="input-field">
                <FontAwesomeIcon icon={faLock} color="black"/>
                <input type="password" placeholder="Password" name="password" required onChange={handleInputChange} />
              </div>
              <p className="forgot-password">
                <a href="#">Forgot Password?</a>
              </p>
              <input type="submit" value="Login" className="btn solid" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
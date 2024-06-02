import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import '../styles/Login.css';
import '../App.css';

function Login() {
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

  useEffect(() => {
    const signInButton = document.querySelector('#sign-in-btn');
    const signUpButton = document.querySelector('#sign-up-btn');

    signInButton.addEventListener('click', () => {
      containerRef.current.classList.remove('sign-up-mode');
    });

    signUpButton.addEventListener('click', () => {
      containerRef.current.classList.add('sign-up-mode');
    });
  }, []);

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
            <form action="#" className="sign-up-form">
              <h1 className="title">Sign up</h1>
              <div className="input-field">
                <FontAwesomeIcon icon={faUser} color="black"/>
                <input type="text" placeholder="Username" name="username" required onChange={handleInputChange} />
              </div>
              <div className="input-field">
                <FontAwesomeIcon icon={faEnvelope} color="black"/>
                <input type="email" placeholder="Email" name="email" required onChange={handleInputChange} />
              </div>
              <div className="input-field">
                <FontAwesomeIcon icon={faLock} color="black"/>
                <input type="password" placeholder="Password" name="password" required onChange={handleInputChange} />
              </div>
              <input type="submit" className="btn" value="Sign up" />
            </form>
          </div>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                ex ratione. Aliquid!
              </p>
              <button className="btn transparent" id="sign-up-btn">
                Sign up
              </button>
            </div>
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us ?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum
                laboriosam ad deleniti.
              </p>
              <button className="btn transparent" id="sign-in-btn">
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
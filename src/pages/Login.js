import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import '../styles/Login.css';
import '../App.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleLogin = () => {
    // Perform login operation...

    // If login is successful, set isAuthenticated to true
    setIsAuthenticated(true);

    // Navigate to the homepage
    navigate('/');
  };

  const containerRef = useRef(null);

// Function to check if passwords are identical
  const arePasswordsIdentical = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
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

  const [registerUser, setRegisterUser] = useState({
    username: '',
    email: '',
    password: '',
  });
  const { register } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/register`, registerUser);
      register(response.data);
      alert('User registered successfully');
      navigate('/');
    } catch (error) {
      console.error('Error registering user', error);
      alert('Failed to register user. Please try again.');
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
                <Link to="/profile/forgotpassword">Forgot Password?</Link>
              </p>
              <input type="submit" value="Login" className="btn solid" onClick={handleLogin} />
            </form>
            <form action="#" className="sign-up-form" onSubmit={handleRegister}>
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
              <div className="input-field">
                <FontAwesomeIcon icon={faLock} color="black"/>
                <input type="password" placeholder="Confirm Password" name="password" required onChange={handleInputChange} />
              </div>
              <button type="submit" className="btn">Sign up</button>
            </form>
          </div>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>
                Register Now To Unlock All Features Of Our Website!
                <br />
                We're Excited To Have You!
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
                Sign in to access your account and pick up where you left off!
                <br />
                We're Happy To Have You Back!
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
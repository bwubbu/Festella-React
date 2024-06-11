import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import '../styles/Login.css';
import '../App.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

function Login() {
  const containerRef = useRef(null);
  const { login, register } = useAuth();

  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(loginData);
    try {
      await login(loginData);
      alert('Login successful');
      navigate('/');
    } catch (error) {
      console.error('Error logging in user', error);
      alert('Failed to login. Please try again.');
    }
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(registerData);
      alert('User registered successfully');
      navigate('/');
    } catch (error) {
      console.error('Error registering user', error);
      alert('Failed to register user. Please try again.');
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
      <div className='login-page-container' ref={containerRef}>
        <div className='forms-container'>
          <div className='signin-signup'>
            <form action="#" className="sign-in-form" onSubmit={handleLogin}>
              <h1 className="title">Sign in</h1>
              <div className="input-field">
                <FontAwesomeIcon className="icon" icon={faUser} color="black" />
                <input type="text" placeholder="Username" name="username" required onChange={handleLoginChange} />
              </div>
              <div className="input-field">
                <FontAwesomeIcon icon={faLock} color="black" />
                <input type="password" placeholder="Password" name="password" required onChange={handleLoginChange} />
              </div>
              <p className="forgot-password">
                <Link to="/login/forgotpassword">Forgot Password?</Link>
              </p>
              <input type="submit" value="Login" className="btn solid" />
            </form>
            <form action="#" className="sign-up-form" onSubmit={handleRegister}>
              <h1 className="title">Sign up</h1>
              <div className="input-field">
                <FontAwesomeIcon icon={faUser} color="black" />
                <input type="text" placeholder="Username" name="username" required onChange={handleRegisterChange} />
              </div>
              <div className="input-field">
                <FontAwesomeIcon icon={faEnvelope} color="black" />
                <input type="email" placeholder="Email" name="email" required onChange={handleRegisterChange} />
              </div>
              <div className="input-field">
                <FontAwesomeIcon icon={faLock} color="black" />
                <input type="password" placeholder="Password" name="password" required onChange={handleRegisterChange} />
              </div>
              <div className="input-field">
                <FontAwesomeIcon icon={faLock} color="black" />
                <input type="password" placeholder="Confirm Password" name="password" required onChange={handleRegisterChange} />
              </div>
              <button type="submit" className="btn">Sign up</button>
            </form>
          </div>
        </div>
        <div className="panels-container">
          <div className="panels left-panel">
            <div className="contents">
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
          <div className="panels right-panel">
            <div className="contents">
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
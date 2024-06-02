import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import '../css/loginstyle.css';

function Login() {
  const containerRef = useRef(null);
  
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'email') {
      if (!validateEmail(value)) {
        // handle invalid email
      }
    } else if (value.trim() === '') {
      // handle empty field
    }
  };

  useEffect(() => {
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");

    sign_up_btn.addEventListener("click", () => {
      containerRef.current.classList.add("sign-up-mode");
    });

    sign_in_btn.addEventListener("click", () => {
      containerRef.current.classList.remove("sign-up-mode");
    });
  }, []);
  return (
    <div className="container" ref={containerRef}>
      <div className="forms-container">
        <div className="signin-signup">
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
            <h1>New here ?</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button className="btn transparent" id="sign-up-btn">
              Sign up
            </button>
          </div>
          <img src="img/log.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h1>One of us ?</h1>
            <p>
              Come sign in with an existing account! We missed you!
            </p>
            <button className="btn transparent" id="sign-in-btn">
              Sign in
            </button>
          </div>
          <img src="img/register.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Login;
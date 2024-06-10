import React, { useRef, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import '../styles/ForgotPassword.css';

function ForgotPassword() {
  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate,
    onSubmit: (values) => {
      alert('Password reset email sent to ', values.email, ' if the email is registered with us');
      navigate('/login/verification');
    },
  });

  return (
    <div className='page-content'>
      <div className='forgot-password-container'>
        <div className='forms-container'>
          <div className='signin-signup'>
            <form onSubmit={formik.handleSubmit} className="sign-in-form">
              <h1 className="title">Forgot Password</h1>
              <p>Please enter your email to request password reset authentication.</p>
              <div className="input-field">
                <FontAwesomeIcon className="icon" icon={faEnvelope} color="black" />
                <input type="text" placeholder="Email" name="email" required onChange={formik.handleChange} />
              </div>
              <input type="submit" value="Submit" className="btn solid" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
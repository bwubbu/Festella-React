import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import '../styles/ForgotPassword.css';

function ForgotPassword() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/user/forgot-password/send-verification-code`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: values.email }),
        });
        const data = await response.json();
        if (data.message === 'Verification code sent') {
          alert(`Verification code sent to ${values.email}`);
          navigate('/login/verification', { state: { code: data.code, email: values.email }})
        } else {
          alert('Error sending verification code');
        }
      } catch (error) {
        console.error('Error sending verification code', error);
        alert('Error sending verification code');
      }
    },
  });

  return (
    <div className='page-content'>
      <div className='forgot-password-container'>
        <div className='forms-container'>
          <div className='back'>
            <button onClick={() => navigate('/login')}>&larr; Back</button>
          </div>
          <div className='forgot-password-page'>
            <form onSubmit={formik.handleSubmit}>
              <h1 className="title">Forgot Password</h1>
              <p>Please enter your email to request password reset authentication.</p>
              <div className="input-field">
                <FontAwesomeIcon className="icon" icon={faEnvelope} color="black" />
                <input type="text" placeholder="Email" name="email" {...formik.getFieldProps('email')} />
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
import React, { createRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';
import '../styles/ForgotPassword.css';

function CodeVerification() {
  const location = useLocation();
  const verificationCode = location.state?.code;
  const email = location.state?.email;
  const refs = Array(4).fill(0).map(() => createRef());
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const focusNext = (index, e) => {
    if (e.key === 'Backspace') {
      if (index !== 0) {
        refs[index - 1].current.focus();
      }
    } else if (index !== 3) {
      refs[index + 1].current.focus();
    }
    if (index === 3) {
      setCode(refs.map(ref => ref.current.value).join(''));
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('State:', location.state)
    console.log('Code:', code);
    console.log('Verification code:', verificationCode);
    console.log('Email:', email);
    try {
      if (String(code) === String(verificationCode)) {
        alert('Code verified successfully');
        navigate('/login/forgotpassword/change', { state: { email } });
      } else {
        alert('Invalid code entered');
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      alert('An error occurred while verifying code');
    }
  }

  return (
    <div className='page-content'>
      <div className='verification-container'>
        <h1>Code Verification</h1>
        <p>Enter the code sent to your email</p>
        <form onSubmit={handleSubmit}>
          <div className='code'>
            {refs.map((ref, index) => (
              <input
                key={index}
                ref={ref}
                type='number'
                maxLength='1'
                onKeyUp={(e) => focusNext(index, e)}
              />
            ))}
          </div>
          <button>Verify Account</button>
        </form>
      </div>
    </div>
  );
};

export default CodeVerification;
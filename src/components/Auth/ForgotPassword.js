import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import classes from './ForgotPassword.module.css';

const auth = getAuth();

function ForgotPassword({ setShowForgot }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError(false);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        console.log('password sended');
        setShowForgot(false);
      })
      .catch((error) => {
        setError(true);
        console.log(error.message);
        // ..
      });
  }
  return (
    <div
      className={classes['forgot-background']}
      onClick={() => setShowForgot(false)}
    >
      <div
        className={classes['forgot-window']}
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Forgot your password?</h3>
        <p>Please enter the email you use to sign in.</p>
        {error && (
          <p style={{ color: '#fd8282', fontSize: 12 }}>
            Error sending email. Check email and try again.
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className={classes['buttons-container']}>
            <button className={classes['button']} type="submit">
              Reset Password
            </button>
            <button
              className={`${classes['button']} `}
              onClick={() => setShowForgot(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;

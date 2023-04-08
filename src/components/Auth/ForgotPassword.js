import React, { useState } from 'react';
import classes from './ForgotPassword.module.css';

function ForgotPassword({ handleDelete, setShowForgot }) {
  const [email, setEmail] = useState('');
  function handleSubmit() {
    return null;
  }
  return (
    <div className={classes['forgot-window']}>
      <h2>Forgot your password?</h2>
      <p>Please enter the email you use to sign in.</p>
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
  );
}

export default ForgotPassword;

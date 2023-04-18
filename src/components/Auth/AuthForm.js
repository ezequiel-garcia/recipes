import { useState, useContext, useEffect } from 'react';
import Loader from '../util/Loader';
import classes from './AuthForm.module.css';
import AuthContext from '../store/auth-context';
import { useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

import SocialLogin from './SocialLogin';
import ForgotPassword from './ForgotPassword';

const AuthForm = () => {
  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);
  const [showForgot, setShowForgot] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState('');
  const [repeatedEmail, setRepeatedEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const { isLoading, error } = authCtx;

  useEffect(() => {
    if (authCtx.isLoggedIn) navigate('/recipes');
  }, [authCtx.isLoggedIn, navigate]);

  const switchAuthModeHandler = () => {
    setEnteredEmail('');
    setRepeatedEmail('');
    setEnteredPassword('');
    setRepeatedPassword('');
    setIsLogin((prevState) => !prevState);
  };

  const forgotPasswordHandler = (email) => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    return;
  };

  const submitHandler = (event) => {
    event.preventDefault();

    // Add Validation

    if (isLogin) {
      //using the auth so I can do requests to using the SDK
      authCtx.loginWithEmailAndPassword(enteredEmail, enteredPassword);
      // signInWithEmailAndPassword(auth, enteredEmail, enteredPassword);
    } else {
      console.log('creando nuevo usuario');
      //using the auth so I can do requests to using the SDK
      authCtx.signUpNewUser(enteredEmail, enteredPassword);
    }
  };

  return (
    <div className={classes['auth-container']}>
      <div className={classes.auth}>
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        {error && (
          <p className={classes.error}>
            Error authenticating. Check data and try again
          </p>
        )}
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              value={enteredEmail}
              onChange={(e) => setEnteredEmail(e.target.value)}
              required
            />
          </div>
          {!isLogin && (
            <div className={classes.control}>
              <label htmlFor="repeatedEmail">Repeat Email</label>
              <input
                type="email"
                id="repeatedEmail"
                value={repeatedEmail}
                onChange={(e) => setRepeatedEmail(e.target.value)}
                required
              />
            </div>
          )}
          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              value={enteredPassword}
              onChange={(e) => setEnteredPassword(e.target.value)}
              required
            />
          </div>
          {!isLogin && (
            <div className={classes.control}>
              <label htmlFor="repeatedPassword">Repeat Password</label>
              <input
                type="password"
                id="repeatedPassword"
                value={repeatedPassword}
                onChange={(e) => setRepeatedPassword(e.target.value)}
                required
              />
            </div>
          )}
          {isLogin && (
            <button
              className={classes.forgot}
              type="button"
              onClick={() => setShowForgot(true)}
            >
              Forgot password?
            </button>
          )}
          <div className={classes.actions}>
            {!isLoading && (
              <button>{isLogin ? 'Login' : 'Create Account'}</button>
            )}
            {isLoading && <Loader />}

            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? 'Create new account' : 'Login with existing account'}
            </button>
          </div>
        </form>
        <SocialLogin />
      </div>
      {showForgot && <ForgotPassword setShowForgot={setShowForgot} />}
    </div>
  );
};

export default AuthForm;

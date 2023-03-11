import { useState, useRef, useContext, useEffect } from 'react';
import axios from 'axios';
import Loader from '../util/Loader';
import classes from './AuthForm.module.css';
import AuthContext from '../store/auth-context';
import { useNavigate } from 'react-router-dom';

import { auth } from '../../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import SocialLogin from './SocialLogin';

const AuthForm = () => {
  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);
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

  const forgotPasswordHandler = () => {
    // axios
    //   .post(
    //     `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_FIREBASE_WEB_KEY}`,
    //     {
    //       email: 'eze.hoch@gmail.com',
    //       requestType: 'PASSWORD_RESET',
    //     }
    //   )
    //   .then((res) => {
    //     // setIsLoading(false);
    //     // authCtx.login(res.data.idToken);
    //     console.log(res.data);
    //   })
    //   .catch((error) => {
    //     const errorMessage =
    //       'Authentication failed! ' + error.response?.data?.error?.message;

    //     alert(errorMessage);
    //   });
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
              <label htmlFor="repeatedEmail">Your Email</label>
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
              <label htmlFor="repeatedPassword">Your Password</label>
              <input
                type="password"
                id="repeatedPassword"
                value={repeatedPassword}
                onChange={(e) => setRepeatedEmail(e.target.value)}
                required
              />
            </div>
          )}
          {isLogin && (
            <button
              className={classes.forgot}
              type="button"
              onClick={forgotPasswordHandler}
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
    </div>
  );
};

export default AuthForm;

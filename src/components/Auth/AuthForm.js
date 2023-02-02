import { useState, useRef, useContext } from 'react';
import axios from 'axios';
import Loader from '../util/Loader';
import classes from './AuthForm.module.css';
import AuthContext from '../store/auth-context';
import { Link } from 'react-router-dom';

const AuthForm = () => {
  const emailInputRef = useRef();
  //   const repeatedEmailInputRef = useRef();
  const passwordInputRef = useRef();
  //   const repeatedPasswordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const forgotPasswordHandler = () => {
    axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_FIREBASE_WEB_KEY}`,
        {
          email: 'eze.hoch@gmail.com',
          requestType: 'PASSWORD_RESET',
        }
      )
      .then((res) => {
        // setIsLoading(false);
        // authCtx.login(res.data.idToken);
        console.log(res.data);
      })
      .catch((error) => {
        setIsLoading(false);
        const errorMessage =
          'Authentication failed! ' + error.response?.data?.error?.message;

        alert(errorMessage);
      });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // Add Validation

    let url;
    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_WEB_KEY}`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_WEB_KEY}`;
      //   fetch(
      //     `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_WEB_KEY}`,
      //     {
      //       method: 'POST',
      //       body: JSON.stringify({
      //         email: enteredEmail,
      //         password: enteredPassword,
      //         returnSecureToken: true,
      //       }),
      //       headers: { 'Content-Type': 'application.json' },
      //     }
      //   ).then((res) => {
      //     if (res.ok) {
      //       console.log('RESPONSE OK' + res);
      //     } else {
      //       return res.json().then((data) => {
      //         //show error
      //         console.log(data.error.message + 'DATA');
      //       });
      //     }
      //   });
    }
    axios
      .post(url, {
        email: enteredEmail,
        password: enteredPassword,
        // returnSecureToken: true,
      })
      .then((res) => {
        setIsLoading(false);
        authCtx.login(res.data.idToken);
      })
      .catch((error) => {
        setIsLoading(false);
        const errorMessage =
          'Authentication failed! ' + error.response?.data?.error?.message;

        alert(errorMessage);
      });
  };

  return (
    <div className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        {isLogin && (
          <button type="button" onClick={forgotPasswordHandler}>
            Forgor password?
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
    </div>
  );
};

export default AuthForm;

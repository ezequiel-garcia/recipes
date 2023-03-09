import { createContext, useState, useEffect, useCallback } from 'react';
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth } from '../../firebase';

let logoutTimer;

const AuthContext = createContext({
  token: '',
  uid: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  loginWithGoogle: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;
  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedExpirationDate = localStorage.getItem('expirationTime');
  const storedUid = localStorage.getItem('uid');
  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 60000) {
    //if the time is less than a minute
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('uid');
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
    uid: storedUid,
  };
};

export const AuthContextProvider = ({ children }) => {
  const tokenData = retrieveStoredToken();
  let initialToken;
  let initialUid;
  if (tokenData) {
    initialToken = tokenData.token;
    initialUid = tokenData.uid;
  }
  const [token, setToken] = useState(initialToken);
  const [uid, setUid] = useState(initialUid);

  const userIsLoggedIn = !!token;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      loginHandler(
        user.accessToken,
        user.stsTokenManager?.expirationTime,
        user.uid
      );
    } else {
      logoutHandler();
    }
  });

  const logoutHandler = useCallback(() => {
    signOut(auth).catch((e) => console.log(e));
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('uid');
    // clear the logout timeout if there is one. If the user logout manually.
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        const expiration = result._tokenResponse.expiresIn;

        // The signed-in user info.
        const user = result.user;

        loginHandler(user.accessToken, expiration, user.uid);
      })
      .catch((error) => {
        console.log(error);
        // Handle Errors here.
        console.log(GoogleAuthProvider.credentialFromError(error));
      });
  };

  const loginWithEmailAndPassword = (email, password) => {};

  const loginHandler = (token, expirationTime, uid) => {
    const expiration = new Date(new Date().getTime() + +expirationTime * 1000);
    setToken(token);
    setUid(uid);
    localStorage.setItem('token', token);
    localStorage.setItem('expirationTime', expiration);
    localStorage.setItem('uid', uid);
    const remainingTime = calculateRemainingTime(expirationTime);

    //set the time for automatically logout.
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    uid,
    login: loginHandler,
    logout: logoutHandler,
    loginWithGoogle,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;

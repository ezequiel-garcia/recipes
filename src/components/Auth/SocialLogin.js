import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './AuthForm.module.css';
import AuthContext from '../store/auth-context';

function SocialLogin() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const googleLogin = () => {
    try {
      authCtx.loginWithGoogle();
      navigate('/recipes');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 5,
        }}
      >
        <div style={{ flex: 1, height: 0.5, backgroundColor: '#ffffffa7' }} />
        <p>Or</p>
        <div style={{ flex: 1, height: 0.5, backgroundColor: '#ffffffa7' }} />
      </div>
      <button onClick={googleLogin} className={classes.mediaButton}>
        <img src={require('../../assets/google-login.png')} alt="google logo" />
        <p>Login with Google</p>
      </button>
    </>
  );
}

export default SocialLogin;

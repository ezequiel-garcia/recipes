import React from 'react';
import AuthForm from '../components/Auth/AuthForm';
import MainNavigation from '../components/nav/MainNavigation';

const AuthenticationPage = () => {
  return (
    <>
      <MainNavigation />
      <AuthForm />
    </>
  );
};

export default AuthenticationPage;

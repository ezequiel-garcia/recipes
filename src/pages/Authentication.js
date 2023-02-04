import React from 'react';
import { redirect } from 'react-router-dom';
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

export function checkAuthLoader() {
  const token = localStorage.getItem('token');
  if (!token) {
    return redirect('/authentication');
  }
  return null;
}

import React from 'react';
import { redirect } from 'react-router-dom';
import AuthForm from '../components/Auth/AuthForm';

const AuthenticationPage = () => {
  return <AuthForm />;
};

export default AuthenticationPage;

export function checkAuthLoader() {
  const token = localStorage.getItem('token');
  if (!token) {
    return redirect('/authentication');
  }
  return null;
}

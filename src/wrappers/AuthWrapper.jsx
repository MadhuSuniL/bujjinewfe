import React from 'react';
import { jwtDecode } from 'jwt-decode';
import Redirecting from '../pages/extra/Redirecting';

function isTokenExpired(token) {
  const decodedToken = jwtDecode(token);
  const currentTime = Math.trunc(Date.now() / 1000);
  return currentTime > decodedToken.exp;
}

// eslint-disable-next-line no-unused-vars
function AuthWrapper(WrappedComponent) {

  const HOC = (props) => {

    // return <WrappedComponent {...props} />;
    const storedAccessToken = localStorage.getItem('accessToken')
    if (!storedAccessToken || isTokenExpired(storedAccessToken)) {
      return <Redirecting to="/signin" message='Not Signed In, Redirecting to Sign In Page ..' />;
    } else {
      return <WrappedComponent {...props} />;
    }
  }
  return HOC
}

export default AuthWrapper;


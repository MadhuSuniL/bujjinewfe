import React from 'react';
import { jwtDecode } from 'jwt-decode';
import Redirecting from '../pages/extra/Redirecting';

function isTokenExpired(token) {
  const decodedToken = jwtDecode(token);
  const currentTime = Math.trunc(Date.now() / 1000);
  return currentTime > decodedToken.exp;
}


// eslint-disable-next-line no-unused-vars
function UnAuthWrapper(WrappedComponent) {

  const HOC = (props) => {
    const storedAccessToken = localStorage.getItem('accessToken')
    if (storedAccessToken && !isTokenExpired(storedAccessToken)) {
      return <Redirecting to="/" message='Already Signed In, Redirecting Chat ..' />;
    } else {
      return <WrappedComponent {...props} />;
    }
  }
  return HOC
}

export default UnAuthWrapper;

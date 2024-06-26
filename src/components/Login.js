import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Login = ({ onLogin }) => {
  const responseGoogle = (response) => {
    if (response.credential) {
      const profile = JSON.parse(atob(response.credential.split('.')[1]));
      onLogin(profile);
    }
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <GoogleLogin
        onSuccess={responseGoogle}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default Login;

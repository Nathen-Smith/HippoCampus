import React from 'react';
// import {
    
//     Redirect
//   } from "react-router-dom";
  import { GoogleLogin } from 'react-google-login';
// refresh token
import { refreshTokenSetup } from '../utils/refreshToken';


const clientId =
  '243624827147-2vhvp3pqtcpl5g16nmukmh1sp3rl6nt3.apps.googleusercontent.com';

function Login() {
  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    alert(
      `Logged in successfully welcome ${res.profileObj.name} 😍.`
    );
    refreshTokenSetup(res);
    // <Redirect to="/user" />
    
        var data =  {
          "UserID": res.profileObj.googleId,
          "name": res.profileObj.name
        }
        // console.log(data)
        fetch('http://127.0.0.1:5000/findUser', {
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify(data)
        })
        .then(response => response.text())
        .then((data) => {
          console.log(data)
        })
        sessionStorage.setItem('UserID', res.profileObj.googleId % 2147483647);
        //we should use this item UserID to display if it is in session storage
        
      

  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Login Failed.`
    );
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;
import React from 'react';
import { useGoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from '../utils/refreshToken';
import {Button} from 'react-bootstrap'


const clientId =
  '243624827147-2vhvp3pqtcpl5g16nmukmh1sp3rl6nt3.apps.googleusercontent.com';

function LoginHooks() {
  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    sessionStorage.setItem('UserID', res.profileObj.googleId);
    sessionStorage.setItem('name', res.profileObj.name);
    alert(
      `Logged in successfully welcome ${res.profileObj.name} 😍.`
    );
    refreshTokenSetup(res);
    var data =  {
      "UserID": res.profileObj.googleId,
      "name": res.profileObj.name
    }
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
      var data_arr = JSON.parse(data)
      if (data_arr.length !== 0) {
        sessionStorage.setItem('Age', data_arr[0][1])
        sessionStorage.setItem('ClassStanding', data_arr[0][2])
        sessionStorage.setItem('Location', data_arr[0][5])
        sessionStorage.setItem('Major', data_arr[0][6])
        sessionStorage.setItem('Minor', data_arr[0][7])
        sessionStorage.setItem('Bio', data_arr[0][8])
        sessionStorage.setItem('Statement', data_arr[0][9])
      }

      var data_availability =  {
        "UserID": res.profileObj.googleId,
      }
      fetch('http://127.0.0.1:5000/autoFillDays', {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(data_availability)
      })
      .then(response => response.text())
      .then((data2) => {
        var data_arr2 = JSON.parse(data2)
        sessionStorage.setItem('AvailableOnMonday', data_arr2[0][1])
        sessionStorage.setItem('AvailableOnTuesday', data_arr2[0][2])
        sessionStorage.setItem('AvailableOnWednesday', data_arr2[0][3])
        sessionStorage.setItem('AvailableOnThursday', data_arr2[0][4])
        sessionStorage.setItem('AvailableOnFriday', data_arr2[0][5])
        sessionStorage.setItem('AvailableOnSaturday', data_arr2[0][6])
        sessionStorage.setItem('AvailableOnSunday', data_arr2[0][7])
      })

    })
  };


  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Login failed.`
    );
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: 'offline',
    // responseType: 'code',
    // prompt: 'consent',
  });

  return (
    <Button onClick={signIn}>
      Login
    </Button>
  );
}

export default LoginHooks;
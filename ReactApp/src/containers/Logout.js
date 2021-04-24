import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId =
'243624827147-2vhvp3pqtcpl5g16nmukmh1sp3rl6nt3.apps.googleusercontent.com';

function Logout() {
  const onSuccess = () => {
    console.log('Logout made successfully');
    alert('Logout made successfully ✌');
    //remove UserID from session storage
    sessionStorage.clear()
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;
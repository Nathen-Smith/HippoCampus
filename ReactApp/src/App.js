import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import 'bootstrap/dist/css/bootstrap.css'
// import Form from 'react-bootstrap/Form'
import './App.css'
// import Create from './components/Create.js'
// import Updates from './components/Updates.js';
// import Delete from './components/Delete.js'
// import SearchView from './components/SearchView.js'
// import AdvancedQuery from './components/AdvancedQuery.js'
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";
// Firebase App (the core Firebase SDK) is always required and must be listed first
// import firebase from "firebase/app";
// import "firebase/analytics";
// import "firebase/auth";
// import "firebase/firestore";
// Firebase log-in widget
// function configureFirebaseLoginWidget() {
//   var uiConfig = {
//     'signInSuccessUrl': '/',
//     'signInOptions': [
//       // Leave the lines as is for the providers you want to offer your users.
//       firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//       // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//       // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
//       // firebase.auth.GithubAuthProvider.PROVIDER_ID,
//       firebase.auth.EmailAuthProvider.PROVIDER_ID
//     ],
//     // Terms of service url
//     'tosUrl': '<your-tos-url>',
//   };

//   var ui = new firebaseui.auth.AuthUI(firebase.auth());
//   ui.start('#firebaseui-auth-container', uiConfig);
// }
// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     $('#logged-out').hide();
//     var name = user.displayName;

//     /* If the provider gives a display name, use the name for the
//     personal welcome message. Otherwise, use the user's email. */
//     var welcomeName = name ? name : user.email;

//     user.getIdToken().then(function(idToken) {
//       userIdToken = idToken;

//       /* Now that the user is authenicated, fetch the notes. */
//       fetchNotes();

//       $('#user').text(welcomeName);
//       $('#logged-in').show();

//     });

//   } else {
//     $('#logged-in').hide();
//     $('#logged-out').show();

//   }
// });
// // Fetch notes from the backend.
// function fetchNotes() {
//   $.ajax(backendHostUrl + '/notes', {
//     /* Set header for the XMLHttpRequest to get data from the web server
//     associated with userIdToken */
//     headers: {
//       'Authorization': 'Bearer ' + userIdToken
//     }
//   })
// var auth = firebase.auth();
// auth.useEmulator("http://localhost:9099");
class App extends React.Component {
  constructor (props) {
    super(props);
    this.state={
        name:sessionStorage.getItem("name") //how to reset after logout?
    }
  }
  render() {
    if (this.state.name != null) {
      return (
        <div className="App container py-3">
  
        <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
          <LinkContainer to="/">
            <Navbar.Brand className="font-weight-bold text-muted">
            HippoCampus
            {/* <div>{this.state.name}</div> */}
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav activeKey={window.location.pathname}>
              <LinkContainer to="/login">
                <Nav.Link >Change Accounts</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/logout">
                <Nav.Link>Logout</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes />
        {/* <Create></Create><br />
        <Updates></Updates><br />
        <Delete></Delete><br />
        <SearchView></SearchView><br />
        <AdvancedQuery></AdvancedQuery><br /> */}
        </div>
    
  
      );
    }
    else {
    return (
      <div className="App container py-3">

      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
        <LinkContainer to="/">
          <Navbar.Brand className="font-weight-bold text-muted">
          HippoCampus
          {/* <div>{this.state.name}</div> */}
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/logout">
              <Nav.Link>Logout</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes />
      {/* <Create></Create><br />
      <Updates></Updates><br />
      <Delete></Delete><br />
      <SearchView></SearchView><br />
      <AdvancedQuery></AdvancedQuery><br /> */}
      </div>
  

    ); }
  }
}
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDMAcQxaK1H52rEtJ0oUzaA-T8a9C8kI0s",
//   authDomain: "hippocampus-309101.firebaseapp.com",
//   projectId: "hippocampus-309101",
//   storageBucket: "hippocampus-309101.appspot.com",
//   messagingSenderId: "243624827147",
//   appId: "1:243624827147:web:8f81e41ced707f3ecd6a0e",
//   measurementId: "G-98Z905B2WH"
// };
// firebase.initializeApp(firebaseConfig);


export default App;
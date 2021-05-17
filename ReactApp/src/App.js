import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";
// import LoginHooks from "./containers/LoginHooks"

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state={
      name:sessionStorage.getItem("name")
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
              </Navbar.Brand>
            </LinkContainer>
          <Navbar.Toggle />

          <Navbar.Collapse className="justify-content-end">
            
            <Nav activeKey={window.location.pathname}>
              {/* <LinkContainer to="/login"> */}
                {/* <Nav.Link href='#link'>Login</Nav.Link> */}
              {/* </LinkContainer> */}
              {/* </LoginHooks></LoginHooks> */}
              <LinkContainer to="/logout">
                <Nav.Link>Logout</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes />
        </div>


      );
    } else {
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

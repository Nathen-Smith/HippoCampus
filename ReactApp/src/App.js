import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import 'bootstrap/dist/css/bootstrap.css'
// import Form from 'react-bootstrap/Form'
import './App.css'
import Create from './components/Create.js'
import Updates from './components/Updates.js';
import Delete from './components/Delete.js'
import SearchView from './components/SearchView.js'
import AdvancedQuery from './components/AdvancedQuery.js'
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";

class App extends React.Component {
  render() {
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
            <LinkContainer to="/signup">
              <Nav.Link>Signup</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Create></Create><br />
      <Updates></Updates><br />
      <Delete></Delete><br />
      <SearchView></SearchView><br />
      <AdvancedQuery></AdvancedQuery><br />
      <Routes />
      </div>
  

    );
  }
}

export default App;
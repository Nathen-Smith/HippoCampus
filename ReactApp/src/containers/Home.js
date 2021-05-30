import React from "react";
import "./Home.css";
// import SearchView from "../components/SearchView.js"
import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";

export default function Home() {
  var UserID = sessionStorage.getItem("UserID")
  var name = sessionStorage.getItem("name")
  if (UserID != null){
    return (
      <div className="Home">
        <div className="lander">
          <h1>Welcome, {name}</h1>
          <img src="https://www.logocowboy.com/wp-content/uploads/2015/12/fatgeek3.png" width="250" height="200" alt="Mascot"></img>
          <LinkContainer to="/find">
            <Nav.Link >Find Study Buddies</Nav.Link>
          </LinkContainer>
          <LinkContainer to = "/matches">
            <Nav.Link>Favorites</Nav.Link>
          </LinkContainer>
        </div>
      </div>
    );
  } else { //not logged in yet
      return (
        <div className="Home">
          <div className="lander">
            <h1>HippoCampus</h1>
            <p className="text-muted">Login to find study buddies!</p>
          </div>
        </div>
      );
  } 
}

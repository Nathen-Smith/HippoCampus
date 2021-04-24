import React from "react";
import "./Home.css";
import SearchView from "../components/SearchView"

export default function Home() {
    var UserID = sessionStorage.getItem("UserID")
    var name = sessionStorage.getItem("name")
    if (UserID != null){
        return (
            <div className="Home">
                <div className="lander">
                    <h1>Welcome, {name}</h1>
                    {/* <h1>HippoCampus</h1> */}
                    {/* <p className="text-muted">Logged in!</p> */}
                    <SearchView></SearchView><br />
        
        
                </div>
            </div>
        );
    }
    else { //not logged in yet
        return (
            <div className="Home">
                <div className="lander">
                    <h1>HippoCampus</h1>
                    <p className="text-muted">Professional Tinder</p>
        
        
                </div>
            </div>
        );
    }
}
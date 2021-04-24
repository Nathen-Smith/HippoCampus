import React from "react";
import "./Home.css";

export default function Home() {
    var UserID = sessionStorage.getItem("UserID")
    if (UserID != null){
        return (
            <div className="Home">
                <div className="lander">
                    <h1>HippoCampus</h1>
                    <p className="text-muted">Logged in!</p>
        
        
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
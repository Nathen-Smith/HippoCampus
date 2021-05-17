import React from "react";
// import Card from 'react-bootstrap/Card'
// import Button from 'react-bootstrap/Button'
import Filtering from "../components/Filtering"
// import AdvancedQuery from "../components/AdvancedQuery"

export default function makeMatches() {
    return (
      <div className="match_tab text-center">
        <h3>Find Study Buddies!</h3>
        <Filtering></Filtering>
      </div>
    );
  }

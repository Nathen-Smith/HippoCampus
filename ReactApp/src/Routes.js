import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login"
import Logout from "./containers/Logout"
import MatchesTab from "./containers/MatchesTab"
import CardsTab from "./containers/CardsTab"
import Edit from "./containers/Edit"
import Filter from "./components/Filter"
import Autofill from "./components/Autofill"
 
export default function Routes() {
  return (
    <Switch>
      <Route exact path="/"><Home /></Route>
      <Route exact path="/login">
      {sessionStorage.getItem("UserID") ? <Redirect to="/" /> : <Login/>}
      </Route>
      <Route exact path="/edit">
        <Edit /> 
        <Autofill/>
        <Filter/>
      </Route>
      <Route exact path="/logout">
        <Logout/>
      </Route>
      <Route exact path="/matches"><MatchesTab /></Route>
      <Route exact path="/find"><CardsTab /></Route>

      <Route><NotFound /> </Route>
    </Switch>
  );
}

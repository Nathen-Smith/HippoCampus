import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login"
import Logout from "./containers/Logout"

import MatchesTab from "./containers/MatchesTab"

import Edit from "./containers/Edit"
import SearchView from "./components/SearchView"
import Create from "./components/Create"


// import AuthenticatedRoute from "./components/AuthenticatedRoute";
// import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
// import { Redirect} from "react-router-dom";

// on home page, check if there is a UserID somehow
export default function Routes() {
  return (
    <Switch>
      <Route exact path="/"><Home /></Route>
      <Route exact path="/login"><Login /> </Route>
      <Route exact path="/edit"><Edit /> <SearchView/><Create/></Route>
        {/* <Redirect to="/user" /> */}
      <Route exact path="/logout"><Logout /></Route>
      <Route exact path="/matches"><MatchesTab /></Route>

      <Route><NotFound /> </Route>
    </Switch>
  );
}

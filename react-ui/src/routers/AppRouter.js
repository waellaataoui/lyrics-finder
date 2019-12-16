import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Navbar from "../components/layouts/Navbar";
import Index from "../components/pages/Index";
import Lyrics from "../components/pages/Lyrics";
const AppRouter = () => (
  <Router>
    <React.Fragment>
      <Navbar></Navbar>
      <div className="container">
        <Switch>
          <Route path="/" component={Index} exact></Route>
          <Route
            path="/lyrics/:artistName/:trackName/:trackId"
            component={Lyrics}
          ></Route>
        </Switch>
      </div>
    </React.Fragment>
  </Router>
);

export default AppRouter;

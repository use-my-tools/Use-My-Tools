import React, { Component } from "react";
import { Route } from "react-router-dom";
import LandingPage from "./containers/LandingPage";
import Login from "./containers/Login";
import Register from "./containers/Register";

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </div>
    );
  }
}

export default App;

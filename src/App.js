import React, { Component } from "react";
import { Route } from "react-router-dom";
import LandingPage from "./containers/LandingPage";
import Login from "./containers/Login";
import Register from "./containers/Register";
import Dashboard from "./containers/Dashboard";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";

const theme = createMuiTheme({
  palette: {
    primary: { main: indigo[500] } // Purple and green play nicely together.
  },
  typography: { useNextVariants: true }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
      </MuiThemeProvider>
    );
  }
}

export default App;

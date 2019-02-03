import React, { Component } from "react";
import { Route } from "react-router-dom";
import LandingPage from "./containers/LandingPage";
import Login from "./containers/Login";
import Register from "./containers/Register";
import Dashboard from "./containers/Dashboard";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import lightGreen from "@material-ui/core/colors/lightGreen";

const theme = createMuiTheme({
  palette: {
    primary: { main: lightGreen[500] },
    type: "dark"
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

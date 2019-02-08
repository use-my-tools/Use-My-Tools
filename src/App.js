import React, { Component } from "react";
import { Route } from "react-router-dom";
import LandingPage from "./containers/LandingPage";
import Login from "./containers/Login";
import Register from "./containers/Register";
import Dashboard from "./containers/Dashboard";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import cyan from "@material-ui/core/colors/cyan";
import PasswordReset from "./containers/PasswordReset";

class App extends Component {
  state = {
    main: `${cyan[500]}`
  };

  changeColor = color => {
    this.setState({ main: color });
  };

  render() {
    const theme = createMuiTheme({
      palette: {
        primary: this.state,
        type: "dark"
      },
      typography: { useNextVariants: true }
    });
    return (
      <MuiThemeProvider theme={theme}>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={Login} />
        <Route path="/passwordreset" component={PasswordReset} />
        <Route path="/register" component={Register} />
        <Route
          path="/dashboard"
          render={props => (
            <Dashboard changeColor={this.changeColor} {...props} />
          )}
        />
      </MuiThemeProvider>
    );
  }
}

export default App;

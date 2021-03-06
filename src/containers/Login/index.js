import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser, handleChange } from "../../store/actions";
import NavBar from "../../components/NavBar";

const styles = theme => ({
  main: {
    marginTop: 100,
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  registerLink: {
    textDecoration: "none",
    display: "block",
    padding: "20px 0",
    color: "white"
  }
});

function SignIn(props) {
  const { classes, error, user, loginUser, handleChange, history } = props;

  if (window.localStorage.token) {
    history.push("/dashboard");
  }
  return (
    <>
      <NavBar />
      <main className={classes.main}>
        <CssBaseline />

        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            onSubmit={e => {
              e.preventDefault();
              loginUser(user);
            }}
            className={classes.form}
          >
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                id="username"
                name="username"
                autoComplete="username"
                autoFocus
                value={user.username}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={user.password}
                onChange={handleChange}
              />
            </FormControl>
            {error && (
              <small style={{ color: "red", display: "block" }}>{error}</small>
            )}

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Link className={classes.registerLink} to="/register">
              Don't Have an Account? Sign Up
            </Link>
            <Link className={classes.registerLink} to="/passwordreset">
              Reset Password
            </Link>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </main>
    </>
  );
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  error: state.login.error,
  user: state.login.user,
  isLoading: state.login.isLoading
});

export default connect(
  mapStateToProps,
  { loginUser, handleChange }
)(withStyles(styles)(SignIn));

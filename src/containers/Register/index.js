import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser, handleChange, handleErrors } from "../../store/actions";
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
  const {
    classes,
    user,
    isLoading,
    error,
    registerUser,
    handleChange,
    history,
    handleErrors
  } = props;

  const onRegisterUser = (e, user) => {
    e.preventDefault();
    if (user.confirmPassword !== user.password) {
      handleErrors("passwords do not match");
    } else {
      registerUser(user);
      history.push("/login");
    }
  };

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
            Register
          </Typography>
          <form
            onSubmit={e => onRegisterUser(e, user)}
            className={classes.form}
          >
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="firstname">First Name</InputLabel>
              <Input
                id="firstname"
                name="firstname"
                autoComplete="firstname"
                autoFocus
                value={user.firstname}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="lastname">Last Name</InputLabel>
              <Input
                id="lastname"
                name="lastname"
                autoComplete="lastname"
                value={user.lastname}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">username</InputLabel>
              <Input
                id="username"
                name="username"
                autoComplete="username"
                value={user.username}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="email"
                value={user.email}
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
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="confirmPassword">
                Confirm Password
              </InputLabel>
              <Input
                name="confirmPassword"
                type="password"
                id="confirmPassword"
                value={user.confirmPassword}
                onChange={handleChange}
              />
            </FormControl>
            {error && <small style={{ color: "red" }}>{error}</small>}
            <Link className={classes.registerLink} to="/login">
              Already Have an Account? Sign in
            </Link>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign up
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
  user: state.login.user,
  error: state.login.error,
  isLoading: state.login.isLoading,
  isRegistered: state.login.isRegistered
});
export default connect(
  mapStateToProps,
  { registerUser, handleChange, handleErrors }
)(withStyles(styles)(SignIn));

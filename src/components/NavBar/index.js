import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { handleClose } from "../../store/actions";
import Snack from "../Snack";
import Loader from "../Loader";

const styles = theme => ({
  appBar: {
    position: "fixed",
    top: 0
  },
  grow: {
    flexGrow: 1
  },
  icon: {
    marginRight: theme.spacing.unit * 2
  },
  link: {
    textDecoration: "none",
    color: "white"
  }
});

const NavBar = props => {
  const { classes, open, message, variant, handleClose, isLoading } = props;
  if (open) {
    setTimeout(() => handleClose(), 4000);
  }
  return (
    <AppBar position="static" className={classes.appBar}>
      {isLoading && <Loader />}
      <Toolbar>
        <CameraIcon className={classes.icon} />
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.grow}
        >
          <Link className={classes.link} to="/">
            Use My Tool
          </Link>
        </Typography>
        <Button color="inherit">
          <Link className={classes.link} to="/register">
            Register
          </Link>
        </Button>
        <Button color="inherit">
          <Link className={classes.link} to="/login">
            Login
          </Link>
        </Button>
      </Toolbar>
      <Snack
        open={open}
        handleClose={handleClose}
        message={message}
        variant={variant}
      />
    </AppBar>
  );
};

const mapStateTopProps = state => ({
  open: state.login.open,
  message: state.login.message,
  variant: state.login.variant,
  isLoading: state.login.isLoading
});

export default connect(
  mapStateTopProps,
  { handleClose }
)(withStyles(styles)(NavBar));

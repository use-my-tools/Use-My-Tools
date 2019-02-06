import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { connect } from "react-redux";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { clearUser, getTools, handleClose } from "../../store/actions";
import { mainListItems } from "../../components/MenuList";
import Items from "../../components/Items";
import MyTools from "../../components/MyTools";
import SingleTool from "../../components/SingleTool";
import { Route } from "react-router-dom";
import Loader from "../../components/Loader";
import UserProfile from "../../components/UserProfile";
import lightGreen from "@material-ui/core/colors/lightGreen";
import indigo from "@material-ui/core/colors/indigo";
import red from "@material-ui/core/colors/red";
import Button from "@material-ui/core/Button";
import Snack from "../../components/Snack";
const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: "100vh",
    overflow: "auto"
  },
  chartContainer: {
    marginLeft: -22
  },
  tableContainer: {
    height: 320
  },
  h5: {
    marginBottom: theme.spacing.unit * 2
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  avatar: {
    margin: 10
  },
  pagination: {
    textAlign: "center"
  }
});

class Dashboard extends React.Component {
  state = {
    open: false,
    offset: 0
  };

  componentDidMount = () => {
    this.props.getTools();
  };

  handleClick(offset) {
    console.log(offset);
    this.setState({ offset });
  }
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      classes,
      history,
      clearUser,
      isLoading,
      changeColor,
      open,
      handleClose,
      message,
      variant
    } = this.props;
    if (!window.localStorage.token) {
      history.push("/login");
    }
    if (open) {
      setTimeout(() => handleClose(), 4000);
    }
    return (
      <div className={classes.root}>
        <CssBaseline />

        <AppBar
          position="absolute"
          className={classNames(
            classes.appBar,
            this.state.open && classes.appBarShift
          )}
        >
          {isLoading && <Loader />}
          <Toolbar
            disableGutters={!this.state.open}
            className={classes.toolbar}
          >
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Dashboard
            </Typography>

            <IconButton
              onClick={() => {
                clearUser();
                window.localStorage.clear();
                history.push("/login");
              }}
              color="inherit"
            >
              <LockOutlinedIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Snack
          open={open}
          handleClose={handleClose}
          message={message}
          variant={variant}
        />
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(
              classes.drawerPaper,
              !this.state.open && classes.drawerPaperClose
            )
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Typography variant="h4" gutterBottom component="h2">
            Welcome {window.localStorage.firstname.toUpperCase()}!
          </Typography>
          <Button
            variant="contained"
            style={{ backgroundColor: indigo[500] }}
            className={classes.button}
            onClick={() => changeColor(indigo[500])}
          />
          <Button
            variant="contained"
            style={{ backgroundColor: red[500] }}
            className={classes.button}
            onClick={() => changeColor(red[500])}
          />
          <Button
            variant="contained"
            style={{ backgroundColor: lightGreen[500] }}
            className={classes.button}
            onClick={() => changeColor(lightGreen[500])}
          />
          <Route exact path="/dashboard" component={Items} />
          <Route
            exact
            path="/dashboard/tools/:id"
            render={props => <SingleTool {...props} />}
          />
          <Route exact path="/dashboard/mytools" component={MyTools} />
          <Route exact path="/dashboard/profile" component={UserProfile} />
        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  loggedInUser: state.login.loggedInUser,
  tools: state.login.tools,
  isLoading: state.login.isLoading,
  open: state.login.open,
  message: state.login.message,
  variant: state.login.variant
});

export default connect(
  mapStateToProps,
  { clearUser, getTools, handleClose }
)(withStyles(styles)(Dashboard));

import React from "react";
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
import {
  clearUser,
  getTools,
  handleClose,
  handleSearchChange,
  handleSearch
} from "../../store/actions";
import { mainListItems } from "../../components/MenuList";
import Items from "../../components/Items";
import MyTools from "../../components/MyTools";
import RentedTools from "../../components/RentedTools";
import SingleTool from "../../components/SingleTool";
import { Route } from "react-router-dom";
import Loader from "../../components/Loader";
import UserProfile from "../../components/UserProfile";
import lightGreen from "@material-ui/core/colors/lightGreen";
import indigo from "@material-ui/core/colors/indigo";
import brown from "@material-ui/core/colors/brown";
import teal from "@material-ui/core/colors/teal";
import cyan from "@material-ui/core/colors/cyan";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import Button from "@material-ui/core/Button";
import Snack from "../../components/Snack";
import { fade } from "@material-ui/core/styles/colorManipulator";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import MapClient from "../../components/Map";
const drawerWidth = 240;

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
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
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  marginSpace: {
    marginBottom: 20
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
      variant,
      handleSearchChange,
      search,
      handleSearch
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
            {history.location.pathname === "/dashboard" ? (
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    handleSearch(search);
                  }}
                >
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                    onChange={handleSearchChange}
                    name="search"
                    value={search}
                  />
                </form>
              </div>
            ) : null}
            <div className={classes.grow} />

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
          <div className={classes.marginSpace}>
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
            <Button
              variant="contained"
              style={{ backgroundColor: blue[500] }}
              className={classes.button}
              onClick={() => changeColor(blue[500])}
            />
            <Button
              variant="contained"
              style={{ backgroundColor: cyan[500] }}
              className={classes.button}
              onClick={() => changeColor(cyan[500])}
            />
            <Button
              variant="contained"
              style={{ backgroundColor: teal[500] }}
              className={classes.button}
              onClick={() => changeColor(teal[500])}
            />
            <Button
              variant="contained"
              style={{ backgroundColor: brown[700] }}
              className={classes.button}
              onClick={() => changeColor(brown[700])}
            />
          </div>
          <Route exact path="/dashboard" component={Items} />
          <Route
            exact
            path="/dashboard/tools/:id"
            render={props => <SingleTool {...props} />}
          />
          <Route exact path="/dashboard/mytools" component={MyTools} />
          <Route exact path="/dashboard/profile" component={UserProfile} />
          <Route exact path="/dashboard/renting" component={RentedTools} />
          <Route exact path="/dashboard/map" component={MapClient} />
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.login.loggedInUser,
  tools: state.login.tools,
  isLoading: state.login.isLoading,
  open: state.login.open,
  message: state.login.message,
  variant: state.login.variant,
  search: state.login.search
});

export default connect(
  mapStateToProps,
  { clearUser, getTools, handleClose, handleSearchChange, handleSearch }
)(withStyles(styles)(Dashboard));

import React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import Modal from "../../components/Modal";
import {
  clearUser,
  getMyTools,
  deleteTool,
  populateForm
} from "../../store/actions";
import ModalUpload from "../ModalUpload";
import Carousel from "../Carousel";
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

class MyTools extends React.Component {
  componentDidMount = () => {
    this.props.getMyTools();
  };
  render() {
    const { classes, myTools, deleteTool, populateForm } = this.props;

    return (
      <>
        <Modal />
        <div className={classNames(classes.layout, classes.cardGrid)}>
          {/* End hero unit */}
          <Grid container spacing={40}>
            {myTools &&
              myTools.map(toolItem => {
                return (
                  <Grid item key={toolItem.id} xs={12} sm={6} md={4} lg={3}>
                    <Card className={classes.card}>
                      <Carousel toolImages={toolItem.images} />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {toolItem.name}
                        </Typography>
                        <Typography>{toolItem.description}</Typography>
                      </CardContent>
                      <CardActions>
                        <ModalUpload tool={toolItem.id} />

                        <Button
                          component={Link}
                          to={`/dashboard/tools/${toolItem.id}`}
                          size="small"
                          color="primary"
                        >
                          View
                        </Button>
                      </CardActions>
                      <CardActions>
                        <Button
                          onClick={() => populateForm(toolItem)}
                          size="small"
                          color="primary"
                        >
                          Edit
                        </Button>

                        <Button
                          onClick={() => deleteTool(toolItem.id)}
                          size="small"
                          color="primary"
                        >
                          Delete
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.login.loggedInUser,
  myTools: state.login.myTools
});

export default connect(
  mapStateToProps,
  { clearUser, getMyTools, deleteTool, populateForm }
)(withStyles(styles)(MyTools));

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
import { clearUser, getTools } from "../../store/actions";
import Badge from "@material-ui/core/Badge";
import Pagination from "../Pagination";
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
    flexGrow: 1,
    maxHeight: 100,
    minHeight: 100,
    overflow: "hidden"
  },
  avatar: {
    margin: 10
  },
  pagination: {
    textAlign: "center"
  }
});

class Items extends React.Component {
  componentDidMount = () => {
    this.props.getTools();
  };
  render() {
    const { classes, tools } = this.props;
    return (
      <>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          {/* End hero unit */}
          <Grid container spacing={40}>
            {tools.data &&
              tools.data.map(toolItem => {
                return (
                  <Grid item key={toolItem.id} xs={12} sm={6} md={4} lg={3}>
                    <Badge
                      badgeContent={
                        toolItem.isAvailable ? "AVAILABLE" : "NOT AVAILABLE"
                      }
                      color={toolItem.isAvailable ? "primary" : "secondary"}
                    >
                      <Card className={classes.card}>
                        <Carousel toolImages={toolItem.images} />
                        <CardContent className={classes.cardContent}>
                          <Typography gutterBottom variant="h5" component="h2">
                            {toolItem.name}
                          </Typography>
                          <Typography>{toolItem.description}</Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            component={Link}
                            to={`/dashboard/tools/${toolItem.id}`}
                            size="small"
                            color="primary"
                          >
                            View
                          </Button>
                        </CardActions>
                      </Card>
                    </Badge>
                  </Grid>
                );
              })}
          </Grid>
        </div>
        <Pagination />
      </>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.login.loggedInUser,
  tools: state.login.tools
});

export default connect(
  mapStateToProps,
  { clearUser, getTools }
)(withStyles(styles)(Items));

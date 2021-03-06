import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Carousel from "../Carousel";
import { getOneTool, rentTool } from "../../store/actions/index";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import Map from "../../components/Map";
const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden"
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  },
  title: {
    color: theme.palette.primary.light
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  },
  paperCarousel: {
    height: "100%",
    width: "40vw",
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  paper: {
    height: "100%",
    width: "40vw",
    padding: 20,
    textAlign: "center"
  },
  text: {
    padding: 30
  },
  map: {
    margin: "20px 45px"
  }
});

class SingleLineGridList extends React.Component {
  componentDidMount = () => {
    this.props.getOneTool(this.props.match.params.id);
  };
  render() {
    const { classes, oneTool, rentTool } = this.props;
    return (
      <>
        <Grid container className={classes.root} spacing={16}>
          <Grid item xs={12}>
            <Grid
              container
              className={classes.demo}
              justify="center"
              spacing={32}
            >
              <Grid item>
                <Paper className={classes.paperCarousel}>
                  {oneTool && oneTool.images ? (
                    <Badge
                      badgeContent={
                        oneTool.isAvailable ? "AVAILABLE" : "NOT AVAILABLE"
                      }
                      color={oneTool.isAvailable ? "primary" : "secondary"}
                    >
                      <Carousel toolImages={oneTool.images} />
                    </Badge>
                  ) : (
                    <h1>NO IMAGES FOUND</h1>
                  )}
                </Paper>
              </Grid>
              <Grid item>
                <Paper className={classes.paper}>
                  <Typography
                    className={classes.text}
                    component="h5"
                    variant="h5"
                  >
                    {oneTool.name}
                  </Typography>

                  <Typography variant="subtitle1" color="textSecondary">
                    {oneTool.category}
                  </Typography>
                  <Typography component="h5" variant="h5">
                    {oneTool.brand}
                  </Typography>
                  <Typography component="p">{oneTool.address}</Typography>
                  <Typography component="p">{oneTool.description}</Typography>
                  <Typography
                    className={classes.text}
                    color="primary"
                    component="h5"
                    variant="h5"
                  >
                    ${oneTool.dailyCost}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    disabled={!oneTool.isAvailable}
                    onClick={() => rentTool(oneTool.id)}
                  >
                    Rent Now!
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Paper className={classes.map} elevation={5}>
          <Map />
        </Paper>
      </>
    );
  }
}

SingleLineGridList.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  oneTool: state.login.oneTool
});
export default connect(
  mapStateToProps,
  { getOneTool, rentTool }
)(withStyles(styles)(SingleLineGridList));

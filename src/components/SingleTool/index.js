import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Carousel from "../Carousel";
import { getOneTool } from "../../store/actions/index";
import { connect } from "react-redux";
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
    padding: 20
  }
});

class SingleLineGridList extends React.Component {
  componentDidMount = () => {
    this.props.getOneTool(this.props.match.params.id);
  };
  render() {
    const { classes, oneTool } = this.props;
    return (
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
                  <Carousel toolImages={oneTool.images} />
                ) : (
                  <h1>NO IMAGES FOUND</h1>
                )}
              </Paper>
            </Grid>
            <Grid item>
              <Paper className={classes.paper}>
                <Typography component="h5" variant="h3">
                  {oneTool.name}
                </Typography>

                <Typography component="h5" variant="h3">
                  {oneTool.category}
                </Typography>
                <Typography component="h5" variant="h3">
                  {oneTool.brand}
                </Typography>
                <Typography component="h5" variant="h5">
                  {oneTool.address}
                </Typography>
                <Typography component="h5" variant="h6">
                  {oneTool.description}
                </Typography>
                <Typography component="h5" variant="h5">
                  ${oneTool.dailyCost}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
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
  { getOneTool }
)(withStyles(styles)(SingleLineGridList));

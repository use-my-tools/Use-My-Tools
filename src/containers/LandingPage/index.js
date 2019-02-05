import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Pagination from "../../components/Pagination";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import NavBar from "../../components/NavBar";
import { Link } from "react-router-dom";
import { getTools } from "../../store/actions";
import { connect } from "react-redux";
import Carousel from "../../components/Carousel";
const styles = theme => ({
  appBar: {
    position: "fixed"
  },
  grow: {
    flexGrow: 1
  },
  icon: {
    marginRight: theme.spacing.unit * 2
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
    paddingTop: 50
  },
  heroContent: {
    maxWidth: 600,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4
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
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6
  },
  link: {
    textDecoration: "none",
    color: "white"
  }
});

class LandingPage extends React.Component {
  componentDidMount = () => {
    this.props.getTools();
  };

  render() {
    const { classes, tools } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <NavBar />
        <main>
          {/* Hero unit */}
          <div className={classes.heroUnit}>
            <div className={classes.heroContent}>
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Use My Tool
              </Typography>
              <Typography
                variant="h6"
                align="center"
                color="textSecondary"
                paragraph
              >
                How many tools are just sitting around your house, not being
                used? Use My Tools is a revolutionary way to make some extra
                money on stuff you already own.
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={16} justify="center">
                  <Grid item>
                    <Button
                      component={Link}
                      to="/register"
                      variant="contained"
                      color="primary"
                    >
                      Sign Up Now!
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
          <div className={classNames(classes.layout, classes.cardGrid)}>
            {/* End hero unit */}
            <Grid container spacing={40}>
              {tools.data &&
                tools.data.map(tool => {
                  return (
                    <Grid item key={tool.id} xs={12} sm={6} md={4} lg={3}>
                      <Card className={classes.card}>
                        <Carousel toolImages={tool.images} />
                        <CardContent className={classes.cardContent}>
                          <Typography gutterBottom variant="h5" component="h2">
                            {tool.name}
                          </Typography>
                          <Typography>{tool.description}</Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            component={Link}
                            to={`/login`}
                            size="small"
                            color="primary"
                          >
                            View
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                })}
            </Grid>
          </div>
          <Pagination />
        </main>
        {/* Footer */}
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            Contact Us
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
            123 N. Main St
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
            New York City, NY 18054
          </Typography>
        </footer>
        {/* End footer */}
      </React.Fragment>
    );
  }
}

LandingPage.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  tools: state.login.tools,
  isLoading: state.login.isLoading
});

export default connect(
  mapStateToProps,
  { getTools }
)(withStyles(styles)(LandingPage));

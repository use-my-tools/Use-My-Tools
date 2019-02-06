import React from "react";
import { connect } from "react-redux";
import { getUserProfile, getAllUsers, reviewUser } from "../../store/actions";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import StarRatingComponent from "react-star-rating-component";
import Grid from "@material-ui/core/Grid";
import StarRatings from "react-star-ratings";

const styles = theme => ({
  card: {
    maxWidth: 345,
    marginBottom: 20
  },
  media: {
    height: 200
  },
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
    padding: 20
  },
  text: {
    padding: 30
  },
  reviews: {
    display: "block"
  }
});

class UserProfile extends React.Component {
  componentDidMount = () => {
    this.props.getUserProfile();
    this.props.getAllUsers();
  };

  changeRating = (newRating, name, id) => {
    if (newRating === 5) {
      this.props.reviewUser(newRating, "This guy is AWESOME!!!", id);
    } else if (newRating >= 3) {
      this.props.reviewUser(newRating, "He is Alright", id);
    } else {
      this.props.reviewUser(
        newRating,
        "This guy is TERRIBLE WOULOD NOT RECOMMEND",
        id
      );
    }
  };
  render() {
    const { userProfile, classes, allUsers } = this.props;
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
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={userProfile.url}
                    title="Contemplative Reptile"
                    alt="..."
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {userProfile && userProfile.firstname}{" "}
                      {userProfile && userProfile.lastname}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <StarRatingComponent
                    name="rate"
                    editing={false}
                    starCount={5}
                    starColor="yellow"
                    value={userProfile.stars}
                  />
                </CardActions>
              </Card>
            </Grid>
            <Grid item>
              {allUsers.data &&
                allUsers.data.map(user => (
                  <Card key={user.id} className={classes.card}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={user.url}
                        title="Contemplative Reptile"
                        alt="..."
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {user.firstname} {user.lastname}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <StarRatings
                        rating={user.stars}
                        starRatedColor="yellow"
                        changeRating={(newRating, name) =>
                          this.changeRating(newRating, name, user.id)
                        }
                        numberOfStars={5}
                        starDimension="20px"
                        name="rating"
                      />
                    </CardActions>
                    <CardActions className={classes.reviews}>
                      {user.reviews.map(review => (
                        <Typography component="h5">{review.review}</Typography>
                      ))}
                    </CardActions>
                  </Card>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  userProfile: state.login.userProfile,
  allUsers: state.login.allUsers
});

export default connect(
  mapStateToProps,
  { getUserProfile, getAllUsers, reviewUser }
)(withStyles(styles)(UserProfile));

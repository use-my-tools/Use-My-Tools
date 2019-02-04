import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { pagination } from "../../store/actions";
import { connect } from "react-redux";
const styles = {
  root: {
    maxWidth: 400,
    flexGrow: 1,
    margin: "0 auto"
  }
};

class DotsMobileStepper extends React.Component {
  state = {
    activeStep: 0
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));

    this.props.pagination(this.state.activeStep + 1);
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
    this.props.pagination(this.state.activeStep - 1);
  };

  render() {
    const { classes, theme, lastPage } = this.props;

    return (
      <MobileStepper
        variant="dots"
        steps={lastPage}
        position="static"
        activeStep={this.state.activeStep}
        className={classes.root}
        nextButton={
          <Button
            size="small"
            onClick={this.handleNext}
            disabled={this.state.activeStep === lastPage - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={this.handleBack}
            disabled={this.state.activeStep === 0}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    );
  }
}

DotsMobileStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  currentPage: state.login.currentPage,
  lastPage: state.login.lastPage
});

export default connect(
  mapStateToProps,
  { pagination }
)(withStyles(styles, { withTheme: true })(DotsMobileStepper));

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import ToolInfoForm from "../ToolInfoForm";
import DescriptionInput from "../DescriptionInput";
import Pricing from "../Pricing";
import {
  addNewTool,
  uploadImages,
  handleModalClose,
  editTool
} from "../../store/actions/index";
import { connect } from "react-redux";
const styles = theme => ({
  root: {
    width: "90%"
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2
  },
  resetContainer: {
    padding: theme.spacing.unit * 3
  }
});

function getSteps() {
  return ["Tool Information", "Description", "Prices"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <ToolInfoForm />;
    case 1:
      return <DescriptionInput />;
    case 2:
      return <Pricing />;
    // case 3:
    //   return <ImageUpload />;
    default:
      return "Unknown step";
  }
}

class VerticalLinearStepper extends React.Component {
  state = {
    activeStep: 0
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));

    if (this.state.activeStep === getSteps().length - 1) {
      if (this.props.isEditing) {
        this.props.editTool(this.props.tool);
      } else {
        this.props.addNewTool(this.props.tool);
      }

      this.props.handleModalClose();
    }
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  handleDisabledButton = () => {
    const { tool } = this.props;
    if (this.state.activeStep === 0) {
      if (!tool.name || !tool.brand || !tool.category || !tool.address) {
        return true;
      }
    } else if (this.state.activeStep === 1) {
      if (!tool.description) {
        return true;
      }
    } else if (this.state.activeStep === 2) {
      if (!tool.dailyCost || !tool.deposit) {
        return true;
      }
    }
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                {getStepContent(index)}
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button
                      disabled={this.handleDisabledButton()}
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1
                        ? "Add Tool Info"
                        : "Next"}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </div>
    );
  }
}

VerticalLinearStepper.propTypes = {
  classes: PropTypes.object
};

const mapStateToProps = state => ({
  tool: state.login.tool,
  isEditing: state.login.isEditing
});

export default connect(
  mapStateToProps,
  { addNewTool, uploadImages, handleModalClose, editTool }
)(withStyles(styles)(VerticalLinearStepper));

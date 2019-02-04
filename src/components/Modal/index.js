import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Stepper from "../Stepper";
import ImageUpload from "../ImageUpload";
import {
  clearTool,
  handleModalOpen,
  handleModalClose
} from "../../store/actions/index";

import { connect } from "react-redux";
function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  }
});

class SimpleModal extends React.Component {
  handleOpen = () => {
    this.props.handleModalOpen();
  };

  handleClose = () => {
    this.props.handleModalClose();
    this.props.clearTool();
  };

  render() {
    const { classes, modalOpen, title, tool_id, tool } = this.props;

    return (
      <div>
        <Button onClick={this.handleOpen}>
          {title ? title : "Add New Tool"}
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={modalOpen}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            {this.props.upload ? (
              <ImageUpload tool_id={tool_id} tool={tool} />
            ) : (
              <Stepper />
            )}
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  modalOpen: state.login.modalOpen
});
// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default connect(
  mapStateToProps,
  { clearTool, handleModalOpen, handleModalClose }
)(SimpleModalWrapped);

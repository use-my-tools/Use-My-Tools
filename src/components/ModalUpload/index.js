import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import ImageUpload from "../ImageUpload";
import {
  clearTool,
  handleModalUploadOpen,
  handleModalUploadClose,
  handleUploadId
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
    this.props.handleModalUploadOpen();
  };

  handleClose = () => {
    this.props.handleModalUploadClose();
    this.props.clearTool();
  };

  render() {
    const { classes, modalUploadOpen, tool, handleUploadId } = this.props;
    return (
      <div>
        <Button
          onClick={() => {
            handleUploadId(tool);
            console.log(tool);
            this.handleOpen();
          }}
          size="small"
          color="primary"
        >
          Upload Images
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={modalUploadOpen}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <ImageUpload toolItem={tool} />
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
  modalUploadOpen: state.login.modalUploadOpen
});
// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default connect(
  mapStateToProps,
  { clearTool, handleModalUploadOpen, handleModalUploadClose, handleUploadId }
)(SimpleModalWrapped);

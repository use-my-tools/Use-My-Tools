import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { uploadImages, handleFileChange } from "../../store/actions/index";
import { connect } from "react-redux";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

const ImageUpload = props => {
  const { classes, uploadImages, handleFileChange, tool, uploadingTo } = props;

  return (
    <>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        name="image"
        onChange={handleFileChange}
      />
      <label htmlFor="contained-button-file">
        <Button component="span" className={classes.button}>
          Choose Image
        </Button>
      </label>
      <Button
        onClick={() => {
          uploadImages(uploadingTo, tool.image);
        }}
        type="submit"
        className={classes.button}
        component="span"
        variant="contained"
      >
        Upload
      </Button>
    </>
  );
};

const mapStateToProps = state => ({
  tool: state.login.tool,
  uploadingTo: state.login.uploadingTo
});

export default connect(
  mapStateToProps,
  { uploadImages, handleFileChange }
)(withStyles(styles)(ImageUpload));

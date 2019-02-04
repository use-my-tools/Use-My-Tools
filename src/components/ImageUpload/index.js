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
  const { classes, uploadImages, handleFileChange } = props;

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
        <Button variant="contained" component="span" className={classes.button}>
          Upload
        </Button>
      </label>
    </>
  );
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { uploadImages, handleFileChange }
)(withStyles(styles)(ImageUpload));

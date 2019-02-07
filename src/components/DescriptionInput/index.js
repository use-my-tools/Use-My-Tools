import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { handleToolChange } from "../../store/actions/index";
const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
});

const DescriptionInput = props => {
  const { classes, handleToolChange, tool } = props;

  return (
    <TextField
      id="standard-multiline-flexible"
      label="Write a brief description"
      multiline
      rowsMax="4"
      className={classes.textField}
      margin="normal"
      name="description"
      value={tool.description}
      onChange={handleToolChange}
    />
  );
};

const mapStateToProps = state => ({
  tool: state.login.tool
});
export default connect(
  mapStateToProps,
  { handleToolChange }
)(withStyles(styles)(DescriptionInput));

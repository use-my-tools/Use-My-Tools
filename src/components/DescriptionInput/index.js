import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

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
  const { classes } = props;

  return (
    <TextField
      id="standard-multiline-flexible"
      label="Write a brief description"
      multiline
      rowsMax="4"
      className={classes.textField}
      margin="normal"
    />
  );
};

export default withStyles(styles)(DescriptionInput);

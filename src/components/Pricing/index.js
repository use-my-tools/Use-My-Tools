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
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
});

const Pricing = props => {
  const { classes } = props;

  return (
    <>
      <TextField
        id="filled-number"
        label="Daily Cost"
        type="number"
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
        margin="normal"
        variant="filled"
      />
      <TextField
        id="filled-number"
        label="Deposit Amount"
        type="number"
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
        margin="normal"
        variant="filled"
      />
    </>
  );
};

export default withStyles(styles)(Pricing);

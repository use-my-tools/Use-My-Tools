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
  const { classes, handleToolChange, tool } = props;

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
        name="dailyCost"
        value={tool.dailyCost}
        onChange={handleToolChange}
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
        name="deposit"
        value={tool.deposit}
        onChange={handleToolChange}
      />
    </>
  );
};

const mapStateToProps = state => ({
  tool: state.login.tool
});

export default connect(
  mapStateToProps,
  { handleToolChange }
)(withStyles(styles)(Pricing));

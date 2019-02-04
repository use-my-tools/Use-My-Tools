import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { addNewTool, handleToolChange } from "../../store/actions";
import { connect } from "react-redux";
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

class TextFields extends React.Component {
  render() {
    const { classes, tool, addNewTool, handleToolChange } = this.props;

    return (
      <form
        onSubmit={() => addNewTool(tool)}
        className={classes.container}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="standard-name"
          label="Name"
          className={classes.textField}
          margin="normal"
          name="name"
          value={tool.name}
          onChange={handleToolChange}
          required
        />

        <TextField
          id="standard-uncontrolled"
          label="Brand"
          className={classes.textField}
          margin="normal"
          name="brand"
          value={tool.brand}
          onChange={handleToolChange}
        />
        <TextField
          id="standard-uncontrolled"
          label="Category"
          className={classes.textField}
          margin="normal"
          name="category"
          value={tool.category}
          onChange={handleToolChange}
        />
        <TextField
          id="standard-uncontrolled"
          label="Address"
          className={classes.textField}
          margin="normal"
          name="address"
          value={tool.address}
          onChange={handleToolChange}
        />
      </form>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired
};

const maspStateToProps = state => ({
  tool: state.login.tool
});

export default connect(
  maspStateToProps,
  { addNewTool, handleToolChange }
)(withStyles(styles)(TextFields));

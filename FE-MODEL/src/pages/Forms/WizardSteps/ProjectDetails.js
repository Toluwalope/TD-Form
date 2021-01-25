import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "../../../components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";

import customSelectStyle from "../../../assets/jss/material-dashboard-pro-react/customSelectStyle.js";
import customCheckboxRadioSwitch from "../../../assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.js";

import CustomSelect from "../../../components/CustomSelect/CustomSelect";
import * as employeeService from "../../../services/nexService";

const style = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center",
  },
  inputAdornmentIcon: {
    color: "#555",
  },
  choiche: {
    textAlign: "center",
    cursor: "pointer",
    marginTop: "20px",
  },
  ...customSelectStyle,
  ...customCheckboxRadioSwitch,
};

class ProjectDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectType: "",
      projectTypeState: "",
      projectSubCategory: "",
      projectSubCategoryState: "",
      currency: "",
      currencyState: "",
    };
  }

  componentDidMount() {
    if (this.props.data)
      this.setState({
        ...this.props.data,
      });
    console.log(this.props);
  }
  sendState() {
    return this.state;
  }
  // function that returns true if value is email, false otherwise
  verifyEmail(value) {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  }
  // function that verifies if a string has a given length or not
  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }
  change(event, stateName, type, stateNameEqualTo) {
    switch (type) {
      case "email":
        if (this.verifyEmail(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "length":
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      default:
        break;
    }
    this.setState({ [stateName]: event.target.value });
  }
  isValidated() {
    {
      /* 
    if (
      this.state.projectTypeState === "success" &&
      this.state.projectSubCategoryState === "success" &&
      this.state.currencyState === "success"
    ) {
      return true;
    } else {
      if (this.state.projectTypeState !== "success") {
        this.setState({ projectTypeState: "error" });
      }
      if (this.state.projectSubCategoryState !== "success") {
        this.setState({ projectSubCategoryState: "error" });
      }
      if (this.state.currencyState !== "success") {
        this.setState({ currencyState: "error" });
      }
    }
    */
    }
    return true;
  }

  handleChange = (event, nameState) => {
    this.setState({ [nameState]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12}>
          <h4 className={classes.infoText}>
            Please enter your project details
          </h4>
        </GridItem>
        <GridItem xs={9} sm={5}>
          <CustomSelect
            name="projectType"
            label="Project Type"
            value={this.state.projectType}
            onChange={(event) => this.handleChange(event, "projectType")}
            options={employeeService.getProjectTypeCollection()}
          />

          <CustomSelect
            name="projectSubCategory"
            label="Project Sub-Category"
            value={this.state.projectSubCategory}
            onChange={(event) => this.handleChange(event, "projectSubCategory")}
            options={employeeService.getProjectSubCategoryCollection()}
          />

          <CustomSelect
            name="currency"
            label="Currency"
            value={this.state.currency}
            onChange={(event) => this.handleChange(event, "currency")}
            options={employeeService.getCurrencyCollection()}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

ProjectDetails.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(style)(ProjectDetails);

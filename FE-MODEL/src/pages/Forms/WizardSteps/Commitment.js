import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import BusinessIcon from "@material-ui/icons/Business";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Switch from "@material-ui/core/Switch";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { Typography } from '@material-ui/core';

import Tooltip from "@material-ui/core/Tooltip";

// core components
import GridContainer from "../../../components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";
import InputAdornment from "@material-ui/core/InputAdornment";

import customSelectStyle from "../../../assets/jss/material-dashboard-pro-react/customSelectStyle.js";
import customCheckboxRadioSwitch from "../../../assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.js";

import CustomInput from "../../../components/CustomInput/CustomInput.js";
import CustomSelect from "../../../components/CustomSelect/CustomSelect";
import * as employeeService from "../../../services/nexService";
import { Grid } from "@material-ui/core";

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
  radButtonStyle: {
    fontSize: "69px",
  },
  formControlLabel: {
    fontSize: '0.6rem', 
   '& label': { fontSize: '0.6rem' }
  },
  ...customSelectStyle,
  ...customCheckboxRadioSwitch,
};

class Commitment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bmConducted: false,
      disableOtherPenalty: true,

      varBmIncluded: false,
      bmDecisionBasis: false,
      transparencyDecisionBasis: "",
      commitmentToSetSuppliers: false,

      commitmentToNegotiationProcess: "",
      commitmentToNegotiationOutcome: "",
      commitmentInSupplierComm: "",
      modeSupplierComm: "",
      deliverySupplierComm: "",
      modeNegotiationEvent: "",
      strategicImportanceForClient: "",
    };
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

  handleBmConductedOnChange = (event) => {
    if (event.target.checked === true) {
        this.setState({
          disableOtherPenalty: false,
        });
      } else {
        this.setState({
            varBmIncluded: false,
            bmDecisionBasis: false,
          disableOtherPenalty: true,
        });
      }
    this.setState({ bmConducted: event.target.checked })
  }

  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify="center">
        <GridItem xs={12}>
          <h4 className={classes.infoText}>
            Please enter your project commitment
          </h4>
        </GridItem>
        <GridItem xs={12} sm={5}>
          <GridContainer xs={12} sm={12} direction="row" alignItems="center"  style={{padding: "18px 0px 0px 0px"}}>
            <GridItem xs={10}>
              <FormControlLabel
                style={{ fontSize: '500px'}}
                control={
                  <Switch
                    checked={this.state.bmConducted}
                    onChange={this.handleBmConductedOnChange
                    }
                    value="bmConducted"
                    classes={{
                      switchBase: classes.switchBase,
                      checked: classes.switchChecked,
                      thumb: classes.switchIcon,
                      track: classes.switchBar,
                    }}
                  />
                }
                classes={{
                  label: classes.label,
                  fontSize: '50px',
                }}
                label={<Typography style={{fontSize: "12px"}}>Bonus/Penalty Conducted</Typography>}
              />
            </GridItem>
         
          </GridContainer>
        </GridItem>
        <GridItem xs={12} sm={5}>
          <GridContainer xs={12} sm={12} direction="row" alignItems="center"  style={{padding: "18px 0px 0px 0px"}}>
            <GridItem xs={10}>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.varBmIncluded}
                    onChange={(event) =>
                      this.setState({ varBmIncluded: event.target.checked })
                    }
                    value="varBmIncluded"
                    classes={{
                      switchBase: classes.switchBase,
                      checked: classes.switchChecked,
                      thumb: classes.switchIcon,
                      track: classes.switchBar,
                    }}
                    disabled={this.state.disableOtherPenalty}
                  />
                }
                classes={{
                  label: classes.label,
                }}
                label={<Typography style={{fontSize: "12px"}}>Variable Bonus/Penalty Included</Typography>}
              />
            </GridItem>
           
          </GridContainer>
        </GridItem>
        <GridItem xs={12} sm={5}>
          <GridContainer xs={12} sm={12} direction="row" alignItems="center"  style={{padding: "18px 0px 0px 0px"}}>
            <GridItem xs={10}>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.bmDecisionBasis}
                    onChange={(event) =>
                      this.setState({ bmDecisionBasis: event.target.checked })
                    }
                    value="bmDecisionBasis"
                    classes={{
                      switchBase: classes.switchBase,
                      checked: classes.switchChecked,
                      thumb: classes.switchIcon,
                      track: classes.switchBar,
                    }}
                    disabled={this.state.disableOtherPenalty}
                  />
                }
                classes={{
                  label: classes.label,
                }}
                label={<Typography style={{fontSize: "12px"}}>Bonus/Penalty Used for Decision Basis</Typography>}
              />
            </GridItem>
            
          </GridContainer>
        </GridItem>

        <GridItem xs={12} sm={5}>
          <GridContainer xs={12} sm={12} direction="row" alignItems="center"  style={{padding: "18px 0px 0px 0px"}}>
            <GridItem xs={10}>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.commitmentToSetSuppliers}
                    onChange={(event) =>
                      this.setState({
                        commitmentToSetSuppliers: event.target.checked,
                      })
                    }
                    value="commitmentToSetSuppliers"
                    classes={{
                      switchBase: classes.switchBase,
                      checked: classes.switchChecked,
                      thumb: classes.switchIcon,
                      track: classes.switchBar,
                    }}
                  />
                }
                classes={{
                  label: classes.label,
                }}
                label={<Typography style={{fontSize: "12px"}}>Commitment to Set of Suppliers</Typography>}
              />
            </GridItem>
           
          </GridContainer>
        </GridItem>

        <GridItem xs={12} sm={5}>
          <GridContainer xs={12} sm={12} direction="row" alignItems="center">
            <GridItem xs={10}>
              <CustomSelect
                name="transparencyDecisionBasis"
                label="Transparency of Decision Basis"
                value={this.state.transparencyDecisionBasis}
                onChange={(event) =>
                  this.handleChange(event, "transparencyDecisionBasis")
                }
                options={employeeService.getTransparencyDecisionBasis()}
              />
            </GridItem>
            
          </GridContainer>
        </GridItem>

        <GridItem xs={12} sm={5}>
          <GridContainer xs={12} sm={12} direction="row" alignItems="center">
            <GridItem xs={10}>
              <CustomSelect
                name="commitmentToNegotiationProcess"
                label="Commitment to Negotiation Process"
                value={this.state.commitmentToNegotiationProcess}
                onChange={(event) =>
                  this.handleChange(event, "commitmentToNegotiationProcess")
                }
                options={employeeService.getCommitmentToNegotiationProcess()}
              />
            </GridItem>
            
          </GridContainer>
        </GridItem>

        <GridItem xs={12} sm={5}>
          <GridContainer xs={12} sm={12} direction="row" alignItems="center">
            <GridItem xs={10}>
              <CustomSelect
                name="commitmentToNegotiationOutcome"
                label="Commitment to Negotiation Outcome"
                value={this.state.commitmentToNegotiationOutcome}
                onChange={(event) =>
                  this.handleChange(event, "commitmentToNegotiationOutcome")
                }
                options={employeeService.getCommitmentToNegotiationOutcome()}
              />
            </GridItem>
            
          </GridContainer>
        </GridItem>

        <GridItem xs={12} sm={5}>
          <GridContainer xs={12} sm={12} direction="row" alignItems="center">
            <GridItem xs={10}>
              <CustomSelect
                name="commitmentInSupplierComm"
                label="Commitment in Supplier Communication"
                value={this.state.commitmentInSupplierComm}
                onChange={(event) =>
                  this.handleChange(event, "commitmentInSupplierComm")
                }
                options={employeeService.getCommitmentInSupplierComm()}
              />
            </GridItem>
            
          </GridContainer>
        </GridItem>

        <GridItem xs={12} sm={5}>
          <GridContainer xs={12} sm={12} direction="row" alignItems="center">
            <GridItem xs={10}>
              <CustomSelect
                name="modeSupplierComm"
                label="Mode of Supplier Communication"
                value={this.state.modeSupplierComm}
                onChange={(event) =>
                  this.handleChange(event, "modeSupplierComm")
                }
                options={employeeService.getModeSupplierComm()}
              />
            </GridItem>
            
          </GridContainer>
        </GridItem>

        <GridItem xs={12} sm={5}>
          <GridContainer xs={12} sm={12} direction="row" alignItems="center">
            <GridItem xs={10}>
              <CustomSelect
                name="deliverySupplierComm"
                label="Delivery of Supplier Communication"
                value={this.state.deliverySupplierComm}
                onChange={(event) =>
                  this.handleChange(event, "deliverySupplierComm")
                }
                options={employeeService.getDeliverySupplierComm()}
              />
            </GridItem>
           
          </GridContainer>
        </GridItem>

        <GridItem xs={12} sm={5}>
          <GridContainer xs={12} sm={12} direction="row" alignItems="center">
            <GridItem xs={10}>
              <CustomSelect
                name="modeNegotiationEvent"
                label="Mode of Negotiation Event"
                value={this.state.modeNegotiationEvent}
                onChange={(event) =>
                  this.handleChange(event, "modeNegotiationEvent")
                }
                options={employeeService.getModeNegotiationEvent()}
              />
            </GridItem>
            
          </GridContainer>
        </GridItem>

        <GridItem xs={12} sm={5}>
          <GridContainer xs={12} sm={12} direction="row" alignItems="center">
            <GridItem xs={10}>
              <CustomSelect
                name="strategicImportanceForClient"
                label="Strategic Importance for Client"
                value={this.state.strategicImportanceForClient}
                onChange={(event) =>
                  this.handleChange(event, "strategicImportanceForClient")
                }
                options={employeeService.getStrategicImportanceForClient()}
              />
            </GridItem>
            
          </GridContainer>
        </GridItem>

        {/* 
        <GridItem xs={12} sm={4}>
          <div
            className={
              classes.checkboxAndRadio +
              " " +
              classes.checkboxAndRadioHorizontal
            }
          >
            <FormControlLabel
              control={
                <Radio
                  checked={this.state.selectedEnabled === "a"}
                  onChange={(event) => this.handleChangeEnabled(event, "selectedEnabled")}
                  value="a"
                  name="radio button enabled"
                  aria-label="A"
                  icon={
                    <FiberManualRecord className={classes.radioUnchecked} />
                  }
                  checkedIcon={
                    <FiberManualRecord className={classes.radioChecked} />
                  }
                  classes={{
                    checked: classes.radio,
                    root: classes.radioRoot,
                  }}
                />
              }
              classes={{
                label: classes.label,
                root: classes.labelRoot,
              }}
              label="First Radio"
            />
          </div>
          <div
            className={
              classes.checkboxAndRadio +
              " " +
              classes.checkboxAndRadioHorizontal
            }
          >
            <FormControlLabel
              control={
                <Radio
                  checked={this.state.selectedEnabled === "b"}
                  onChange={(event) => this.handleChangeEnabled(event, "selectedEnabled")}
                  value="b"
                  name="radio button enabled"
                  aria-label="B"
                  icon={
                    <FiberManualRecord className={classes.radioUnchecked} />
                  }
                  checkedIcon={
                    <FiberManualRecord className={classes.radioChecked} />
                  }
                  classes={{
                    checked: classes.radio,
                    root: classes.radioRoot,
                  }}
                />
              }
              classes={{
                label: classes.label,
                root: classes.labelRoot,
              }}
              label="Second Radio"
            />
          </div>
        </GridItem>
            */}
      </GridContainer>
    );
  }
}

Commitment.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(style)(Commitment);

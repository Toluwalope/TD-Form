import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

// core components
import CustomInput from "../../../components/CustomInput/CustomInput.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";

import customSelectStyle from "../../../assets/jss/material-dashboard-pro-react/customSelectStyle.js";
import customCheckboxRadioSwitch from "../../../assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.js";

import { Typography } from "@material-ui/core";

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

class Commercials extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bestInitialTransferPrice: "",
      bestInitialComparisonPrice: "",
      finalComparisonPrice: "",

      numberOfBaskets: 0,
      numberOfBasketsState: "",

      shorttermSavingsIncludedInCP: false,

      shortTermSavingsYear1: "",
      shortTermSavingsYear2: "",
      shortTermSavingsYear3: "",
      shortTermSavingsYear4: "",
      shortTermSavingsYear5: "",
      disable: true,
    };
  }
  sendState() {
    return this.state;
  }

  change(event, stateName, type, stateNameEqualTo) {
    console.log(this.props);
    this.setState({ [stateName]: event.target.value });
  }

  handleSimple = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleShortTermSavingsChange = (event) => {
    if (event.target.checked) {
      this.setState({
        disable: false,
      });
    } else {
      this.setState({
        shortTermSavingsYear1: "",
        shortTermSavingsYear2: "",
        shortTermSavingsYear3: "",
        shortTermSavingsYear4: "",
        shortTermSavingsYear5: "",
        disable: true,
      });
    }
    this.setState({ shorttermSavingsIncludedInCP: event.target.checked });
  };

  // function that verifies if value contains only numbers
  verifyNumber = (value) => {
    var numberRex = new RegExp("^[0-9]+$");
    var rangeVal = value >= 0 && value <= 10;
    if (numberRex.test(value) && rangeVal) {
      return true;
    }
    return false;
  };

  isValidated() {
    if (this.state.numberOfBasketsState === "success") {
      return true;
    } else {
      if (this.state.numberOfBasketsState !== "success") {
        this.setState({ numberOfBasketsState: "error" });
      }
    }
    return true;
  }

  change(event, stateName, type, stateNameEqualTo) {
    switch (type) {
      case "number":
        if (this.verifyNumber(event.target.value)) {
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

  typeClick = () => {
    if (this.state.numberOfBasketsState === "") {
      this.setState({ numberOfBasketsState: "error" });
    }
  };

  render() {
    const { classes, allStates } = this.props;
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12}>
          <h4 className={classes.infoText}>
            How about filling in the Commercial section
          </h4>
        </GridItem>

        <GridItem xs={12} sm={5}>
          <GridContainer xs={12} sm={12} direction="row" alignItems="center">
            <GridItem xs={10}>
              <CustomInput
                labelText="Best Initial Transfer Price"
                id="bestInitialTransferPrice"
                formControlProps={{
                  fullWidth: true,
                }}
              />
            </GridItem>
           
          </GridContainer>
        </GridItem>
        <GridItem xs={12} sm={5}>
          <GridContainer xs={12} sm={12} direction="row" alignItems="center">
            <GridItem xs={10}>
              <CustomInput
                labelText="Short Term Savings Year 1"
                id="shortTermSavingsYear1"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  onChange: (event) =>
                    this.change(event, "shortTermSavingsYear1", "length", 3),
                }}
                value={this.state.shortTermSavingsYear1}
                disabled={this.state.disable}
              />
            </GridItem>
            
          </GridContainer>
        </GridItem>

        <GridItem xs={12} sm={5}>
          <GridContainer xs={12} sm={12} direction="row" alignItems="center">
            <GridItem xs={10}>
              <CustomInput
                labelText="Best Initial Comparison Price"
                id="bestInitialComparisonPrice"
                formControlProps={{
                  fullWidth: true,
                }}
              />
            </GridItem>
           
          </GridContainer>
        </GridItem>
        <GridItem xs={12} sm={5}>
          <GridContainer xs={12} sm={12} direction="row" alignItems="center">
            <GridItem xs={10}>
              <CustomInput
                labelText="Short Term Savings Year 2"
                id="shortTermSavingsYear2"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  onChange: (event) =>
                    this.change(event, "shortTermSavingsYear2", "length", 3),
                }}
                value={this.state.shortTermSavingsYear2}
                disabled={this.state.disable}
              />
            </GridItem>
           
          </GridContainer>
        </GridItem>

        <GridItem xs={12} sm={5}>
          <GridContainer xs={12} sm={12} direction="row" alignItems="center">
            <GridItem xs={10}>
              <CustomInput
                labelText="Final Comparison Price"
                id="finalComparisonPrice"
                formControlProps={{
                  fullWidth: true,
                }}
              />
            </GridItem>
           
          </GridContainer>
        </GridItem>

        <GridItem xs={12} sm={5}>
          <GridContainer xs={12} sm={12} direction="row" alignItems="center">
            <GridItem xs={10}>
              <CustomInput
                labelText="Short Term Savings Year 3"
                id="shortTermSavingsYear3"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  onChange: (event) =>
                    this.change(event, "shortTermSavingsYear3", "length", 3),
                }}
                value={this.state.shortTermSavingsYear3}
                disabled={this.state.disable}
              />
            </GridItem>
           
          </GridContainer>
        </GridItem>

        {/* 
        <GridItem xs={12} sm={5}>
        <GridContainer xs={12} sm={12} direction="row" alignItems="center">
            <GridItem xs={10}>
          <CustomInput
            success={this.state.numberOfBasketsState === "success"}
            error={this.state.numberOfBasketsState === "error"}
            labelText="Number of Baskets"
            id="numberOfBaskets"
            type="number"
            inputProps={{
              onChange: (event) =>
                this.change(event, "numberOfBaskets", "number"),
            }}
            formControlProps={{
              fullWidth: true,
            }}
            minVal={0}
            maxVal={10}
          />
          </GridItem>
          </GridContainer>
        
        </GridItem>
            */}

        <GridItem xs={12} sm={5} alignContent="center" >
          <GridContainer xs={12} sm={12} direction="row" alignItems="center"  style={{padding: "18px 0px 0px 0px"}}>
            <GridItem xs={10}>
              <FormControlLabel
                control={
                  <Switch 
                    checked={this.state.shorttermSavingsIncludedInCP}
                    onChange={this.handleShortTermSavingsChange}
                    value="shorttermSavingsIncludedInCP"
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
                label={<Typography style={{fontSize: "12px"}}>Short-Term Savings Included in CP</Typography>}
              />
            </GridItem>
           
          </GridContainer>
        </GridItem>

        <GridItem xs={12} sm={5}>
          <GridContainer xs={12} sm={12} direction="row" alignItems="center">
            <GridItem xs={10}>
              <CustomInput
                labelText="Short Term Savings Year 4"
                id="shortTermSavingsYear4"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  onChange: (event) =>
                    this.change(event, "shortTermSavingsYear4", "length", 3),
                }}
                value={this.state.shortTermSavingsYear4}
                disabled={this.state.disable}
              />
            </GridItem>
           
          </GridContainer>
        </GridItem>

        {/*
        <GridItem xs={12} sm={5}>
          <FormControlLabel
            control={
              <Switch
                checked={this.state.checkedA}
                onChange={(event) => this.setCheckedA(event.target.checked)}
                value="checkedA"
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
            label="Toggle is on"
          />
        </GridItem>
        */}

        <GridItem xs={12} sm={5}></GridItem>
        <GridItem xs={12} sm={5}>
          <GridContainer xs={12} sm={12} direction="row" alignItems="center">
            <GridItem xs={10}>
              <CustomInput
                labelText="Short Term Savings Year 5"
                id="shortTermSavingsYear5"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  onChange: (event) =>
                    this.change(event, "shortTermSavingsYear5", "length", 3),
                }}
                value={this.state.shortTermSavingsYear5}
                disabled={this.state.disable}
              />
            </GridItem>
            
          </GridContainer>
        </GridItem>

        {/*
        <GridItem xs={12} sm={5}>
          <FormControl fullWidth className={classes.selectFormControl}>
            <InputLabel htmlFor="simple-select" className={classes.selectLabel}>
              Choose City
            </InputLabel>
            <Select
              MenuProps={{
                className: classes.selectMenu
              }}
              classes={{
                select: classes.select
              }}
              value={this.state.simpleSelect}
              onChange={this.handleSimple}
              inputProps={{
                name: "simpleSelect",
                id: "simple-select"
              }}
            >
              <MenuItem
                disabled
                classes={{
                  root: classes.selectMenuItem
                }}
              >
                Country
              </MenuItem>
              <MenuItem
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="2"
              >
                France
              </MenuItem>
              <MenuItem
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="3"
              >
                Romania
              </MenuItem>
            </Select>
          </FormControl>
        </GridItem>
         */}
      </GridContainer>
    );
  }
}

Commercials.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(style)(Commercials);

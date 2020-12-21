import React from "react";

import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import FormControl from "@material-ui/core/FormControl";


// core components
import GridContainer from "../../../components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";

import customSelectStyle from "../../../assets/jss/material-dashboard-pro-react/customSelectStyle.js";
import customCheckboxRadioSwitch from "../../../assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.js";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

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
  dateStyle: {
    fontSize: "40px",
  },
  ...customSelectStyle,
  ...customCheckboxRadioSwitch,
};

class ProjectTimeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      releaseDate: new Date('2021-01-01T21:11:54'),
      responseDate: new Date('2021-01-01T21:11:54'),
      negotiationSignOffDate: new Date('2021-01-01T21:11:54'),
      supplierCommDate: new Date('2021-01-01T21:11:54'),
      iniPlannedNegotiationEndDate: new Date('2021-01-01T21:11:54'),
      negotiationStartDate: new Date('2021-01-01T21:11:54'),
      negotiationEndDate: new Date('2021-01-01T21:11:54'),
    };
  }

  sendState() {
    return this.state;
  }

  handleDateChange(date, name) {
    this.setState({
      [name]: date,
    });
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
    return true;
  }
  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12}>
          <h4 className={classes.infoText}>
            Please enter your project timeline
          </h4>
        </GridItem>
        
        <GridItem xs={12} sm={5}>
          {/*<InputLabel className={classes.label}>Date Picker</InputLabel>*/}

          <GridContainer xs={12} sm={12} direction="row" alignItems="center">
            <GridItem xs={10}>
              <FormControl fullWidth >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                  
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Release Date Initial RFQ"
                    value={this.state.releaseDate}
                    onChange={(date) =>
                      this.handleDateChange(date, "releaseDate")
                    }
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </FormControl>
            </GridItem>

           
          </GridContainer>

          <GridContainer xs={12} sm={12} direction="row" alignItems="center">
            <GridItem xs={10}>
              <FormControl fullWidth> 
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Response Date Final RFQ"
                    value={this.state.responseDate}
                    onChange={(date) =>
                      this.handleDateChange(date, "responseDate")
                    }
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </FormControl>
            </GridItem>
           
          </GridContainer>
          <GridContainer xs={12} sm={12} direction="row" alignItems="center">
            <GridItem xs={10}>
              <FormControl fullWidth>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Negotiation Sign-Off"
                    value={this.state.negotiationSignOffDate}
                    onChange={(date) =>
                      this.handleDateChange(date, "negotiationSignOffDate")
                    }
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </FormControl>
            </GridItem>
          
          </GridContainer>

          <GridContainer xs={12} sm={12} direction="row" alignItems="center">
            <GridItem xs={10}>
              <FormControl fullWidth>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Supplier Communication Date"
                    value={this.state.supplierCommDate}
                    onChange={(date) =>
                      this.handleDateChange(date, "supplierCommDate")
                    }
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </FormControl>
            </GridItem>
           
          </GridContainer>
        </GridItem>
        <GridItem xs={12} sm={5}>
          {/*<InputLabel className={classes.label}>Date Picker</InputLabel>*/}
              <GridContainer
                xs={12}
                sm={12}
                direction="row"
                alignItems="center"
              >
                <GridItem xs={10}>
                  <FormControl fullWidth>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Initially Planned Negotiation End Date"
                        value={this.state.iniPlannedNegotiationEndDate}
                        onChange={(date) =>
                          this.handleDateChange(
                            date,
                            "iniPlannedNegotiationEndDate"
                          )
                        }
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </FormControl>
                </GridItem>
                
              </GridContainer>

              <GridContainer
                xs={12}
                sm={12}
                direction="row"
                alignItems="center"
              >
                <GridItem xs={10}>
                  <FormControl fullWidth>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Negotiation Start Date"
                        value={this.state.negotiationStartDate}
                        onChange={(date) =>
                          this.handleDateChange(date, "negotiationStartDate")
                        }
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </FormControl>
                </GridItem>
               
              </GridContainer>

              <GridContainer
                xs={12}
                sm={12}
                direction="row"
                alignItems="center"
              >
                <GridItem xs={10}>
                  <FormControl fullWidth>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Negotiation End Date"
                        value={this.state.negotiationEndDate}
                        onChange={(date) =>
                          this.handleDateChange(date, "negotiationEndDate")
                        }
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </FormControl>
                </GridItem>
                
              </GridContainer>
          
        </GridItem>
      </GridContainer>
    );
  }
}

ProjectTimeline.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(style)(ProjectTimeline);

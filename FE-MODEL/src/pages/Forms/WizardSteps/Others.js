import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import Check from "@material-ui/icons/Check";

import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardText from "../../../components/Card/CardText.js";

// core components
import GridContainer from "../../../components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";

import customSelectStyle from "../../../assets/jss/material-dashboard-pro-react/customSelectStyle.js";
import customCheckboxRadioSwitch from "../../../assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.js";

import { CardContent, Typography } from "@material-ui/core";

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

class Others extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allocationToolUsed: this.props.data
        ? this.props.data.allocationToolUsed
        : true,
      sourcingCockpitUsed: this.props.data
        ? this.props.data.sourcingCockpitUsed
        : true,
      eAuctionPlatformUsed: this.props.data
        ? this.props.data.eAuctionPlatformUsed
        : true,
      clientTCS: this.props.data ? this.props.data.clientTCS : true,
      forwardBundling: this.props.data ? this.props.data.forwardBundling : true,
      changeManagement: this.props.data
        ? this.props.data.changeManagement
        : true,
      otherPostNomination: this.props.data
        ? this.props.data.otherPostNomination
        : true,
    };
  }
  sendState() {
    return this.state;
  }
  componentDidMount() {
    if (this.props.data)
      this.setState(
        {
          ...this.props.data,
        },
        console.log(this.state, "other")
      );
    console.log(this.props);
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
            Let{"'"}s complete the final stage of the form
          </h4>
        </GridItem>
        <GridItem xs={12} sm={5}>
          <GridContainer
            xs={12}
            sm={12}
            direction="row"
            alignItems="center"
            style={{ padding: "18px 0px 0px 0px" }}
          >
            <GridItem xs={10}>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.allocationToolUsed}
                    onChange={(event) =>
                      this.setState({
                        allocationToolUsed: event.target.checked,
                      })
                    }
                    value="allocationToolUsed"
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
                label={
                  <Typography style={{ fontSize: "12px" }}>
                    Allocation Tool Used
                  </Typography>
                }
              />
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem xs={12} sm={5}>
          <GridContainer
            xs={12}
            sm={12}
            direction="row"
            alignItems="center"
            style={{ padding: "18px 0px 0px 0px" }}
          >
            <GridItem xs={10}>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.sourcingCockpitUsed}
                    onChange={(event) =>
                      this.setState({
                        sourcingCockpitUsed: event.target.checked,
                      })
                    }
                    value="sourcingCockpitUsed"
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
                label={
                  <Typography style={{ fontSize: "12px" }}>
                    Sourcing Cockpit Used
                  </Typography>
                }
              />
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem xs={12} sm={5}>
          <GridContainer
            xs={12}
            sm={12}
            direction="row"
            alignItems="center"
            style={{ padding: "18px 0px 0px 0px" }}
          >
            <GridItem xs={10}>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.eAuctionPlatformUsed}
                    onChange={(event) =>
                      this.setState({
                        eAuctionPlatformUsed: event.target.checked,
                      })
                    }
                    value="eAuctionPlatformUsed"
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
                label={
                  <Typography style={{ fontSize: "12px" }}>
                    E-Auction Platform Used
                  </Typography>
                }
              />
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem xs={12} sm={5}>
          <GridContainer xs={12} sm={12} direction="row" alignItems="center">
            <GridItem xs={10}></GridItem>
          </GridContainer>
        </GridItem>

        <GridItem xs={12} sm={10}>
          <Card style={{ backgroundColor: "#f2f2f2", marginTop: 50 }}>
            <CardHeader color="primary" text>
              <CardText color="default">
                <h4 className={classes.cardTitle}>
                  Post Nomination Safeguards
                </h4>
              </CardText>
            </CardHeader>
            <CardContent>
              <GridItem xs={3}>
                <div
                  className={
                    classes.checkboxAndRadio +
                    " " +
                    classes.checkboxAndRadioHorizontal
                  }
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        tabIndex={-1}
                        onClick={(event) =>
                          this.setState({
                            clientTCS: event.target.checked,
                          })
                        }
                        checked={this.state.clientTCS}
                        checkedIcon={<Check className={classes.checkedIcon} />}
                        icon={<Check className={classes.uncheckedIcon} />}
                        classes={{
                          checked: classes.checked,
                          root: classes.checkRoot,
                        }}
                      />
                    }
                    classes={{
                      label: classes.label,
                      root: classes.labelRoot,
                    }}
                    label={
                      <Typography style={{ fontSize: "12px" }}>
                        Client TC
                      </Typography>
                    }
                  />
                </div>
              </GridItem>
              <GridItem xs={3}>
                <div
                  className={
                    classes.checkboxAndRadio +
                    " " +
                    classes.checkboxAndRadioHorizontal
                  }
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        tabIndex={-1}
                        onClick={(event) =>
                          this.setState({
                            forwardBundling: event.target.checked,
                          })
                        }
                        checked={this.state.forwardBundling}
                        checkedIcon={<Check className={classes.checkedIcon} />}
                        icon={<Check className={classes.uncheckedIcon} />}
                        classes={{
                          checked: classes.checked,
                          root: classes.checkRoot,
                        }}
                      />
                    }
                    classes={{
                      label: classes.label,
                      root: classes.labelRoot,
                    }}
                    label={
                      <Typography style={{ fontSize: "12px" }}>
                        Forward Bundling
                      </Typography>
                    }
                  />
                </div>
              </GridItem>
              <GridItem xs={3}>
                <div
                  className={
                    classes.checkboxAndRadio +
                    " " +
                    classes.checkboxAndRadioHorizontal
                  }
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        tabIndex={-1}
                        onClick={(event) =>
                          this.setState({
                            changeManagement: event.target.checked,
                          })
                        }
                        checked={this.state.changeManagement}
                        checkedIcon={<Check className={classes.checkedIcon} />}
                        icon={<Check className={classes.uncheckedIcon} />}
                        classes={{
                          checked: classes.checked,
                          root: classes.checkRoot,
                        }}
                      />
                    }
                    classes={{
                      label: classes.label,
                      root: classes.labelRoot,
                    }}
                    label={
                      <Typography style={{ fontSize: "12px" }}>
                        Change Management
                      </Typography>
                    }
                  />
                </div>
              </GridItem>
              <GridItem xs={3}>
                <div
                  className={
                    classes.checkboxAndRadio +
                    " " +
                    classes.checkboxAndRadioHorizontal
                  }
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        tabIndex={-1}
                        onClick={(event) =>
                          this.setState({
                            otherPostNomination: event.target.checked,
                          })
                        }
                        checked={this.state.otherPostNomination}
                        checkedIcon={<Check className={classes.checkedIcon} />}
                        icon={<Check className={classes.uncheckedIcon} />}
                        classes={{
                          checked: classes.checked,
                          root: classes.checkRoot,
                        }}
                      />
                    }
                    classes={{
                      label: classes.label,
                      root: classes.labelRoot,
                    }}
                    label="Other"
                  />
                </div>
              </GridItem>
            </CardContent>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

Others.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(style)(Others);

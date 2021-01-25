import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

// core components
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

class DesignElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opportunityToQualifyForAnything: this.props.data
        ? this.props.data.opportunityToQualifyForAnything
        : true,
      shortlistingOfSupplier: this.props.data
        ? this.props.data.shortlistingOfSupplier
        : true,
      sealedBidRequote: this.props.data
        ? this.props.data.sealedBidRequote
        : true,
      ranking: this.props.data ? this.props.data.ranking : true,
      englishLang: this.props.data ? this.props.data.englishLang : true,
      dutchLang: this.props.data ? this.props.data.dutchLang : true,
      hongkongLang: this.props.data ? this.props.data.hongkongLang : true,
      brazilianLang: this.props.data ? this.props.data.brazilianLang : true,
      takeItOrX: this.props.data ? this.props.data.takeItOrX : true,
      dummyPrice: this.props.data ? this.props.data.dummyPrice : true,
      informationBuying: this.props.data
        ? this.props.data.informationBuying
        : true,
      takeItChain: this.props.data ? this.props.data.takeItChain : true,
      targetLine: this.props.data ? this.props.data.targetLine : true,
      lastCall: this.props.data ? this.props.data.lastCall : true,
      firstCall: this.props.data ? this.props.data.firstCall : true,
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
        console.log(this.state, "design")
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
            Please enter your project design elements
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
                    checked={this.state.opportunityToQualifyForAnything}
                    onChange={(event) =>
                      this.setState({
                        opportunityToQualifyForAnything: event.target.checked,
                      })
                    }
                    value="opportunityToQualifyForAnything"
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
                    Opportunity to Qualify for Anything
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
                    checked={this.state.shortlistingOfSupplier}
                    onChange={(event) =>
                      this.setState({
                        shortlistingOfSupplier: event.target.checked,
                      })
                    }
                    value="shortlistingOfSupplier"
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
                    Short-Listing of Supplier(s)
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
                    checked={this.state.sealedBidRequote}
                    onChange={(event) =>
                      this.setState({ sealedBidRequote: event.target.checked })
                    }
                    value="sealedBidRequote"
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
                    Sealed-Bid/Requote
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
                    checked={this.state.ranking}
                    onChange={(event) =>
                      this.setState({ ranking: event.target.checked })
                    }
                    value="ranking"
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
                  <Typography style={{ fontSize: "12px" }}>Ranking</Typography>
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
                    checked={this.state.englishLang}
                    onChange={(event) =>
                      this.setState({ englishLang: event.target.checked })
                    }
                    value="englishLang"
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
                  <Typography style={{ fontSize: "12px" }}>English</Typography>
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
                    checked={this.state.dutchLang}
                    onChange={(event) =>
                      this.setState({ dutchLang: event.target.checked })
                    }
                    value="dutchLang"
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
                  <Typography style={{ fontSize: "12px" }}>Dutch</Typography>
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
                    checked={this.state.hongkongLang}
                    onChange={(event) =>
                      this.setState({ hongkongLang: event.target.checked })
                    }
                    value="hongkongLang"
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
                    Hong-Kong
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
                    checked={this.state.brazilianLang}
                    onChange={(event) =>
                      this.setState({ brazilianLang: event.target.checked })
                    }
                    value="brazilianLang"
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
                    Brazilian
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
                    checked={this.state.takeItOrX}
                    onChange={(event) =>
                      this.setState({ takeItOrX: event.target.checked })
                    }
                    value="takeItOrX"
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
                    Take-It-Or-X
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
                    checked={this.state.dummyPrice}
                    onChange={(event) =>
                      this.setState({ dummyPrice: event.target.checked })
                    }
                    value="dummyPrice"
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
                    Dummy Prices
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
                    checked={this.state.informationBuying}
                    onChange={(event) =>
                      this.setState({ informationBuying: event.target.checked })
                    }
                    value="informationBuying"
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
                    Information Buying
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
                    checked={this.state.takeItChain}
                    onChange={(event) =>
                      this.setState({ takeItChain: event.target.checked })
                    }
                    value="takeItChain"
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
                    Take-It-Chain
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
                    checked={this.state.targetLine}
                    onChange={(event) =>
                      this.setState({ targetLine: event.target.checked })
                    }
                    value="targetLine"
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
                    Target Line
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
                    checked={this.state.lastCall}
                    onChange={(event) =>
                      this.setState({ lastCall: event.target.checked })
                    }
                    value="lastCall"
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
                    Last Call
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
                    checked={this.state.firstCall}
                    onChange={(event) =>
                      this.setState({ firstCall: event.target.checked })
                    }
                    value="firstCall"
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
                    First Call
                  </Typography>
                }
              />
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem xs={12} sm={5}></GridItem>
      </GridContainer>
    );
  }
}

DesignElement.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(style)(DesignElement);

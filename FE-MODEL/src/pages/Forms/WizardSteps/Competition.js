import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Switch from "@material-ui/core/Switch";

import { Typography } from "@material-ui/core";

// core components
import GridContainer from "../../../components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";

import customSelectStyle from "../../../assets/jss/material-dashboard-pro-react/customSelectStyle.js";
import customCheckboxRadioSwitch from "../../../assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.js";
import customInputStyle from "../../../assets/jss/material-dashboard-pro-react/components/customInputStyle.js";

import CustomSelect from "../../../components/CustomSelect/CustomSelect";
import * as employeeService from "../../../services/nexService";
import Button from "../../../components/CustomButtons/Button.js";
import { CardContent, TextField } from "@material-ui/core";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardText from "../../../components/Card/CardText.js";

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
  labelRoot: {
    //...defaultFont,
    //color: grayColor[3] + " !important",
    fontWeight: "400",
    fontSize: "12px",
    lineHeight: "1.42857",
    top: "10px",
    letterSpacing: "unset",
    "& + $underline": {
      marginTop: "0px",
    },
  },
  genFontStyle: {
    fontSize: "50px",
  },
  ...customSelectStyle,
  ...customCheckboxRadioSwitch,
  ...customInputStyle,
};

class Competition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      baskets: [
        {
          shareCount: [{ share: "" }],
          shareCounter: 0,

          finalTransfer: "",
          averageDistance: "",
          deltaFirst: "",
          bmLeader: true,
          averageBMScore: "",
          rangeBMScore: "",
          bmBenchmark: true,
          noSuppliersRFQ: "",
          noOfSuppliersAdmitted: "",
          noOfNeededSuppliers: "",
          sourceToMorethanOneSupplier: true,
          methodOfNegotiation: "",
          noOfSharesAwarded: "",

          disableOnSourceLessThanOne: false,
        },
      ],
      basketCount: 0,
    };
  }
  componentDidMount() {
    if (this.props.data)
      this.setState({
        baskets: this.props.data.baskets,
        basketCount: this.props.data.basketCount,
      });
    console.log(this.props);
  }

  sendState() {
    return this.state;
  }

  // add to a basket
  addShareClick = (i) => {
    const baskets = [...this.state.baskets];
    baskets[i].shares.push({ share: 0 });
    this.setState({ baskets });
  };

  // to remove a basket
  removeShareClick = (i, idx) => {
    const baskets = [...this.state.baskets];
    baskets[i].shares.splice(idx, 1);
    this.setState({ baskets });
  };

  removeBasket = (i, event) => {
    const baskets = [...this.state.baskets];
    baskets.splice(i, 1);
    this.setState({ baskets });
  };

  // add basket and share
  addBasketClick = () => {
    const baskets = [...this.state.baskets];
    baskets.push({
      basketData: [{ finalTransfer: "", averageDistance: "" }],
      shares: [{ share: 0 }],
    });
    this.setState({ baskets });
  };

  handleShareChange = (idx) => (event) => {
    const newShares = this.state.shares.map((share, sidx) => {
      if (idx !== sidx) return share;
      return { ...share, [event.target.name]: event.target.value };
    });

    this.setState({ shares: newShares });
  };

  handleChange = (index, event) => {
    const { name, value } = event.target;
    const values = [...this.state.baskets];
    values[index][name] = value;
    this.setState({ values });
  };

  toggle = () => {
    //const currentState = this.state.details;
    if (this.state.bmLeader === true) {
      this.setState({ bmLeader: false });
    }
    //this.setState({ bmLeader: false, bmBenchmark: false });
  };

  handleChangeOnNumberOfNeededSuppliers = () => {
    if (this.state.noOfNeededSuppliers === 0) {
      this.setState({ disableOnSourceLessThanOne: true });
    } else {
      this.setState({ disableOnSourceLessThanOne: false });
    }
  };

  render() {
    const { classes, allStates } = this.props;
    const { baskets } = this.state;
    return (
      <>
        <GridContainer justify="center">
          <GridItem xs={12}>
            <h4 className={classes.infoText}>How about you add a baskets</h4>
          </GridItem>

          {baskets.map((basket, key) => (
            <GridItem xs={12}>
              <Card style={{ backgroundColor: "#e6e6e6" }}>
                <CardHeader color="primary" text>
                  <CardText color="default">
                    <h4 className={classes.cardTitle}>Basket {key + 1}</h4>
                  </CardText>
                </CardHeader>
                <CardContent>
                  <GridContainer justify="center">
                    <GridItem xs={12} sm={5}>
                      <GridContainer
                        xs={12}
                        sm={12}
                        direction="row"
                        alignItems="center"
                        style={{ padding: "18px 0px 0px 0px" }}
                      >
                        <GridItem xs={10}>
                          <TextField
                            fullWidth={true}
                            name="finalTransfer"
                            label="Final Transfer"
                            value={this.state.baskets[key].finalTransfer}
                            onChange={(e) => {
                              let baskets = [...this.state.baskets];
                              baskets[key].finalTransfer = e.target.value;
                              this.setState({ baskets });
                            }}
                            InputLabelProps={{ style: { fontSize: 13 } }}
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
                          <TextField
                            fullWidth={true}
                            name="averageDistance"
                            label="Average Distance"
                            value={this.state.baskets[key].averageDistance}
                            onChange={(e) => {
                              let baskets = [...this.state.baskets];
                              baskets[key].averageDistance = e.target.value;
                              this.setState({ baskets });
                            }}
                            InputLabelProps={{ style: { fontSize: 13 } }}
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
                          <TextField
                            fullWidth={true}
                            name="deltaFirst"
                            label="Delta 1st-to-2nd Offers"
                            value={this.state.baskets[key].deltaFirst}
                            onChange={(e) => {
                              let baskets = [...this.state.baskets];
                              baskets[key].deltaFirst = e.target.value;
                              this.setState({ baskets });
                            }}
                            InputLabelProps={{ style: { fontSize: 13 } }}
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
                          <TextField
                            fullWidth={true}
                            name="rangeBMScore"
                            label="Range of Bonus/Penalty Scores"
                            value={this.state.baskets[key].rangeBMScore}
                            onChange={(e) => {
                              let baskets = [...this.state.baskets];
                              baskets[key].rangeBMScore = e.target.value;
                              this.setState({ baskets });
                            }}
                            InputLabelProps={{ style: { fontSize: 13 } }}
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
                          <TextField
                            fullWidth={true}
                            name="noSuppliersRFQ"
                            label="Total Suppliers at RFQ Response"
                            value={this.state.baskets[key].noSuppliersRFQ}
                            onChange={(e) => {
                              let baskets = [...this.state.baskets];
                              baskets[key].noSuppliersRFQ = e.target.value;
                              this.setState({ baskets });
                            }}
                            InputLabelProps={{ style: { fontSize: 13 } }}
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
                          <TextField
                            fullWidth={true}
                            name="noOfSuppliersAdmitted"
                            label="Number of Admitted Suppliers"
                            value={
                              this.state.baskets[key].noOfSuppliersAdmitted
                            }
                            onChange={(e) => {
                              let baskets = [...this.state.baskets];
                              baskets[key].noOfSuppliersAdmitted =
                                e.target.value;
                              this.setState({ baskets });
                            }}
                            InputLabelProps={{ style: { fontSize: 13 } }}
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
                          <TextField
                            fullWidth={true}
                            name="noOfNeededSuppliers"
                            label="Number of Needed Suppliers"
                            type="number"
                            inputProps={{ min: 0, max: 10 }}
                            value={this.state.baskets[key].noOfNeededSuppliers}
                            onChange={(e) => {
                              let baskets = [...this.state.baskets];
                              baskets[key].noOfNeededSuppliers = e.target.value;
                              this.setState({ baskets });
                            }}
                            InputLabelProps={{ style: { fontSize: 13 } }}
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
                                checked={basket.sourceToMorethanOneSupplier}
                                // onChange={(event) =>
                                //   this.setState({
                                //     sourceToMorethanOneSupplier:
                                //       event.target.checked,
                                //   })
                                // }
                                onChange={(e) => {
                                  let baskets = [...this.state.baskets];
                                  baskets[key].sourceToMorethanOneSupplier =
                                    e.target.checked;
                                  this.setState({ baskets });
                                }}
                                value="sourceToMorethanOneSupplier"
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
                                Source to More Than 1 Supplier
                              </Typography>
                            }
                            disabled={this.state.disableOnSourceLessThanOne}
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
                                checked={basket.bmLeader}
                                // onChange={(event) =>
                                //   this.setState({
                                //     bmLeader: event.target.checked,
                                //   })
                                // }
                                onChange={(e) => {
                                  let baskets = [...this.state.baskets];
                                  baskets[key].bmLeader = e.target.checked;
                                  this.setState({ baskets });
                                }}
                                value="bmLeader"
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
                                Bonus/Penalty Leader Eventual Winner
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
                                checked={this.state.baskets[key].bmBenchmark}
                                // onChange={(event) =>
                                //   this.setState({
                                //     bmBenchmark: event.target.checked,
                                //   })
                                // }
                                //  value={this.state.baskets[key].bmBenchmark}
                                onChange={(e) => {
                                  let baskets = [...this.state.baskets];
                                  baskets[key].bmBenchmark = e.target.checked;
                                  this.setState({ baskets });
                                }}
                                value="bmBenchmark"
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
                                Bonus/Penalty Benchmark Shifted
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
                      >
                        <GridItem xs={10}>
                          <CustomSelect
                            name="averageBMScore"
                            label="Average Bonus/Penalty Score"
                            value={this.state.averageBMScore}
                            onChange={this.handleContractTypeChange}
                            options={employeeService.getAverageBMScore()}
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
                      >
                        <GridItem xs={10}>
                          <CustomSelect
                            name="methodOfNegotiation"
                            label="Method of Negotiation for Shares"
                            value={this.state.methodOfNegotiation}
                            onChange={this.handleContractTypeChange}
                            options={employeeService.getMethodOfNegotiation()}
                          />
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                    {/*
                  <GridItem xs={12} sm={5}>
                    <TextField
                      fullWidth={true}
                      name="noOfSharesAwarded"
                      label="Number of Shares Awarded"
                      value={this.state.baskets[key].noOfSharesAwarded}
                      onChange={(e) => {
                        let baskets = [...this.state.baskets];
                        baskets[key].noOfSharesAwarded = e.target.value;
                        this.setState({ baskets });
                      }}
                    />
                  </GridItem>
                  */}
                  </GridContainer>
                  <Card style={{ backgroundColor: "#f2f2f2" }}>
                    <CardContent>
                      <GridContainer justify="left" alignItems="center">
                        <GridItem xs={12}>
                          <h4>Shares</h4>
                        </GridItem>
                        {basket.shareCount.map((share, idx) => (
                          <>
                            <GridItem xs={3}>
                              <TextField
                                fullWidth={true}
                                name={`Share #${idx + 1}`}
                                label={`Share #${idx + 1}`}
                                value={
                                  this.state.baskets[key].shareCount[idx].share
                                }
                                onChange={(e) => {
                                  let baskets = [...this.state.baskets];
                                  let shareCount = [];
                                  baskets[key].shareCount.map((p, i) => {
                                    if (i === idx) {
                                      p.share = e.target.value;
                                      shareCount.push(p);
                                    } else {
                                      shareCount.push(p);
                                    }
                                  });
                                  baskets[key].shareCount = shareCount;
                                  this.setState({ baskets });
                                }}
                                InputLabelProps={{ style: { fontSize: 13 } }}
                              />
                            </GridItem>
                            <GridItem xs={1}>
                              <DeleteOutlineOutlinedIcon
                                size="small"
                                color="default"
                                onClick={() => {
                                  console.log(
                                    "clicked on ",
                                    idx,
                                    this.state.baskets[key].shareCount
                                  );
                                  let baskets = [...this.state.baskets];
                                  let shareCount = [];
                                  baskets[key].shareCount.map((elem, key99) => {
                                    if (key99 !== idx) {
                                      shareCount.push(elem);
                                    } else {
                                      console.log(
                                        baskets[key].shareCount[key99]
                                      );
                                    }
                                  });
                                  console.log(shareCount);
                                  baskets[key].shareCount = shareCount;
                                  this.setState({ baskets }, () => {
                                    console.log(this.state);
                                  });
                                }}
                              />
                            </GridItem>
                          </>
                        ))}
                      </GridContainer>

                      <AddBoxIcon
                        fontSize="large"
                        color="rose"
                        onClick={() => {
                          let baskets = [...this.state.baskets];
                          baskets[key].shareCount.push({ share: "" });
                          baskets[key].shareCounter =
                            baskets[key].shareCounter + 1;
                          this.setState({ baskets });
                        }}
                      />
                    </CardContent>
                  </Card>

                  <GridItem xs={2}>
                    <Button
                      color="rose"
                      onClick={() => {
                        const basketCount = this.state.basketCount - 1;
                        const baskets = [];
                        this.state.baskets.map((elem, key1) => {
                          if (key !== key1) baskets.push(elem);
                        });
                        this.setState({ baskets, basketCount });
                      }}
                      style={{ padding: "12px 55px" }}
                    >
                      Remove Basket
                    </Button>
                  </GridItem>
                </CardContent>
              </Card>
            </GridItem>
          ))}
          <GridItem>
            <Button
              onClick={() => {
                const basketCount = this.state.basketCount + 1;
                const baskets = [
                  ...this.state.baskets,
                  { shareCount: [{ share: "" }], shareCounter: 1 },
                ];
                this.setState({ baskets, basketCount });
              }}
            >
              Add Basket
            </Button>
          </GridItem>
        </GridContainer>
      </>
    );
  }
}

Competition.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(style)(Competition);

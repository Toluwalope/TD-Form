import React from 'react'
import PropTypes from 'prop-types'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'

import { Typography } from '@material-ui/core'

// core components
import GridContainer from '../../../components/Grid/GridContainer.js'
import GridItem from '../../../components/Grid/GridItem.js'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

import customSelectStyle from '../../../assets/jss/material-dashboard-pro-react/customSelectStyle.js'
import customCheckboxRadioSwitch from '../../../assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.js'

import CustomInput from '../../../components/CustomInput/CustomInput.js'
import CustomSelect from '../../../components/CustomSelect/CustomSelect'
import * as employeeService from '../../../services/nexService'

const style = {
  infoText: {
    fontWeight: '300',
    margin: '10px 0 30px',
    textAlign: 'center',
  },
  inputAdornmentIcon: {
    color: '#555',
  },
  choiche: {
    textAlign: 'center',
    cursor: 'pointer',
    marginTop: '20px',
  },
  ...customSelectStyle,
  ...customCheckboxRadioSwitch,
}

class Negotiation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      typeOfNegotiation: this.props.data
        ? this.props.data.typeOfNegotiation
        : '',
      degreeOfDeviation: this.props.data
        ? this.props.data.degreeOfDeviation
        : '',
      clientIntervention: this.props.data
        ? this.props.data.clientIntervention
        : '',
      stagesOfNegotiationDesign: this.props.data
        ? this.props.data.stagesOfNegotiationDesign
        : '',
      designOfLastPlannedStage: this.props.data
        ? this.props.data.designOfLastPlannedStage
        : '',
      designOfLastConductedStage: this.props.data
        ? this.props.data.designOfLastConductedStage
        : '',
      degreeOfInformationFeedback: this.props.data
        ? this.props.data.degreeOfInformationFeedback
        : '',
      terminationPossibleBefore: this.props.data
        ? this.props.data.terminationPossibleBefore
        : true,
      terminationDoneBefore: this.props.data
        ? this.props.data.terminationDoneBefore
        : true,
      distinctSupplierSet: this.props.data
        ? this.props.data.distinctSupplierSet
        : true,
      noOfDistinctSuppliers: this.props.data
        ? this.props.data.noOfDistinctSuppliers
        : '',
      riskOfCollusion: this.props.data ? this.props.data.riskOfCollusion : true,
    }
  }
  sendState() {
    return this.state
  }
  componentDidMount() {
    if (this.props.data)
      this.setState(
        {
          ...this.props.data,
        },
        console.log(this.state, 'negoriation')
      )
    console.log(this.props)
  }
  // function that returns true if value is email, false otherwise
  verifyEmail(value) {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (emailRex.test(value)) {
      return true
    }
    return false
  }
  // function that verifies if a string has a given length or not
  verifyLength(value, length) {
    if (value.length >= length) {
      return true
    }
    return false
  }
  change(event, stateName, type, stateNameEqualTo) {
    switch (type) {
      case 'email':
        if (this.verifyEmail(event.target.value)) {
          this.setState({ [stateName + 'State']: 'success' })
        } else {
          this.setState({ [stateName + 'State']: 'error' })
        }
        break
      case 'length':
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + 'State']: 'success' })
        } else {
          this.setState({ [stateName + 'State']: 'error' })
        }
        break
      default:
        break
    }
    this.setState({ [stateName]: event.target.value })
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
    return true
  }

  handleChange = (event, nameState) => {
    this.setState({ [nameState]: event.target.value })
  }

  render() {
    const { classes } = this.props
    return (
      <GridContainer justify='center'>
        <GridItem xs={12}>
          <h4 className={classes.infoText}>
            Please enter your project negotiation data
          </h4>
        </GridItem>
        <GridItem xs={12} sm={5}>
          <GridContainer xs={12} sm={12} direction='row' alignItems='center'>
            <GridItem xs={10}>
              <CustomSelect
                name='typeOfNegotiation'
                label='Type of Negotiation'
                value={this.state.typeOfNegotiation}
                onChange={(event) =>
                  this.handleChange(event, 'typeOfNegotiation')
                }
                options={employeeService.getTypeOfNegotiation()}
              />
            </GridItem>
          </GridContainer>
        </GridItem>

        <GridItem xs={12} sm={5}>
          <GridContainer xs={12} sm={12} direction='row' alignItems='center'>
            <GridItem xs={10}>
              <CustomSelect
                name='degreeOfDeviation'
                label='Degree of Deviation'
                value={this.state.degreeOfDeviation}
                onChange={(event) =>
                  this.handleChange(event, 'degreeOfDeviation')
                }
                options={employeeService.getDegreeOfNegotiation()}
              />
            </GridItem>
          </GridContainer>
        </GridItem>

        <GridItem xs={12} sm={5}>
          <GridContainer xs={12} sm={12} direction='row' alignItems='center'>
            <GridItem xs={10}>
              <CustomSelect
                name='clientIntervention'
                label='Client Intervention Possible'
                value={this.state.clientIntervention}
                onChange={(event) =>
                  this.handleChange(event, 'clientIntervention')
                }
                options={employeeService.getClientIntervention()}
              />
            </GridItem>
          </GridContainer>
        </GridItem>

        <GridItem xs={12} sm={5}>
          <GridContainer xs={12} sm={12} direction='row' alignItems='center'>
            <GridItem xs={10}>
              <CustomSelect
                name='stagesOfNegotiationDesign'
                label='Stages of Negotiation Design'
                value={this.state.stagesOfNegotiationDesign}
                onChange={(event) =>
                  this.handleChange(event, 'stagesOfNegotiationDesign')
                }
                options={employeeService.getStagesOfNegotiationDesign()}
              />
            </GridItem>
          </GridContainer>
        </GridItem>

        <GridItem xs={12} sm={5}>
          <GridContainer xs={12} sm={12} direction='row' alignItems='center'>
            <GridItem xs={10}>
              <CustomSelect
                name='designOfLastPlannedStage'
                label='Design of Last Planned Stage'
                value={this.state.designOfLastPlannedStage}
                onChange={(event) =>
                  this.handleChange(event, 'designOfLastPlannedStage')
                }
                options={employeeService.getDesignOfLastPlannedStage()}
              />
            </GridItem>
          </GridContainer>
        </GridItem>

        <GridItem xs={12} sm={5}>
          <GridContainer xs={12} sm={12} direction='row' alignItems='center'>
            <GridItem xs={10}>
              <CustomSelect
                name='designOfLastConductedStage'
                label='Design of Last Conducted Stage'
                value={this.state.designOfLastConductedStage}
                onChange={(event) =>
                  this.handleChange(event, 'designOfLastConductedStage')
                }
                options={employeeService.getDesignOfLastConductedStage()}
              />
            </GridItem>
          </GridContainer>
        </GridItem>

        <GridItem xs={12} sm={5}>
          <GridContainer xs={12} sm={12} direction='row' alignItems='center'>
            <GridItem xs={10}>
              <CustomSelect
                name='degreeOfInformationFeedback'
                label='Degree of Information Feedback'
                value={this.state.degreeOfInformationFeedback}
                onChange={(event) =>
                  this.handleChange(event, 'degreeOfInformationFeedback')
                }
                options={employeeService.getDegreeOfInformationFeedback()}
              />
            </GridItem>
          </GridContainer>
        </GridItem>

        <GridItem xs={12} sm={5}>
          <GridContainer xs={12} sm={12} direction='row' alignItems='center'>
            <GridItem xs={10}>
              <CustomInput
                labelText={<span>Number of Distinct Suppliers Required</span>}
                value={this.state.noOfDistinctSuppliers}
                id='noOfDistinctSuppliers'
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  onChange: (event) =>
                    this.change(event, 'noOfDistinctSuppliers', 'length', 3),
                }}
              />
            </GridItem>
          </GridContainer>
        </GridItem>

        <GridItem xs={12} sm={5}>
          <GridContainer
            xs={12}
            sm={12}
            direction='row'
            alignItems='center'
            style={{ padding: '18px 0px 0px 0px' }}
          >
            <GridItem xs={10}>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.terminationPossibleBefore}
                    onChange={(event) =>
                      this.setState({
                        terminationPossibleBefore: event.target.checked,
                      })
                    }
                    value='terminationPossibleBefore'
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
                  <Typography style={{ fontSize: '12px' }}>
                    Termination Possible Before Last Stage
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
            direction='row'
            alignItems='center'
            style={{ padding: '18px 0px 0px 0px' }}
          >
            <GridItem xs={10}>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.terminationDoneBefore}
                    onChange={(event) =>
                      this.setState({
                        terminationDoneBefore: event.target.checked,
                      })
                    }
                    value='terminationDoneBefore'
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
                  <Typography style={{ fontSize: '12px' }}>
                    Termination Done Before Last Stage
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
            direction='row'
            alignItems='center'
            style={{ padding: '18px 0px 0px 0px' }}
          >
            <GridItem xs={10}>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.distinctSupplierSet}
                    onChange={(event) =>
                      this.setState({
                        distinctSupplierSet: event.target.checked,
                      })
                    }
                    value='distinctSupplierSet'
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
                  <Typography style={{ fontSize: '12px' }}>
                    Distinct Supplier Set Required
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
            direction='row'
            alignItems='center'
            style={{ padding: '18px 0px 0px 0px' }}
          >
            <GridItem xs={10}>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.riskOfCollusion}
                    onChange={(event) =>
                      this.setState({ riskOfCollusion: event.target.checked })
                    }
                    value='riskOfCollusion'
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
                  <Typography style={{ fontSize: '12px' }}>
                    Risk of Collusion
                  </Typography>
                }
              />
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    )
  }
}

Negotiation.propTypes = {
  classes: PropTypes.object,
}

export default withStyles(style)(Negotiation)

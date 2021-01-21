import React from 'react'
import PropTypes from 'prop-types'
// @material-ui/icons

import Tooltip from '@material-ui/core/Tooltip'

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'

// core components
import GridContainer from '../../../components/Grid/GridContainer.js'
import GridItem from '../../../components/Grid/GridItem.js'
import CustomInput from '../../../components/CustomInput/CustomInput.js'
import CustomSelect from '../../../components/CustomSelect/CustomSelect'

import * as employeeService from '../../../services/nexService'
import { Card, CardContent, TextField } from '@material-ui/core'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import Button from '../../../components/CustomButtons/Button.js'

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
}

class MetaData extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      industry: this.props.data ? this.props.data.industry : '',
      industryState: this.props.data ? this.props.data.industryState : '',
      otherIndustry: this.props.data ? this.props.data.otherIndustry : '',
      otherIndustryState: this.props.data
        ? this.props.data.otherIndustryState
        : '',
      projectName: this.props.data ? this.props.data.projectName : '',
      projectNameState: this.props.data ? this.props.data.projectNameState : '',
      contractType: this.props.data ? this.props.data.contractType : '',
      contractTypeState: this.props.data
        ? this.props.data.contractTypeState
        : '',
      otherContractType: this.props.data
        ? this.props.data.otherContractType
        : '',
      otherContractTypeState: this.props.data
        ? this.props.data.otherContractTypeState
        : '',
      hoursSupport: this.props.data ? this.props.data.hoursSupport : '',
      hoursSupportState: this.props.data
        ? this.props.data.hoursSupportState
        : '',
      degreeSupport: this.props.data ? this.props.data.degreeSupport : '',
      degreeSupportState: this.props.data
        ? this.props.data.degreeSupportState
        : '',

      disableOtherIndustry: true,
      disableOtherContractType: true,
      val: '',

      emails: this.props.data ? this.props.data.emails : [],
      count: 0,
    }
    this.addEmailClick = this.addEmailClick.bind(this)
  }

  sendState() {
    return this.state
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
    if (
      this.state.projectNameState === 'success' &&
      this.state.hoursSupportState === 'success'
    ) {
      return true
    } else {
      if (this.state.projectNameState !== 'success') {
        this.setState({ projectNameState: 'error' })
      }
      if (this.state.hoursSupportState !== 'success') {
        this.setState({ hoursSupportState: 'error' })
      }

      if (this.state.ContactEmail1State !== 'success') {
        this.setState({ ContactEmail1State: 'error' })
      }
      if (this.state.ContactEmail2State !== 'success') {
        this.setState({ ContactEmail2State: 'error' })
      }
      if (this.state.ContactEmail3State !== 'success') {
        this.setState({ ContactEmail3State: 'error' })
      }
      if (this.state.ContactEmail4State !== 'success') {
        this.setState({ ContactEmail4State: 'error' })
      }
      if (this.state.ContactEmail5State !== 'success') {
        this.setState({ ContactEmail5State: 'error' })
      }
    }
    return true
  }

  handleIndustryChange = (event) => {
    if (event.target.value == 'Other') {
      this.setState({
        disableOtherIndustry: false,
      })
    } else {
      this.setState({
        otherIndustry: '',
        disableOtherIndustry: true,
      })
    }
    this.setState({ industry: event.target.value })
  }

  handleContractTypeChange = (event) => {
    if (event.target.value == 'Other') {
      this.setState({
        disableOtherContractType: false,
      })
    } else {
      this.setState({
        otherContractType: '',
        disableOtherContractType: true,
      })
    }
    this.setState({ contractType: event.target.value })
  }

  handleDegreeSupportTypeChange = (event) => {
    this.setState({ degreeSupport: event.target.value })
  }

  handleEmailChange(i, event) {
    let emails = [...this.state.emails]
    emails[i] = event.target.value
    this.setState({ emails })
  }

  addEmailClick() {
    this.setState((prevState) => ({ emails: [...prevState.emails, ''] }))
    console.log(this.state.count)
    this.increment()
  }

  removeEmailClick(i) {
    let emails = [...this.state.emails]
    emails.splice(i, 1)
    this.setState({ emails })
    console.log(this.state.count)
    this.decrement()
  }

  increment() {
    this.setState({
      count: this.state.count + 1,
    })
  }

  decrement() {
    this.setState({
      count: this.state.count - 1,
    })
  }

  createEmailUI() {
    return this.state.emails.map((val, idx) => (
      <GridContainer
        key={idx}
        xs={12}
        sm={12}
        direction='row'
        alignItems='center'
      >
        <GridItem xs={10}>
          <TextField
            style={{ marginTop: '10px' }}
            fullWidth={true}
            name={`ContactEmail${idx}`}
            label={` Contact-${idx + 1}`}
            value={val || ''}
            onChange={(event) => this.handleEmailChange(idx, event)}
          />
        </GridItem>
        <GridItem xs={2}>
          <DeleteOutlineOutlinedIcon
            size='small'
            onClick={(event) => this.removeEmailClick(idx, event)}
          />
        </GridItem>
      </GridContainer>
    ))
  }

  render() {
    const { classes } = this.props
    return (
      <GridContainer justify='center'>
        <GridItem xs={12} sm={12}>
          <h4 className={classes.infoText}>
            Let{"'"}s start with the basic information
          </h4>
        </GridItem>
        <GridItem xs={12} sm={5}>
          <GridContainer xs={12} sm={12} direction='row' alignItems='center'>
            <GridItem xs={10}>
              <CustomSelect
                name='industry'
                label='Industry'
                value={this.state.industry}
                onChange={this.handleIndustryChange}
                options={employeeService.getIndustryCollection()}
              />
            </GridItem>
          </GridContainer>
        </GridItem>

        <GridItem xs={12} sm={5}>
          <GridContainer xs={12} sm={12} direction='row' alignItems='center'>
            <GridItem xs={10}>
              <CustomInput
                labelText={<span>Project Name</span>}
                id='projectName'
                value={this.state.projectName}
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  onChange: (event) =>
                    this.change(event, 'projectName', 'length', 3),
                }}
              />
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem xs={12} sm={5}>
          <GridContainer xs={12} sm={12} direction='row' alignItems='center'>
            <GridItem xs={10}>
              <CustomInput
                labelText={<span>Other Industry</span>}
                id='otherIndustry'
                value={this.state.otherIndustry}
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  onChange: (event) =>
                    this.change(event, 'otherIndustry', 'length', 3),
                }}
                value={this.state.otherIndustry}
                disabled={this.state.disableOtherIndustry}
              />
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem xs={12} sm={5}>
          <GridContainer xs={12} sm={12} direction='row' alignItems='center'>
            <GridItem xs={10}>
              <CustomSelect
                name='degreeSupport'
                label='Degree  Support'
                value={this.state.degreeSupport}
                onChange={this.handleDegreeSupportTypeChange}
                options={employeeService.getDegreeSupportCollection()}
              />
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem xs={12} sm={5}>
          <GridContainer xs={12} sm={12} direction='row' alignItems='center'>
            <GridItem xs={10}>
              <CustomSelect
                success={this.state.contractTypeState === 'success'}
                error={this.state.contractTypeState === 'error'}
                name='contractType'
                label='Contract Type'
                value={this.state.contractType}
                onChange={this.handleContractTypeChange}
                options={employeeService.getContractTypeCollection()}
              />
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem xs={12} sm={5}>
          <GridContainer xs={12} sm={12} direction='row' alignItems='center'>
            <GridItem xs={10}>
              <CustomInput
                labelText={<span>Hours Support</span>}
                id='hoursSupport'
                value={this.state.hoursSupport}
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  onChange: (event) =>
                    this.change(event, 'hoursSupport', 'length', 3),
                }}
              />
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem xs={12} sm={5}>
          <GridContainer xs={12} sm={12} direction='row' alignItems='center'>
            <GridItem xs={10}>
              <CustomInput
                labelText={<span>Other Contract Type</span>}
                id='otherContractType'
                value={this.state.otherContractType}
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  onChange: (event) =>
                    this.change(event, 'otherContractType', 'length', 3),
                }}
                value={this.state.otherContractType}
                disabled={this.state.disableOtherContractType}
              />
            </GridItem>
          </GridContainer>
        </GridItem>

        <GridItem xs={12} sm={5}>
          <GridContainer xs={12} sm={12} direction='row' alignItems='center'>
            <GridItem xs={10}>
              <Card>
                <CardContent style={{ backgroundColor: '#f2f2f2' }}>
                  {this.createEmailUI()}
                </CardContent>
              </Card>
            </GridItem>

            <GridItem xs={10}>
              <Tooltip title='Add another  contact'>
                <Button
                  color='default'
                  className={'Submit'}
                  onClick={this.addEmailClick.bind(this)}
                  disabled={this.state.count == 5 ? true : false}
                >
                  Add Contact
                </Button>
              </Tooltip>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    )
  }
}

MetaData.propTypes = {
  classes: PropTypes.object,
}

export default withStyles(style)(MetaData)

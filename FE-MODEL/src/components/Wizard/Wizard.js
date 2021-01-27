import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'

// @material-ui/core components
import Grid from '@material-ui/core/Grid'
import { addFormStepOne, addFormStepTwo } from './../../services/formService'

import withStyles from '@material-ui/core/styles/withStyles'
import LinearProgress from '@material-ui/core/LinearProgress'
// core components
import Button from '../CustomButtons/Button.js'
import Card from '../Card/Card.js'

import wizardStyle from '../../assets/jss/material-dashboard-pro-react/components/wizardStyle.js'
import axios from 'axios'

class Wizard extends React.Component {
  constructor(props) {
    super(props)
    var width
    if (this.props.steps.length === 1) {
      width = '100%'
    } else {
      if (window.innerWidth < 600) {
        if (this.props.steps.length !== 3) {
          width = '50%'
        } else {
          width = 100 / 3 + '%'
        }
      } else {
        if (this.props.steps.length === 2) {
          width = '50%'
        } else {
          width = 100 / 3 + '%'
        }
      }
    }
    this.state = {
      currentStep: 0,
      color: this.props.color,
      nextButton: this.props.steps.length > 1 ? true : false,
      previousButton: false,
      finishButton: this.props.steps.length === 1 ? true : false,
      width: width,
      movingTabStyle: {
        transition: 'transform 0s',
      },
      allStates: {},
    }
    this.navigationStepChange = this.navigationStepChange.bind(this)
    this.refreshAnimation = this.refreshAnimation.bind(this)
    this.previousButtonClick = this.previousButtonClick.bind(this)
    this.previousButtonClick = this.previousButtonClick.bind(this)
    this.finishButtonClick = this.finishButtonClick.bind(this)
    this.updateWidth = this.updateWidth.bind(this)
  }
  wizard = React.createRef()
  // componentWillReceiveProps(prevProps, prevState) {
  //   // Check to see if the "applied" flag got changed (NOT just "set")
  //   // if (
  //   //   this.props.location.state.applied &&
  //   //   !prevProps.location.state.applied
  //   // ) {
  //   // Do stuff here
  //   console.log("thisldasdasdf", window.location.pathname);
  //   if (window.location.pathname.split("/").length === 3) {
  //     let id = window.location.pathname.split("/")[2];
  //     this.setState(
  //       {
  //         allStates: {},
  //         currentStep: 0,
  //       },
  //       this.updateWidth
  //     );
  //   }
  //   // }
  // }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps, 'next proes')
    if (nextProps.clearState !== this.props.clearState) {
      this.setState(
        {
          allStates: {},
          currentStep: 0,
          nextButton: true,
          previousButton: false,
          finishButton: false,
        },
        this.updateWidth
      )
      this.props.setClearState(false)
    }
  }
  async componentDidMount() {
    // if (this.props.match) {
    console.log('thisldasdasdf', window.location.pathname)
    if (window.location.pathname.split('/').length === 3) {
      let id = window.location.pathname.split('/')[2]
      try {
        const populatedData = await axios.get(
          `http://localhost:4000/api/form/get/${id}`
        )
        console.log(populatedData, '90909')
        let { response } = populatedData.data
        response = JSON.parse(JSON.stringify(response))
        if (response.hasOwnProperty('competition')) {
          let baskets = response.competition
          response.basketCount = response.competition.length
          response.competition = {}
          response.competition.baskets = baskets
        }

        this.setState(
          {
            allStates: response,
            currentStep: response.currentStep,
          },
          this.updateWidth
        )
      } catch (e) {
        this.refreshAnimation(0)
      }
    } else {
      this.setState(
        {
          allStates: {},
          currentStep: 0,
        },
        this.updateWidth
      )
    }
    // }
    window.addEventListener('resize', this.updateWidth)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWidth)
  }
  updateWidth() {
    this.refreshAnimation(this.state.currentStep)
  }
  componentDidUpdate() {
    this.props.setStepsData(this.state.allStates)
  }
  navigationStepChange(key) {
    if (this.props.steps) {
      var validationState = true
      if (key > this.state.currentStep) {
        for (var i = this.state.currentStep; i < key; i++) {
          if (this[this.props.steps[i].stepId].sendState !== undefined) {
            this.setState({
              allStates: {
                ...this.state.allStates,
                [this.props.steps[i].stepId]: this[
                  this.props.steps[i].stepId
                ].sendState(),
              },
            })
          }
          if (
            this[this.props.steps[i].stepId].isValidated !== undefined &&
            this[this.props.steps[i].stepId].isValidated() === false
          ) {
            validationState = false
            break
          }
        }
      }
      if (validationState) {
        this.setState({
          currentStep: key,
          nextButton: this.props.steps.length > key + 1 ? true : false,
          previousButton: key > 0 ? true : false,
          finishButton: this.props.steps.length === key + 1 ? true : false,
        })
        this.refreshAnimation(key)
      }
    }
  }
  nextButtonClick() {
    if (
      (this.props.validate &&
        ((this[this.props.steps[this.state.currentStep].stepId].isValidated !==
          undefined &&
          this[
            this.props.steps[this.state.currentStep].stepId
          ].isValidated()) ||
          this[this.props.steps[this.state.currentStep].stepId].isValidated ===
            undefined)) ||
      this.props.validate === undefined
    ) {
      if (
        this[this.props.steps[this.state.currentStep].stepId].sendState !==
        undefined
      ) {
        this.setState({
          allStates: {
            ...this.state.allStates,
            [this.props.steps[this.state.currentStep].stepId]: this[
              this.props.steps[this.state.currentStep].stepId
            ].sendState(),
          },
        })
      }
      var key = this.state.currentStep + 1
      this.setState({
        currentStep: key,
        nextButton: this.props.steps.length > key + 1 ? true : false,
        previousButton: key > 0 ? true : false,
        finishButton: this.props.steps.length === key + 1 ? true : false,
      })
      this.refreshAnimation(key)
    }
  }
  previousButtonClick() {
    if (
      this[this.props.steps[this.state.currentStep].stepId].sendState !==
      undefined
    ) {
      this.setState({
        allStates: {
          ...this.state.allStates,
          [this.props.steps[this.state.currentStep].stepId]: this[
            this.props.steps[this.state.currentStep].stepId
          ].sendState(),
        },
      })
    }
    var key = this.state.currentStep - 1
    if (key >= 0) {
      this.setState({
        currentStep: key,
        nextButton: this.props.steps.length > key + 1 ? true : false,
        previousButton: key > 0 ? true : false,
        finishButton: this.props.steps.length === key + 1 ? true : false,
      })
      this.refreshAnimation(key)
    }
  }
  finishButtonClick() {
    if (
      (this.props.validate === false &&
        this.props.finishButtonClick !== undefined) ||
      (this.props.validate &&
        ((this[this.props.steps[this.state.currentStep].stepId].isValidated !==
          undefined &&
          this[
            this.props.steps[this.state.currentStep].stepId
          ].isValidated()) ||
          this[this.props.steps[this.state.currentStep].stepId].isValidated ===
            undefined) &&
        this.props.finishButtonClick !== undefined)
    ) {
      this.setState(
        {
          allStates: {
            ...this.state.allStates,
            [this.props.steps[this.state.currentStep].stepId]: this[
              this.props.steps[this.state.currentStep].stepId
            ].sendState(),
          },
        },
        () => {
          this.props.finishButtonClick(this.state)
        }
      )
    }
  }
  refreshAnimation(index) {
    var total = this.props.steps.length
    var li_width = 100 / total
    var total_steps = this.props.steps.length
    var move_distance =
      this.wizard.current.children[0].offsetWidth / total_steps
    var index_temp = index
    var vertical_level = 0

    var mobile_device = window.innerWidth < 600 && total > 3

    if (mobile_device) {
      move_distance = this.wizard.current.children[0].offsetWidth / 2
      index_temp = index % 2
      li_width = 50
    }

    this.setState({ width: li_width + '%' })

    var step_width = move_distance
    move_distance = move_distance * index_temp

    var current = index + 1

    if (current === 1 || (mobile_device === true && index % 2 === 0)) {
      move_distance -= 8
    } else if (
      current === total_steps ||
      (mobile_device === true && index % 2 === 1)
    ) {
      move_distance += 8
    }

    if (mobile_device) {
      vertical_level = parseInt(index / 2, 10)
      vertical_level = vertical_level * 38
    }
    var movingTabStyle = {
      width: step_width,
      transform:
        'translate3d(' + move_distance + 'px, ' + vertical_level + 'px, 0)',
      transition: 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)',
    }
    this.setState({ movingTabStyle: movingTabStyle })
  }
  saveNowButton = async () => {
    if (
      (this.props.validate &&
        ((this[this.props.steps[this.state.currentStep].stepId].isValidated !==
          undefined &&
          this[
            this.props.steps[this.state.currentStep].stepId
          ].isValidated()) ||
          this[this.props.steps[this.state.currentStep].stepId].isValidated ===
            undefined)) ||
      this.props.validate === undefined
    ) {
      if (
        this[this.props.steps[this.state.currentStep].stepId].sendState !==
        undefined
      ) {
        this.setState(
          {
            allStates: {
              ...this.state.allStates,
              [this.props.steps[this.state.currentStep].stepId]: this[
                this.props.steps[this.state.currentStep].stepId
              ].sendState(),
            },
          },
          this.callbackHit
        )
        // if (this.props.editMode) this.props.setEditMode(false)
      }
    }
  }

  callbackHit = async () => {
    const { allStates, currentStep } = this.state
    if (currentStep === 5) {
      if (allStates.hasOwnProperty('_id')) {
        try {
          if (allStates.competition.baskets.length > 0) {
            const response = await axios.post(
              `http://localhost:4000/api/form/step2/add`,
              {
                formId: allStates._id,
                competition: allStates.competition.baskets,
              }
            )
            let competition = {}
            competition.baskets = response.data.response
            competition.basketCount = response.data.response.length
            this.setState(
              {
                allStates: {
                  ...this.state.allStates,
                  competition: competition,
                },
              },
              this.updateWidth
            )
          } else {
            await axios.put(
              'http://localhost:4000/api/form/update/' + allStates._id,
              {
                competition: allStates.competition.baskets,
              }
            )
          }
          // console.log(response);
        } catch (err) {
          console.log(err)
        }
      } else {
        alert('First save the Project')
      }
    }
    if (allStates.hasOwnProperty('_id')) {
      try {
        //update
        const { competition, ...otherData } = allStates
        const populatedData = await axios.put(
          'http://localhost:4000/api/form/update/' + allStates._id,
          {
            ...otherData,
            currentStep,
          }
        )
        let { response } = populatedData.data
        response = JSON.parse(JSON.stringify(response))
        if (response.hasOwnProperty('competition')) {
          let baskets = response.competition
          response.basketCount = response.competition.length
          response.competition = {}
          response.competition.baskets = baskets
        }
        this.setState(
          {
            currentStep: response.currentStep,
            allStates: { ...response, ...allStates },
          },
          this.updateWidth
        )
        alert('UPDATE SUCCESSFULLY,')
      } catch (err) {
        console.log(err.response)
      }
    } else {
      try {
        //update
        const { competition, ...otherData } = allStates

        const populatedData = await axios.post(
          'http://localhost:4000/api/form/step1/add',
          {
            ...otherData,
            currentStep,
          }
        )
        let { response } = populatedData.data
        response = JSON.parse(JSON.stringify(response))

        if (response.hasOwnProperty('competition')) {
          let baskets = response.competition
          response.basketCount = response.competition.length
          response.competition = {}
          response.competition.baskets = baskets
        }
        this.setState(
          {
            currentStep: response.currentStep,
            allStates: { ...response, ...this.state.allStates },
          },
          this.updateWidth
        )
        alert('SAVED SUCCESSFULLY, YOU CAN EDIT LATER')
        console.log(response.data)
      } catch (err) {
        console.log(err.response)
      }
    }
  }
  render() {
    const { classes, title, subtitle, color, steps } = this.props
    return (
      <form onSubmit>
        <div className={classes.wizardContainer} ref={this.wizard}>
          <Card className={classes.card}>
            <Grid
              container
              style={{ marginTop: '4rem' }}
              alignItems='stretch'
              // justify='center'
              direction='column'
            >
              <Grid item sm={12}>
                <LinearProgress
                  variant='determinate'
                  value={this.state.currentStep * 11}
                  valueBuffer={11}
                  classes={{ barColorPrimary: classes.progressColor }}
                  style={{
                    height: '20px',
                    width: '100%',
                    // marginLeft: '4rem',

                    // marginRight: '-4rem',
                  }}
                />
              </Grid>
              <Grid item style={{ margin: 'auto' }}>
                <h5 style={{ fontSize: '1.5rem' }}>{`${Math.ceil(
                  (this.state.currentStep / 9) * 100
                )}%`}</h5>
              </Grid>
            </Grid>
            <div className={classes.wizardHeader}>
              <h3 className={classes.title}>{title}</h3>
              <h5 className={classes.subtitle}>{subtitle}</h5>
            </div>
            <div className={classes.wizardNavigation}>
              <ul className={classes.nav}>
                {steps.map((prop, key) => {
                  return (
                    <li
                      className={classes.steps}
                      key={key}
                      style={{ width: this.state.width }}
                    >
                      <a
                        href='#pablo'
                        className={classes.stepsAnchor}
                        onClick={(e) => {
                          e.preventDefault()
                          this.navigationStepChange(key)
                        }}
                      >
                        {prop.stepName}
                      </a>
                    </li>
                  )
                })}
              </ul>
              <div
                className={classes.movingTab + ' ' + classes[color]}
                style={this.state.movingTabStyle}
              >
                {steps[this.state.currentStep].stepName}
              </div>
            </div>
            <div className={classes.content}>
              {steps.map((prop, key) => {
                const stepContentClasses = cx({
                  [classes.stepContentActive]: this.state.currentStep === key,
                  [classes.stepContent]: this.state.currentStep !== key,
                })
                return (
                  <div className={stepContentClasses} key={key}>
                    <prop.stepComponent
                      innerRef={(node) => (this[prop.stepId] = node)}
                      allStates={this.state.allStates}
                    />
                  </div>
                )
              })}
            </div>
            <div className={classes.footer}>
              <div className={classes.left}>
                {this.state.previousButton ? (
                  <Button
                    className={this.props.previousButtonClasses}
                    onClick={() => this.previousButtonClick()}
                  >
                    {this.props.previousButtonText}
                  </Button>
                ) : null}
              </div>

              <div className={classes.right}>
                {!(this.state.currentStep === 8) && (
                  <Button
                    onClick={this.saveNowButton}
                    style={{ marginRight: '1rem' }}
                    color='rose'
                  >
                    Save Now
                  </Button>
                )}
                {this.state.nextButton ? (
                  <Button
                    color='rose'
                    className={this.props.nextButtonClasses}
                    onClick={() => this.nextButtonClick()}
                  >
                    {this.props.nextButtonText}
                  </Button>
                ) : null}
                {this.state.finishButton ? (
                  <Button
                    color='rose'
                    className={this.finishButtonClasses}
                    onClick={() => this.finishButtonClick()}
                  >
                    {this.props.finishButtonText}
                  </Button>
                ) : null}
              </div>
              <div className={classes.clearfix} />
            </div>

            <pre>{JSON.stringify(this.state.allStates, null, 4)}</pre>
          </Card>
        </div>
      </form>
    )
  }
}

Wizard.defaultProps = {
  color: 'rose',
  title: 'Here should go your title',
  subtitle: 'And this would be your subtitle',
  previousButtonText: 'Previous',
  previousButtonClasses: '',
  nextButtonClasses: '',
  nextButtonText: 'Next',
  finishButtonClasses: '',
  finishButtonText: 'Finish',
}

Wizard.propTypes = {
  classes: PropTypes.object.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      stepName: PropTypes.string.isRequired,
      stepComponent: PropTypes.object.isRequired,
      stepId: PropTypes.string.isRequired,
    })
  ).isRequired,
  color: PropTypes.oneOf([
    'primary',
    'warning',
    'danger',
    'success',
    'info',
    'rose',
  ]),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  previousButtonClasses: PropTypes.string,
  previousButtonText: PropTypes.string,
  nextButtonClasses: PropTypes.string,
  nextButtonText: PropTypes.string,
  finishButtonClasses: PropTypes.string,
  finishButtonText: PropTypes.string,
  finishButtonClick: PropTypes.func,

  validate: PropTypes.bool,
}

export default withStyles(wizardStyle)(Wizard)

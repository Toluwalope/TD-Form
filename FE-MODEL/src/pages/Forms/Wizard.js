import React, { useState } from 'react'

// core components
import Wizard from '../../components/Wizard/Wizard.js'
import GridContainer from '../../components/Grid/GridContainer.js'
import GridItem from '../../components/Grid/GridItem.js'

import MetaData from './WizardSteps/MetaData.js'
import ProjectDetails from './WizardSteps/ProjectDetails.js'
import ProjectTimeline from './WizardSteps/ProjectTimeline.js'
import Commercials from './WizardSteps/Commercials.js'
import Competition from './WizardSteps/Competition.js'
import Commitment from './WizardSteps/Commitment.js'
import Negotiation from './WizardSteps/Negotiation.js'
import DesignElement from './WizardSteps/DesignElement.js'
import Others from './WizardSteps/Others.js'

import OverviewDialog from '../../components/OverviewDialog'

import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Fade from '@material-ui/core/Fade'
import Table from '../../components/Table/Table'
import { addFormStepOne, addFormStepTwo } from './../../services/formService'
import { useFetch } from '../../components/useFetch'
// import axios from "axios";
import axios from 'axios'
import { Button } from '@material-ui/core'

function getModalStyle() {
  const top = 50
  const left = 50
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 800, //increase decrease modal size here
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))
export default function WizardView(props) {
  console.log(props, 'asdfasdf')
  const classes = useStyles()
  const [modalStyle] = React.useState(getModalStyle)
  const [open, setOpen] = React.useState(false)
  const [data, setData] = React.useState({})
  const [fieldsData, setFieldsData] = React.useState({})
  const [stepsData, setStepsData] = React.useState({})
  const [clearState, setClearState] = React.useState(false)

  const [dialogData, setDialogData] = React.useState([])

  const { sendRequest } = useFetch()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    props.setEditMode(false)
  }

  const handleSubmit = (props) => {
    const headers = Object.keys(props.allStates)
    const arr = [...headers.map((header) => props.allStates?.[header])]
    console.log(arr)

    let keyValuePairs = Object.assign({}, ...arr)
    keyValuePairs = Object.entries(keyValuePairs).map(([key, value]) => {
      return { name: key, value: value }
    })
    setData({ keyValuePairs, props })
    setDialogData(arr)
    handleOpen()
  }

  const extractValue = (arr, prop) => {
    let extractedValue = []
    for (let i = 0; i < arr.length; ++i) {
      // extract value from property
      extractedValue.push(arr[i][prop])
    }
    return extractedValue
  }
  const sendDataToBackend = async () => {
    //!DO THE BACKEND INTEGRATION HERE
    // console.log(data.props) //showing the state

    const { allStates, currentStep } = data.props

    if (allStates.hasOwnProperty('_id')) {
      try {
        //update
        const { competition, ...otherData } = allStates
        const populatedData = await axios.put(
          'http://localhost:4000/api/form/update/' + allStates._id,
          { ...otherData, currentStep }
        )
        console.log(currentStep)
        if (
          competition &&
          competition.baskets &&
          competition.baskets.length > 0
        ) {
          await axios.post(`http://localhost:4000/api/form/step2/add`, {
            formId: allStates._id,
            competition: competition.baskets,
          })
        } else {
          {
            await axios.put(
              'http://localhost:4000/api/form/update/' + allStates._id,
              { competition: allStates.competition.baskets }
            )
          }
        }

        handleClose()

        alert('Form update successfully')
        setClearState(true)
      } catch (err) {
        console.log(err.response)
        alert('Some thing is going wrong')
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
        if (
          competition &&
          competition.baskets &&
          competition.baskets.length > 0
        )
          await axios.post(`http://localhost:4000/api/form/step2/add`, {
            formId: response._id,
            competition: competition.baskets,
          })
        handleClose()
        alert('SAVED SUCCESSFULLY, YOU CAN EDIT LATER')
        setClearState(true)

        console.log(response.data)
      } catch (err) {
        console.log(err.response)
      }
    }
  }
  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        const populatedData = await sendRequest(
          `http://localhost:4000/api/form/get/${props.projectID}`,
          'GET'
        )
        console.log(populatedData.response)
        // debugger;
        setData((oldData) => ({
          ...oldData.props,
          allStates: populatedData.response,
        }))

        setFieldsData(populatedData.response)
        console.log(fieldsData)
      } catch (e) {}
    }
    if (props.editMode) {
      return fetchProjects()
    }
    return
  }, [sendRequest, props.editMode, props.projectID])

  return (
    <GridContainer justify='center'>
      <GridItem xs={12} sm={8}>
        <Wizard
          stepsData={stepsData}
          setStepsData={setStepsData}
          setClearState={setClearState}
          clearState={clearState}
          validate
          steps={[
            {
              stepName: 'Meta Data',
              stepComponent: (props) => (
                <MetaData data={props.allStates.metaData} {...props} />
              ),
              stepId: 'metaData',
            },
            {
              stepName: 'Details',
              stepComponent: (props) => (
                <ProjectDetails
                  data={props.allStates.projectDetails}
                  {...props}
                />
              ),
              stepId: 'projectDetails',
            },
            {
              stepName: 'Timeline',
              stepComponent: (props) => (
                <ProjectTimeline
                  data={props.allStates.projectTimeline}
                  {...props}
                />
              ),
              stepId: 'projectTimeline',
            },
            {
              stepName: 'Commercial',
              stepComponent: (props) => (
                <Commercials data={props.allStates.commercials} {...props} />
              ),
              stepId: 'commercials',
            },
            {
              stepName: 'Commitment',
              stepComponent: (props) => (
                <Commitment data={props.allStates.commitment} {...props} />
              ),
              stepId: 'commitment',
            },
            {
              stepName: 'Competition',
              stepComponent: (props) => (
                <Competition data={props.allStates.competition} {...props} />
              ),
              stepId: 'competition',
            },

            {
              stepName: 'Negotiation',
              stepComponent: (props) => (
                <Negotiation data={props.allStates.negotiation} {...props} />
              ),
              stepId: 'negotiation',
            },
            {
              stepName: 'Design',
              stepComponent: (props) => (
                <DesignElement
                  data={props.allStates.designElement}
                  {...props}
                />
              ),
              stepId: 'designElement',
            },
            {
              stepName: 'Others',
              stepComponent: (props) => (
                <Others data={props.allStates.others} {...props} />
              ),
              stepId: 'others',
            },
          ]}
          title=''
          subtitle=''
          finishButtonClick={handleSubmit}
          {...props}
        />
      </GridItem>
      <OverviewDialog
        open={open}
        onClose={handleClose}
        sendDataToBackend={sendDataToBackend}
        dialogData={dialogData}
        stepsData={stepsData}
      />
    </GridContainer>
  )
}

{
  /* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <Fade in={open}>
          <div style={modalStyle} className={classes.paper}>
            <h2 id='transition-modal-title'>Table modal</h2>
            <p id='transition-modal-description'>
              <Table data={data.keyValuePairs} />
              <Button
                style={{ float: 'left', marginTop: '5px', marginRight: '5px' }}
                variant='outlined'
                color='primary'
                onClick={sendDataToBackend}
              >
                Save
              </Button>
              <Button
                style={{ float: 'right', marginTop: '5px' }}
                variant='outlined'
                color='primary'
                onClick={handleClose}
              >
                Cancel
              </Button>
            </p>
          </div>
        </Fade>
      </Modal> */
}

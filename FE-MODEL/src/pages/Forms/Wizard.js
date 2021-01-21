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
  const classes = useStyles()
  const [modalStyle] = React.useState(getModalStyle)
  const [open, setOpen] = React.useState(false)
  const [data, setData] = React.useState({})
  const [fieldsData, setFieldsData] = React.useState({})
  const [stepsData, setStepsData] = React.useState({})
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

    try {
      let metaData = data.props.allStates.metaData
      let projectDetails = data.props.allStates.metaData
      let projectTimeline = data.props.allStates.projectTimeline
      let commercials = data.props.allStates.commercials
      let commitment = data.props.allStates.commitment
      let negotiation = data.props.allStates.negotiation
      let designElement = data.props.allStates.designElement
      let others = data.props.allStates.others
      let response = await addFormStepOne(
        metaData,
        projectDetails,
        projectTimeline,
        commercials,
        commitment,
        negotiation,
        designElement,
        others,
        {
          endpoint: props.editMode ? `update/${props.projectID}` : 'step1/add',
          method: props.editMode ? 'put' : 'post',
        }
      )

      if (response.status === 200) {
        let id = response.data.response._id

        let unSortedCompetition = data.props.allStates.competition
        let competition = unSortedCompetition.baskets.map((comp, index) => {
          let competitions = []
          //SC FOR SHARE COUNT
          let sC = []
          let dataObject = [...comp.shareCount]
          const result = extractValue(dataObject, 'share')
          sC.push(result)
          let resultedObj = {
            shareCount: [...sC],
            finalTransfer: comp.finalTransfer,
            averageDistance: comp.averageDistance,
            deltaFirst: comp.deltaFirst,
            bmLeader: comp.ButtonbmLeader,
            averageBMScore: comp.averageBMScore,
            rangeBMScore: comp.rangeBMScore,
            bmBenchmark: comp.bmBenchmark,
            noSuppliersRFQ: comp.noSuppliersRFQ,
            noOfSuppliersAdmitted: comp.noOfSuppliersAdmitted,
            noOfNeededSuppliers: comp.noOfNeededSuppliers,
            sourceToMorethanOneSupplier: comp.sourceToMorethanOneSupplier,
            methodOfNegotiation: comp.methodOfNegotiation,
            noOfSharesAwarded: comp.noOfSharesAwarded,
          }
          competitions.push(resultedObj)
          return competitions
        })

        if (props.editMode) {
          let response
          let newComp = [...fieldsData.competition]
          for (let i = 0; i < newComp.length; i++) {
            const competitionItem = newComp[i]

            let shareCount = competitionItem.shareCount
            let finalTransfer = competitionItem.finalTransfer
            let averageDistance = competitionItem.averageDistance
            let deltaFirst = competitionItem.deltaFirst
            let bmLeader = competitionItem.bmLeader
            let averageBMScore = competitionItem.averageBMScore
            let rangeBMScore = competitionItem.rangeBMScore
            let bmBenchmark = competitionItem.bmBenchmark
            let noOfSuppliersRFQ = competitionItem.noOfSuppliersRFQ
            let noOfSuppliersAdmitted = competitionItem.noOfSuppliersAdmitted
            let noOfNeededSuppliers = competitionItem.noOfNeededSuppliers
            let sourceToMorethanOneSupplier =
              competitionItem.sourceToMorethanOneSupplier
            let methodOfNegotiation = competitionItem.methodOfNegotiation
            let noOfSharesAwarded = competitionItem.noOfSharesAwarded

            const competationIds = fieldsData.competition.map(
              (item) => item._id
            )
            response = await axios.put(
              `http://localhost:4000/api/competation/update/${competationIds[i]}`,
              {
                finalTransfer,
                averageDistance,
                deltaFirst,
                bmLeader,
                averageBMScore,
                bmBenchmark,
                rangeBMScore,
                noOfSuppliersRFQ,
                noOfSuppliersAdmitted,
                noOfNeededSuppliers,
                sourceToMorethanOneSupplier,
                methodOfNegotiation,
                noOfSharesAwarded,
              }
            )
            console.log(response)
          }

          if (response.status === 200) {
            handleClose()
            alert(response.data.message)
          }
        } else {
          let responseStepTwo = await addFormStepTwo(id, competition, {
            method: 'post',
            endpoint: 'form/step2/add',
          })
          console.log(responseStepTwo.data)

          if (responseStepTwo.status === 200) {
            handleClose()
            alert(
              `Form ${props.editMode ? 'Updated' : 'Saved'} SuccessFully!!!`
            )
            return
          }
        }
      }
    } catch (error) {
      alert(error)
      console.log(error)
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
        setData((oldData) => ({
          ...oldData.props,
          allStates: populatedData.response,
        }))
        setFieldsData(populatedData.response)
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
          validate
          steps={[
            {
              stepName: 'Meta Data',
              stepComponent: (props) => (
                <MetaData data={fieldsData.metaData} {...props} />
              ),
              stepId: 'metaData',
            },
            {
              stepName: 'Details',
              stepComponent: (props) => <ProjectDetails {...props} />,
              stepId: 'projectDetails',
            },
            {
              stepName: 'Timeline',
              stepComponent: (props) => (
                <ProjectTimeline data={fieldsData.projectTimeline} {...props} />
              ),
              stepId: 'projectTimeline',
            },
            {
              stepName: 'Commercial',
              stepComponent: (props) => (
                <Commercials data={fieldsData.commercials} {...props} />
              ),
              stepId: 'commercials',
            },
            {
              stepName: 'Commitment',
              stepComponent: (props) => (
                <Commitment data={fieldsData.commitment} {...props} />
              ),
              stepId: 'commitment',
            },
            {
              stepName: 'Competition',
              stepComponent: (props) => (
                <Competition data={fieldsData.competition} {...props} />
              ),
              stepId: 'competition',
            },

            {
              stepName: 'Negotiation',
              stepComponent: (props) => (
                <Negotiation data={fieldsData.negotiation} {...props} />
              ),
              stepId: 'negotiation',
            },
            {
              stepName: 'Design',
              stepComponent: (props) => (
                <DesignElement data={fieldsData.designElement} {...props} />
              ),
              stepId: 'designElement',
            },
            {
              stepName: 'Others',
              stepComponent: (props) => (
                <Others data={fieldsData.others} {...props} />
              ),
              stepId: 'others',
            },
          ]}
          title=''
          subtitle=''
          finishButtonClick={handleSubmit}
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

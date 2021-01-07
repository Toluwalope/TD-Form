import React from "react";

// core components
import Wizard from "../../components/Wizard/Wizard.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";

import MetaData from "./WizardSteps/MetaData.js";
import ProjectDetails from "./WizardSteps/ProjectDetails.js";
import ProjectTimeline from "./WizardSteps/ProjectTimeline.js";
import Commercials from "./WizardSteps/Commercials.js";
import Competition from "./WizardSteps/Competition.js";
import Commitment from "./WizardSteps/Commitment.js";
import Negotiation from "./WizardSteps/Negotiation.js";
import DesignElement from "./WizardSteps/DesignElement.js";
import Others from "./WizardSteps/Others.js";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Table from "../../components/Table/Table";
import axios from "axios";
import { Button } from "@material-ui/core";

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 800, //increase decrease modal size here
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
export default function WizardView() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({});
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (props) => {
    const headers = Object.keys(props.allStates);
    const arr = [...headers.map((header) => props.allStates?.[header])];
    console.log(arr);
    let keyValuePairs = Object.assign({}, ...arr);
    keyValuePairs = Object.entries(keyValuePairs).map(([key, value]) => {
      return { name: key, value: value };
    });
    setData({ keyValuePairs, props });
    handleOpen();
  };
  const sendDataToBackend = async () => {
    //!DO THE BACKEND INTEGRATION HERE
    console.log(data.props); //showing the state
  };

  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={8}>
        <Wizard
          validate
          steps={[
            {
              stepName: "Meta Data",
              stepComponent: MetaData,
              stepId: "metaData",
            },
            {
              stepName: "Details",
              stepComponent: ProjectDetails,
              stepId: "projectDetails",
            },
            {
              stepName: "Timeline",
              stepComponent: ProjectTimeline,
              stepId: "projectTimeline",
            },
            {
              stepName: "Commercial",
              stepComponent: Commercials,
              stepId: "commercials",
            },
            {
              stepName: "Commitment",
              stepComponent: Commitment,
              stepId: "commitment",
            },
            {
              stepName: "Competition",
              stepComponent: Competition,
              stepId: "competition",
            },

            {
              stepName: "Negotiation",
              stepComponent: Negotiation,
              stepId: "negotiation",
            },
            {
              stepName: "Design",
              stepComponent: DesignElement,
              stepId: "designElement",
            },
            { stepName: "Others", stepComponent: Others, stepId: "others" },
          ]}
          title=""
          subtitle=""
          finishButtonClick={handleSubmit}
        />
      </GridItem>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Fade in={open}>
          <div style={modalStyle} className={classes.paper}>
            <h2 id="transition-modal-title">Table modal</h2>
            <p id="transition-modal-description">
              <Table data={data.keyValuePairs} />
              <Button
                style={{ float: "left", marginTop: "5px", marginRight: "5px" }}
                variant="outlined"
                color="primary"
                onClick={sendDataToBackend}
              >
                Save
              </Button>
              <Button
                style={{ float: "right", marginTop: "5px" }}
                variant="outlined"
                color="primary"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </p>
          </div>
        </Fade>
      </Modal>
    </GridContainer>
  );
}

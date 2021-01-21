import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import moment from 'moment'

const OverviewDialog = (props) => {
  console.log(props.stepsData.metaData)
  const {
    metaData,
    projectTimeline,
    commercials,
    competition,
    negotiation,
    others,
  } = props.stepsData

  return (
    <Dialog open={props.open} onClose={props.onClose} fullWidth>
      <DialogTitle>Overview</DialogTitle>
      <DialogContent>
        <Grid container direction='column' spacing={2}>
          <Grid item container justify='space-between'>
            <Typography variant='body1'>Project Name</Typography>{' '}
            <Typography variant='body1'>
              {metaData && metaData.projectName}
            </Typography>
          </Grid>
          <Divider />
          <Grid item container justify='space-between'>
            <Typography variant='body1'>Contact</Typography>
            <Typography variant='body1'>
              {metaData && metaData.emails.length}
            </Typography>
          </Grid>
          <Divider />
          <Grid item container justify='space-between'>
            <Typography variant='body1'>Hours Support</Typography>

            <Typography variant='body1'>
              {metaData && metaData.hoursSupport}
            </Typography>
          </Grid>
          <Divider />
          <Grid item container justify='space-between'>
            <Typography variant='body1'>Negotiation End Date</Typography>
            <Typography variant='body1'>
              {projectTimeline &&
                moment(projectTimeline.negotiationEndDate).format(
                  'dd MMM YYYY'
                )}
            </Typography>
          </Grid>
          <Divider />
          <Grid item container justify='space-between'>
            <Typography variant='body1'>
              Best Initial Comparison Price
            </Typography>
            <Typography variant='body1'>
              {commercials ? metaData.bestInitialComparisonPrice : ''}
            </Typography>
          </Grid>
          <Divider />
          <Grid item container justify='space-between'>
            <Typography variant='body1'>Final Comparison Price</Typography>
            <Typography variant='body1'>
              {commercials ? commercials.finalComparisonPrice : ''}
            </Typography>
          </Grid>
          <Divider />
          <Grid item container justify='space-between'>
            <Typography variant='body1'>Number Of basket</Typography>
            <Typography variant='body1'>
              {competition && competition.numberOfBaskets}
            </Typography>
          </Grid>
          <Divider />
          <Grid item container justify='space-between'>
            <Typography variant='body1'>Type Of Negotiation</Typography>
            <Typography variant='body1'>
              {negotiation && negotiation.typeOfNegotiation}
            </Typography>
          </Grid>
          <Divider />
          <Grid item container justify='space-between'>
            <Typography variant='body1'>
              Negotiation Design of Last Conducted Stage
            </Typography>
            <Typography variant='body1'>
              {negotiation && negotiation.designOfLastConductedStage}
            </Typography>
          </Grid>
          <Divider />
          <Grid item container justify='space-between'>
            <Typography variant='body1'>Allocation Tool Used</Typography>
            <Typography variant='body1'>
              {others && others.allocationToolused}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          color='primary'
          onClick={props.sendDataToBackend}
          variant='contained'
        >
          Save
        </Button>
        <Button color='secondary' onClick={props.onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default OverviewDialog

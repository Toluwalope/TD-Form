import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import { useHistory } from 'react-router-dom'

import moment from 'moment'

import { useFetch } from '../components/useFetch'

const columns = [
  // { field: 'id', headerName: 'ID', hide: true },
  { field: 'projectName', headerName: 'Projects', width: 147 },
  { field: 'updatedAt', headerName: 'Latest Update', width: 147 },
  { field: 'completion', headerName: 'Completion', width: 140 },
  { field: 'status', headerName: 'Status', width: 140 },
  { field: 'report', headerName: 'Report', width: 140 },
]

const Projects = ({ projects, setProjects, setEditMode, setProjectID }) => {
  const history = useHistory()
  const { isLoading, error, sendRequest, clearError } = useFetch()
  // const [projects, setProjects] = useState([])

  const deleteItem = async (id) => {
    const deleteConfirmation = window.confirm(
      'Are you sure to delete the Project?'
    )
    if (deleteConfirmation === true) {
      try {
        await sendRequest(
          `http://localhost:4000/api/form/delete/${id}`,
          'DELETE'
        )
        alert('Project Deleted')
        const filteredProjects = projects.filter((project) => id !== project.id)
        setProjects(filteredProjects)
      } catch (e) {}
    } else {
      return
    }
  }

  const editItem = (id) => {
    setEditMode(true)
    setProjectID(id)
    // console.log(id)
    history.push('/updateProject/' + id)
  }

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const responseData = await sendRequest(
          'http://localhost:4000/api/form/get/all',
          'GET'
        )
        const newData = responseData.response.map((project) => ({
          id: project._id,
          projectName: project.metaData.projectName,
          updatedAt: moment(project.updatedAt).format('MMM Do YYYY'),
          currentStep: ((project.currentStep + 1) / 8) * 100,
        }))
        console.log(newData)
        setProjects(newData)
      } catch (e) {}
    }
    fetchProjects()
  }, [sendRequest, setProjects])

  return (
    <div
      style={{
        padding: '2rem',
        display: 'flex',
      }}
    >
      {isLoading ? (
        <Grid container justify='center' alignItems='center'>
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Projects</TableCell>
                <TableCell>Latest Update</TableCell>
                <TableCell>Completion</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Report</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project, index) => (
                <TableRow key={project.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{project.projectName}</TableCell>
                  <TableCell>{project.updatedAt}</TableCell>
                  <TableCell>{`${Math.floor(project.currentStep)}%`}</TableCell>
                  <TableCell>
                    {project.currentStep < 100 ? 'In Progress' : 'Completed'}
                  </TableCell>
                  <TableCell>
                    <IconButton>
                      <AssignmentOutlinedIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={deleteItem.bind(this, project.id)}>
                      <DeleteOutlineIcon />
                    </IconButton>
                    {project.currentStep < 100 && (
                      <IconButton onClick={editItem.bind(this, project.id)}>
                        <EditOutlinedIcon />
                      </IconButton>
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton>
                      <MailOutlineOutlinedIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Fab
        onClick={() => history.push('/newproject')}
        color='primary'
        style={{
          position: 'fixed',
          bottom: '1rem',
          right: '3rem',
          backgroundColor: '#259dd9',
        }}
        aria-label='add'
      >
        <AddIcon />
      </Fab>
    </div>
  )
}

export default Projects

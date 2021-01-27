import React, { useState } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import './App.css'

import SideMenu from '../components/SideMenu'
import Header from '../components/Header'

import Wizard from '../pages/Forms/Wizard'
import Projects from '../pages/Projects'

import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#333996',
      light: '#3c44b126',
    },
    secondary: {
      main: '#f83245',
      light: '#f8324526',
    },
    background: {
      default: '#f4f5fd',
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: 'translateZ(0)',
      },
    },
  },
})

const useStyles = makeStyles({
  appMain: {
    width: '100%',
  },
})

function App() {
  const classes = useStyles()
  const [projects, setProjects] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [projectID, setProjectID] = useState('')

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.appMain}>
        <BrowserRouter>
          <Header
            projects={projects}
            setProjects={setProjects}
            setEditMode={setEditMode}
            setProjectID={setProjectID}
          />
          <Switch>
            <Route path='/projects' exact>
              <Projects
                projects={projects}
                setProjects={setProjects}
                setEditMode={setEditMode}
                setProjectID={setProjectID}
              />
            </Route>
            <Route path='/newproject' key='asdf'>
              <Wizard
                projects={projects}
                editMode={editMode}
                setEditMode={setEditMode}
                projectID={projectID}
              />
            </Route>

            <Route
              path={projectID ? '/updateProject/:id' : '/newproject'}
              key='234234'
            >
              <Wizard
                projects={projects}
                editMode={editMode}
                setEditMode={setEditMode}
                projectID={projectID}
                setProjectID={setProjectID}
              />
            </Route>
            <Route path='/'>
              <Redirect to='/newproject' />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  )
}

export default App

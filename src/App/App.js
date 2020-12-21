import React from "react";
import "./App.css";

import SideMenu from "../components/SideMenu";
import Header from "../components/Header";

import Wizard from "../pages/Forms/Wizard";

import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";


const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: "#3c44b126",
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526",
    },
    background: {
      default: "#f4f5fd",
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: "translateZ(0)",
      },
    },
  },
});

const useStyles = makeStyles({
  appMain: {
    width: "100%",
  },
});

function App() {
  const classes = useStyles();

  return (
      <ThemeProvider theme={theme}>
        <div className={classes.appMain}>
          <Header />

          <Wizard />
        </div>
      </ThemeProvider>
  );
}

export default App;

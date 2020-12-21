import React from "react";
import {
  AppBar,
  Badge,
  Grid,
  IconButton,
  InputBase,
  Link,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";

import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import SearchIcon from "@material-ui/icons/Search";
import Button from "./CustomButtons/Button.js";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#FFF",
    "& > *": {
      margin: theme.spacing(0),
    },
  },
  searchInput: {
    opacity: "0.6",
    padding: `0px ${theme.spacing(1)}px`,
    fontSize: "0.8rem",
    "&:hover": {
      backgroundColor: "#f2f2f2",
    },
    "& .MuiSvgIcon-root": {
      marginRight: theme.spacing(1),
    },
  },
  logo: {
    maxWidth: 240,
    maxHeight: 1000,
  },
  button: {
    color: "white",
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Grid container alignContent="center">
          <Grid item>
            
          </Grid>
          <Grid item sm></Grid>
          <Grid item>
              {/* 
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                console.info("I'm a button.");
              }}
            >
            
              Button Link
            </Link>
            */}
            <Button color="primary" simple className={classes.marginRight}>
              CREATE NEW PROJECT
            </Button>
            <Button color="primary" simple className={classes.marginRight}>
             MY PROJECT
            </Button>
            <Button color="primary" simple className={classes.marginRight}>
             Logged In
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import HomeIcon from "@material-ui/icons/Home";
import WhatshotIcon from "@material-ui/icons/Whatshot";

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20
  },
  album: {
    flexGrow: 1
  },
  link: {
    display: "flex",
    margin: theme.spacing(1, 1.5)
  }
}));

function IconBreadcrumbs() {
  const classes = useStyles();

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" to="/home" className={classes.link}>
        <HomeIcon className={classes.icon} />
        Home
      </Link>
      <Link color="inherit" to="/home/price" className={classes.link}>
        <WhatshotIcon className={classes.icon} />
        Price
      </Link>
      <Link color="inherit" to="/home/album" className={classes.link}>
        <WhatshotIcon className={classes.icon} />
        Album
      </Link>
      <Link color="inherit" to="/home/checkout" className={classes.link}>
        <WhatshotIcon className={classes.icon} />
        Checkout
      </Link>
    </Breadcrumbs>
  );
}

export default function NavBar() {
  const classes = useStyles();
  return (
    <AppBar position="relative" color="default">
      <Toolbar variant="dense">
        <CameraIcon fontSize="large" />
        <Typography
          variant="h5"
          color="inherit"
          noWrap
          className={classes.album}
        >
          Album
        </Typography>
        <IconBreadcrumbs />
      </Toolbar>
    </AppBar>
  );
}

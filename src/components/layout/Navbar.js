import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import NavItems from "./NavItems";

import styles from "../../assets/styles/NavbarStyle";

const useStyles = makeStyles(styles);

function Navbar(props) {
  const classes = useStyles();
  const { open } = props;
  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <NavItems {...props} />
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = (state, ownProps) => ({
  isAuthenticated: state.loginReducer.isAuthenticated,
  data: state.reduxReducer.data,
});

export default connect(mapStateToProps)(Navbar);

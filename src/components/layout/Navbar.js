import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
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
        [classes.appBarShift]: open
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
  data: state.reduxReducer.data
});

export default connect(mapStateToProps)(Navbar);

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import Routers from "./routes";
import NotFound from "../notfound/404";
import styles from "../../assets/styles/MainStyle";
const useStyles = makeStyles(styles);


let ps;

function Main(props) {
  const mainPanel = React.createRef();
  const classes = useStyles();
  const { open } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
     ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
        wheelSpeed: 1,
        wheelPropagation: true,
        minScrollbarLength: 20
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);
  return (
    <main
      className={clsx(classes.content, {
        [classes.appBarShift]: open,
        [classes.drawerClose]: !open
      })}
    >
      <div className={classes.toolbar} />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Switch>
          {Routers.map((item, index) => {
            return (
              <Route
                key={index}
                path={item.path}
                exact={item.exact}
                render={props =>
                  !item.auth ? (
                    <item.component {...props} />
                  ) : localStorage.jwToken ? (
                    <item.component {...props} />
                  ) : (
                    <Redirect
                      to={{
                        pathname: "/Login",
                        state: { from: props.location }
                      }}
                    />
                  )
                }
              />
            );
          })}
          <Route component={NotFound} />
        </Switch>
      </div>
    </main>
  );
}

const mapStateToProps = (state, ownProps) => ({
  isAuthenticated: state.loginReducer.isAuthenticated,
  data: state.reduxReducer.data
});

export default connect(mapStateToProps)(Main);

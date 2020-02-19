import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { makeStyles } from "@material-ui/core/styles";
import Routers from "./routes";
import NotFound from "../notfound/404";
import clsx from "clsx";
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    overflow: "auto",
    position: "relative",
    float: "right",
    transition: "all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)",
    maxHeight: "100%",
    width: "100%"
    // overflowScrolling: "touch"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 850
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: theme.spacing(7) + 1,
    overflowX: "hidden",
    width: "100%" - theme.spacing(7) + 1,
    [theme.breakpoints.down("sm")]: {
      width: "100%" - theme.spacing(7) + 1
    }
  },
  mainPanel: {
    position: "relative",
    height: 850,
    maxHeight: "100%",
    // [theme.breakpoints.down("md")]: {
    //   width: `calc(100% - ${drawerWidth}px)`
    // }
  }
}));

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

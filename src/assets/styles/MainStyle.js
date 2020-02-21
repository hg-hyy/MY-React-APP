const drawerWidth = 240;
const MainStyle = theme => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
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
    marginLeft: theme.spacing(9) + 1,
    overflowX: "hidden",
    width: "100%" - theme.spacing(9) + 1,
    [theme.breakpoints.down("sm")]: {
      width: "100%" - theme.spacing(9) + 1
    }
  },
  mainPanel: {
    position: "relative",
    height: 850,
    maxHeight: "100%"
    // [theme.breakpoints.down("md")]: {
    //   width: `calc(100% - ${drawerWidth}px)`
    // }
  }
});

export default MainStyle;

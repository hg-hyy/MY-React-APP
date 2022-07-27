import React, { useState, useMemo } from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";

import { useDispatch } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import jwt_decode from "jwt-decode";
import Sidebar from "./Sidebar";
import Main from "./Main";
import logo from "../../images/CL/CL1.jpg";
import Routers from "./routes";
import changeTheme from "../../actions/theme-actions";
import { loginOut } from "../../actions/login-actions";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import NavItems from "./NavItems";
import { ColorModeContext } from "./theme-context";

function App() {
  const dispatch = useDispatch();

  function checkToken() {
    try {
      const decoded = jwt_decode(localStorage.jwToken);
      const currentTime = Date.now() / 1000; //由毫秒转成秒
      console.log(decoded.exp - currentTime);
      // 判断当前时间是否大于token中的exp时间;如果大于是为过期
      if (decoded.exp < currentTime) {
        localStorage.clear();
        dispatch(loginOut(false));
        // loginOut(false);
        // window.location.href="/login";
        // history.push("/login")
        console.log("已经退出登录！");
      }
    } catch (e) {
      return false;
    }
  }

  const [open, setOpen] = useState(true);
  const handleDrawerToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const [mode, setMode] = useState("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [setMode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  const drawerWidth = 240;

  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          <CssBaseline />
          <AppBar position="fixed" open={open}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                edge="start"
                sx={{
                  marginRight: 5,
                  // ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                MY-REACT-APP
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <NavItems changeTheme={changeTheme} />
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Sidebar
              AppRoutes={Routers}
              open={open}
              logo={logo}
              logoText="shenyun"
            />
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, mt: 1 }}>
            <DrawerHeader />
            <Main />
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

import React, { useState } from "react";
import { useSelector, connect } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import jwt_decode from "jwt-decode";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Main from "./Main";
import AppRoutes from "../layout/routes";
import logo from "../../images/CL/CL1.jpg";
import Routers from "./routes";
import changeTheme from "../../actions/theme-actions";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import loadScript from "../../assets/utils/loadScript";
import purple from "@material-ui/core/colors/purple";
import red from "@material-ui/core/colors/red";
const primary = red[500]; // #F44336
const accent = purple.A200; // #E040FB (替代方法)

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000"
    }
  }
});
let dependenciesLoaded = false;

function loadDependencies() {
  if (dependenciesLoaded) {
    return;
  }

  dependenciesLoaded = true;

  // loadScript(
  //   "https://buttons.github.io/buttons.js",
  //   document.querySelector("head")
  // );
}
// const GettingStartedLink = React.forwardRef((props, ref) => {
//   return <Link href="/getting-started/installation" naked prefetch ref={ref} {...props} />;
// });

function checkToken() {
  try {
    const decoded = jwt_decode(localStorage.jwToken);
    const currentTime = Date.now() / 1000; //由毫秒转成秒
    console.log(decoded.exp - currentTime);
    // 判断当前时间是否大于token中的exp时间;如果大于是为过期
    if (decoded.exp < currentTime) {
      localStorage.clear();
      window.location.href("/regist");
      console.log("已经退出登录！");
    }
  } catch (e) {
    return false;
  }
}
setTimeout(checkToken, 30000);

function App(props) {
  React.useEffect(() => {
    if (
      window.location.hash !== "" &&
      window.location.hash !== "#main=content"
    ) {
      window.location.replace(
        `https://v0.material-ui.com/${window.location.hash}`
      );
    }

    loadDependencies();
  }, []);
  const [open, setOpen] = useState(true);
  const handleDrawerToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const cl = useSelector(state => state.themeReducer.color);
  console.log(cl)
  const prefersDarkMode = useMediaQuery(`(prefers-color-scheme: ${cl})`);

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light"
        }
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <div id="div">
        <CssBaseline />
        <Sidebar
          open={open}
          handleDrawerToggle={handleDrawerToggle}
          AppRoutes={AppRoutes}
          logoText={"ShenYun"}
          logo={logo}
          theme={theme}
          {...props}
        />
        <Navbar
          open={open}
          handleDrawerToggle={handleDrawerToggle}
          Routers={Routers}
          theme={theme}
          {...props}
        />

        <Main open={open} {...props} />
      </div>
    </ThemeProvider>
  );
}

const mapStateToProps = (state, ownProps) => ({
  isAuthenticated: state.loginReducer.isAuthenticated,
  data: state.reduxReducer.data,
  color: state.themeReducer.color,
  img: state.themeReducer.img
});
const mapDispatchToProps = dispatch => ({
  changeTheme: theme => dispatch(changeTheme(theme))
});
export default connect(mapStateToProps, mapDispatchToProps)(App);

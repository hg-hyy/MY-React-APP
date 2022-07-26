import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import jwt_decode from "jwt-decode";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Main from "./Main";
import AppRoutes from "../layout/routes";
import logo from "../../images/CL/CL1.jpg";
import Routers from "./routes";
import changeTheme from "../../actions/theme-actions";
import { loginOut } from "../../actions/login-actions";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ThemeProvider, createTheme } from "@mui/material/styles";
// eslint-disable-next-line
import loadScript from "../../assets/utils/loadScript";
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

function App(props) {
  // const { loginOut } = props;
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
  useEffect(() => {
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

  const [open, setOpen] = useState(false);
  const handleDrawerToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const cl = useSelector((state) => state.themeReducer.color);
  const img = useSelector((state) => state.themeReducer.img);
  checkToken();
  const prefersDarkMode = useMediaQuery(`(prefers-color-scheme: ${cl})`);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <div id="div">
        {/* <CssBaseline /> */}
        <Sidebar
          open={open}
          handleDrawerToggle={handleDrawerToggle}
          AppRoutes={AppRoutes}
          logoText={"ShenYun"}
          logo={logo}
          // theme={theme}
          {...props}
        />
        {/* <Navbar
          open={open}
          handleDrawerToggle={handleDrawerToggle}
          Routers={Routers}
          theme={theme}
          changeTheme={changeTheme}
          img={img}
        /> */}

        {/* <Main open={open} {...props} /> */}
      </div>
    </ThemeProvider>
  );
}

// const mapStateToProps = (state, ownProps) => ({
//   color: state.themeReducer.color,
//   img: state.themeReducer.img,
// });
// const mapDispatchToProps = (dispatch) => ({
//   changeTheme: (theme) => dispatch(changeTheme(theme)),
//   loginOut: (islogin) => dispatch(loginOut(islogin)),
// });
// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default App;

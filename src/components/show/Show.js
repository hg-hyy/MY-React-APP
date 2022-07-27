import React from "react";
import { connect } from "react-redux";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import { loginIn, loginOut } from "../../actions/redux_actions";
import Typography from "@mui/material/Typography";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import LoginPage from "./LoginPage";
import LovePage from "./LovePage";
import PublicPage from "./PublicPage";
import ProtectedPage from "./ProtectedPage";
import NestingPage from "./NestingPage";
import Hiddens from "../widgets/Hiddens";
import Iframe from "../widgets/Iframe";
import NotFound from "../notfound/404";

function NavBar() {
  const [value, setValue] = React.useState(0);

  return (
    <div>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
      >
        <BottomNavigationAction
          label="public"
          icon={<RestoreIcon />}
          component={Link}
          to="/show"
        />
        <BottomNavigationAction
          label="protected"
          icon={<FavoriteIcon />}
          component={Link}
          to="/show/protected"
        />
        <BottomNavigationAction
          label="lovePage"
          icon={<LocationOnIcon />}
          component={Link}
          to="/show/lovePage"
        />
        <BottomNavigationAction
          label="nesting"
          icon={<LocationOnIcon />}
          component={Link}
          to="/show/nesting"
        />
        <BottomNavigationAction
          label="hidden"
          icon={<LocationOnIcon />}
          component={Link}
          to="/show/hidden"
        />
        <BottomNavigationAction
          label="Iframe"
          icon={<LocationOnIcon />}
          component={Link}
          to="/show/Iframe"
        />
      </BottomNavigation>
    </div>
  );
}
function AuthButton(props) {
  const navigate = useNavigate();

  const { isAuthenticated, signout, data } = props;
  return isAuthenticated ? (
    <Typography variant="h3" component="h2" gutterBottom>
      Welcome {data.email}!
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          signout();
          navigate.push("/show/signin");
        }}
      >
        Sign out
      </Button>
    </Typography>
  ) : (
    <Typography variant="h3" component="h2" gutterBottom>
      You are not logged in.
    </Typography>
  );
}

function PrivateRoute({ children, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      element={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <navigate
            to={{
              pathname: "/show/signin",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function Show(props) {
  return (
    <Container maxWidth="xl">
      <AuthButton {...props} />
      <NavBar />
      <Routes>
        <Route path="nesting" element={<NestingPage />} />
        <Route path="lovePage" element={<LovePage />} />
        <Route path="signin" element={<LoginPage {...props} />} />
        {/* <PrivateRoute path="/show/protected" {...props}>
          <ProtectedPage {...props} />
        </PrivateRoute> */}
        <Route index element={<PublicPage />} />
        <Route exact path="hidden" element={<Hiddens />} />
        <Route exact path="Iframe" element={<Iframe />} />
        <Route component={NotFound} />
      </Routes>
      <Outlet />
    </Container>
  );
}
const mapDispatchToProps = (dispatch) => ({
  signin: (newUser) => dispatch(loginIn(newUser)),
  signout: () => dispatch(loginOut()),
});

const mapStateToProps = (state) => ({
  isAuthenticated: state.reduxReducer.isAuthenticated,
  data: state.reduxReducer.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(Show);

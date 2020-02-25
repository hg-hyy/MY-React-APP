import React from "react";
import { connect } from "react-redux";
import { Switch, Route, Link, Redirect, useHistory } from "react-router-dom";
import { loginIn, loginOut } from "../../actions/redux_actions";
import Typography from "@material-ui/core/Typography";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

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
 </div> );
}
function AuthButton(props) {
  let history = useHistory();
  const { isAuthenticated, signout, data } = props;
  return isAuthenticated ? (
    <Typography variant="h3" component="h2" gutterBottom>
      Welcome {data.email}!
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          signout();
          history.push("/show/signin");
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
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/show/signin",
              state: { from: location }
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
      <Switch>
        <Route path="/show/nesting">
          <NestingPage />
        </Route>
        <Route path="/show/lovePage">
          <LovePage />
        </Route>
        <Route path="/show/signin">
          <LoginPage {...props} />
        </Route>
        <PrivateRoute path="/show/protected" {...props}>
          <ProtectedPage {...props} />
        </PrivateRoute>
        <Route exact path="/show">
          <PublicPage />
        </Route>
        <Route exact path="/show/hidden">
          <Hiddens />
        </Route>
        <Route exact path="/show/Iframe">
          <Iframe />
        </Route>
        <Route component={NotFound} />
      </Switch>
      <NavBar />
    </Container>
  );
}
const mapDispatchToProps = dispatch => ({
  signin: newUser => dispatch(loginIn(newUser)),
  signout: () => dispatch(loginOut())
});

const mapStateToProps = state => ({
  isAuthenticated: state.reduxReducer.isAuthenticated,
  data: state.reduxReducer.data
});

export default connect(mapStateToProps, mapDispatchToProps)(Show);

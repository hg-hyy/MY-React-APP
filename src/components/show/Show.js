import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
  Navigate,
} from "react-router-dom";
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
import Hiddens from "./Hiddens";
import Iframe from "./Iframe";
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
function AuthButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.reduxReducer.isAuthenticated
  );
  const data = useSelector((state) => state.reduxReducer.data);

  return isAuthenticated ? (
    <Typography variant="h3" component="h2" gutterBottom>
      Welcome {data.email}!
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          dispatch(loginOut());
          navigate("signin");
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

function Show(props) {
  const isAuthenticated = useSelector(
    (state) => state.reduxReducer.isAuthenticated
  );
  const data = useSelector((state) => state.reduxReducer.data);

  return (
    <Container maxWidth="xl">
      <AuthButton />
      <Routes>
        <Route index element={<PublicPage />} />
        <Route
          path="protected"
          element={
            isAuthenticated ? (
              <ProtectedPage data={data} />
            ) : (
              <Navigate to="/show/signin" replace={true} />
            )
          }
        />
        <Route path="lovePage" element={<LovePage />} />
        <Route
          path="signin"
          element={
            <LoginPage signin={loginIn} isAuthenticated={isAuthenticated} />
          }
        />
        <Route path="nesting/*" element={<NestingPage />} />
        <Route path="hidden" element={<Hiddens width="md" />} />
        <Route path="Iframe" element={<Iframe />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Outlet />
      <NavBar />
    </Container>
  );
}

export default Show;

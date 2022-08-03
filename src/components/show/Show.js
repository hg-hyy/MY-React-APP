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
import { loginOut } from "../../reducers/reduxSlice";
import Typography from "@mui/material/Typography";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArchiveIcon from "@mui/icons-material/Archive";
import Button from "@mui/material/Button";
import LoginPage from "./LoginPage";
import LovePage from "./LovePage";
import PublicPage from "./PublicPage";
import ProtectedPage from "./ProtectedPage";
import NestingPage from "./NestingPage";
import Hiddens from "./Hiddens";
import Iframe from "./Iframe";
import Message from "./message";
import NotFound from "../notfound/404";
import { Paper } from "@mui/material";
import Container from "@mui/material/Container";

function NavBar() {
  const [value, setValue] = React.useState(0);

  return (
    <Paper elevation={3}>
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
        <BottomNavigationAction
          label="Message"
          icon={<ArchiveIcon />}
          component={Link}
          to="/show/message"
        />
      </BottomNavigation>
    </Paper>
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

const messageExamples = [
  {
    primary: "Brunch this week?",
    secondary:
      "I'll be in the neighbourhood this week. Let's grab a bite to eat",
    person: require("../../images/ruslan.jpg"),
  },
  {
    primary: "Birthday Gift",
    secondary: `Do you have a suggestion for a good present for John on his work
        anniversary. I am really confused & would love your thoughts on it.`,
    person: require("../../images/olen.jpg"),
  },
  {
    primary: "Recipe to try",
    secondary:
      "I am try out this new BBQ recipe, I think this might be amazing",
    person: require("../../images/ruslan.jpg"),
  },
  {
    primary: "Yes!",
    secondary: "I have the tickets to the ReactConf for this year.",
    person: require("../../images/cc.jpg"),
  },
  {
    primary: "Doctor's Appointment",
    secondary:
      "My appointment for the doctor was rescheduled for next Saturday.",
    person: require("../../images/saraj.jpg"),
  },
  {
    primary: "Discussion",
    secondary: `Menus that are generated by the bottom app bar (such as a bottom
        navigation drawer or overflow menu) open as bottom sheets at a higher elevation
        than the bar.`,
    person: require("../../images/sean.jpg"),
  },
  {
    primary: "Summer BBQ",
    secondary: `Who wants to have a cookout this weekend? I just got some furniture
        for my backyard and would love to fire up the grill.`,
    person: require("../../images/yang.jpg"),
  },
];

function refreshMessages() {
  const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

  return Array.from(new Array(5)).map(
    () => messageExamples[getRandomInt(messageExamples.length)]
  );
}

function Show() {
  const isAuthenticated = useSelector(
    (state) => state.reduxReducer.isAuthenticated
  );
  const data = useSelector((state) => state.reduxReducer.data);
  const ref = React.useRef(null);
  const [messages, setMessages] = React.useState(() => refreshMessages());

  React.useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
    setMessages(refreshMessages());
  }, []);

  return (
    <Container ref={ref} maxWidth="xxl" sx={{ pt: 3 }}>
      <NavBar />
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
        <Route path="signin" element={<LoginPage />} />
        <Route path="nesting/*" element={<NestingPage />} />
        <Route path="hidden" element={<Hiddens width="md" />} />
        <Route path="Iframe" element={<Iframe />} />
        <Route path="message" element={<Message messages={messages} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Outlet />
    </Container>
  );
}

export default Show;

import { useRoutes } from "react-router-dom";
import Dashboard from "@mui/icons-material/Dashboard";
import Person from "@mui/icons-material/Person";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import EditIcon from "@mui/icons-material/Edit";
import AppsIcon from "@mui/icons-material/Apps";
import HomeIcon from "@mui/icons-material/Home";
import BugReport from "@mui/icons-material/BugReport";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ToDo from "../todo/ToDo";
import Cart from "../cart/Cart";
import Blog from "../Blog/Blog";
import Login from "../auth/login";
import Profile from "../profile/Profile";
import Regist from "../auth/regist";
import Show from "../show/Show";
import Home from "../home/Home";
import Photo from "../photo/Photo";
import Warn from "../warnManage/warn";
import Counter from "../counter/Counter";
// eslint-disable-next-line
function Routers() {
  let element = useRoutes([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "messages",
          element: <Home />,
        },
        { path: "tasks", element: <Show /> },
      ],
    },
    { path: "team", element: <Show /> },
  ]);
  return element;
}

const AppRoutes = [
  {
    path: "/todo",
    name: "Todo",
    icon: AppsIcon,
    component: ToDo,
    layout: "/admin",
    auth: false,
  },
  {
    path: "/cart",
    name: "Cart",
    icon: Dashboard,
    component: Cart,
    layout: "/admin",
    auth: false,
  },
  {
    path: "/blog",
    name: "Blog",
    icon: EditIcon,
    component: Blog,
    layout: "/admin",
    auth: false,
  },
  {
    path: "/profile",
    name: "Profile",
    icon: FavoriteIcon,
    component: Profile,
    layout: "/admin",
    auth: false,
  },
  {
    path: "/show",
    name: "Show",
    icon: ChatIcon,
    component: Show,
    layout: "/admin",
    auth: false,
  },
  {
    path: "/photo",
    name: "Photo",
    icon: PhotoCameraIcon,
    component: Photo,
    layout: "/admin",
    auth: false,
  },
  {
    path: "/login",
    name: "Login",
    icon: LockOpenIcon,
    component: Login,
    layout: "/admin",
  },
  {
    path: "/regist",
    name: "Regist",
    icon: Person,
    component: Regist,
    layout: "/admin",
  },
  {
    path: "/warn",
    name: "Warn",
    icon: BugReport,
    component: Warn,
    layout: "/admin",
  },
  {
    path: "/counter",
    name: "Redux",
    icon: BugReport,
    component: Counter,
    layout: "/admin",
  },
  {
    path: "/",
    name: "Home",
    icon: HomeIcon,
    component: Home,
    layout: "/admin",
  },
];

export default AppRoutes;

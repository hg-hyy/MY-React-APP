import Dashboard from "@mui/icons-material/Dashboard";
import Person from "@mui/icons-material/Person";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import EditIcon from "@mui/icons-material/Edit";
import AppsIcon from "@mui/icons-material/Apps";
import HomeIcon from "@mui/icons-material/Home";
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

const AppRoutes = [
  {
    path: "/todo",
    name: "todo",
    icon: AppsIcon,
    component: ToDo,
    layout: "/admin",
    auth: false,
  },
  {
    path: "/cart",
    name: "cart",
    icon: Dashboard,
    component: Cart,
    layout: "/admin",
    auth: false,
  },
  {
    path: "/blog",
    name: "blog",
    icon: EditIcon,
    component: Blog,
    layout: "/admin",
    auth: false,
  },
  {
    path: "/profile",
    name: "profile",
    icon: FavoriteIcon,
    component: Profile,
    layout: "/admin",
    auth: false,
  },
  {
    path: "/show",
    name: "show",
    icon: ChatIcon,
    component: Show,
    layout: "/admin",
    auth: false,
  },
  {
    path: "/photo",
    name: "photo",
    icon: PhotoCameraIcon,
    component: Photo,
    layout: "/admin",
    auth: false,
  },
  {
    path: "/login",
    name: "login",
    icon: LockOpenIcon,
    component: Login,
    layout: "/admin",
  },
  {
    path: "/regist",
    name: "regist",
    icon: Person,
    component: Regist,
    layout: "/admin",
  },
  {
    path: "/",
    name: "home",
    icon: HomeIcon,
    component: Home,
    layout: "/admin",
    exact: true,
  },
];

export default AppRoutes;

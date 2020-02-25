import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";
import EditIcon from "@material-ui/icons/Edit";
import AppsIcon from "@material-ui/icons/Apps";
import HomeIcon from "@material-ui/icons/Home";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

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
    auth: true
  },
  {
    path: "/cart",
    name: "cart",
    icon: Dashboard,
    component: Cart,
    layout: "/admin",
    auth: true
  },
  {
    path: "/blog",
    name: "blog",
    icon: EditIcon,
    component: Blog,
    layout: "/admin",
    auth: true
  },
  {
    path: "/profile",
    name: "profile",
    icon: FavoriteIcon,
    component: Profile,
    layout: "/admin",
    auth: true,
  },
  {
    path: "/show",
    name: "show",
    icon: ChatIcon,
    component: Show,
    layout: "/admin",
    auth: true
  },
  {
    path: "/photo",
    name: "photo",
    icon: PhotoCameraIcon,
    component: Photo,
    layout: "/admin",
    auth: true
  },
  {
    path: "/login",
    name: "login",
    icon: LockOpenIcon,
    component: Login,
    layout: "/admin"
  },
  {
    path: "/regist",
    name: "regist",
    icon: Person,
    component: Regist,
    layout: "/admin"
  },
  {
    path: "/",
    name: "home",
    icon: HomeIcon,
    component: Home,
    layout: "/admin",
    exact: true
  }
];

export default AppRoutes;

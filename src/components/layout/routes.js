import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
import MenuIcon from "@material-ui/icons/Menu";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PersonIcon from "@material-ui/icons/Person";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";
import EditIcon from "@material-ui/icons/Edit";
import AppsIcon from "@material-ui/icons/Apps";

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
    path: "/ToDo",
    name: "ToDo",
    icon: Dashboard,
    component: ToDo,
    layout: "/admin",
    auth: true
  },
  {
    path: "/Cart",
    name: "Cart",
    icon: Person,
    component: Cart,
    layout: "/admin",
    auth: true
  },
  {
    path: "/Blog",
    name: "Blog",
    icon: MenuIcon,
    component: Blog,
    layout: "/admin",
    auth: true
  },
  {
    path: "/Login",
    name: "Login",
    icon: LibraryBooks,
    component: Login,
    layout: "/admin",
  },
  {
    path: "/Home",
    name: "Home",
    icon: BubbleChart,
    component: Home,
    layout: "/admin",
  },
  {
    path: "/Regist",
    name: "Regist",
    icon: LocationOn,
    component: Regist,
    layout: "/admin",
  },
  {
    path: "/Show",
    name: "Show",
    icon: Notifications,
    component: Show,
    layout: "/admin",
    auth: true
  },
  {
    path: "/",
    name: "Profile",
    icon: Unarchive,
    component: Profile,
    layout: "/admin",
    auth: true,
    exact: true
  },
  {
    path: "/Photo",
    name: "Photo",
    icon: Language,
    component: Photo,
    layout: "/admin",
    auth: true
  },
];

export default AppRoutes;

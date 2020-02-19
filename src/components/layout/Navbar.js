import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
// eslint-disable-next-line
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Right from "./Right";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import AddIcon from "@material-ui/icons/Add";
import Remove from "@material-ui/icons/Remove";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import img from "../../images/CL/CL1.jpg";
import Divider from "@material-ui/core/Divider";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import Chips from "../widgets/Chips";

import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Poppers from "@material-ui/core/Popper";
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";

import styles from "../../assets/styles/NavbarStyle";

const useStyles = makeStyles(styles);

function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <PeopleAltIcon fontSize="large" />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

function AlignItemsList(props) {
  const classes = useStyles();
  const { data } = props;
  return (
    <List className={classes.root}>
      <ListItem style={{ padding: 0, margin: 0 }}>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={img} />
        </ListItemAvatar>
        <ListItemText
          primary={data.email ? data.email : "未登录"}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="overline"
                className={classes.inline}
                color="textPrimary"
              >
                {data.email ? "Administrator" : ""}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}

function Navbar(props) {
  const classes = useStyles();
  const { open, handleDrawerToggle } = props;
  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: open
          })}
        >
          {open ? <Remove /> : <AddIcon />}
          {/* <MenuIcon /> */}
        </IconButton>
        <Typography variant="h6" noWrap className={classes.title}>
          My React APP
        </Typography>

        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>

        <IconButton color="inherit">
          <Badge badgeContent={66} color="secondary">
            <NotificationsIcon fontSize="large" />
          </Badge>
        </IconButton>

        <SimpleMenu />
        <AlignItemsList {...props} />

        <Chips img={img} {...props} />

        <Divider orientation="vertical" />

        <Right />
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = (state, ownProps) => ({
  isAuthenticated: state.loginReducer.isAuthenticated,
  data: state.reduxReducer.data
});

export default connect(mapStateToProps)(Navbar);

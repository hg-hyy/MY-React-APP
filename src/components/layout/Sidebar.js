import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import clsx from "clsx";
// eslint-disable-next-line
import Hidden from "@material-ui/core/Hidden";
// eslint-disable-next-line
import Tooltip from "@material-ui/core/Tooltip";
// eslint-disable-next-line
import Profile from "./Profile";
// import AdminNavbarLinks from "./AdminNavbarLinks";
import Icon from "@material-ui/core/Icon";
import styles from "../../assets/styles/sidebarStyle";
import { Typography, Divider } from "@material-ui/core";

const useStyles = makeStyles(styles);

function Sidebar(props) {
  const classes = useStyles();
  // eslint-disable-next-line
  const { color, logo, img, logoText, AppRoutes,open, handleDrawerToggle } = props;

  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }

  var links = (
    <List className={classes.list}>
      {AppRoutes &&
        AppRoutes.map((prop, key) => {
          var activePro = " ";
          var listItemClasses;
          if (prop.path === "/") {
            activePro = classes.activePro + " ";
            listItemClasses = clsx({
              [" " + classes[color]]: true
            });
          } else {
            listItemClasses = clsx({
              [" " + classes[color]]: activeRoute(prop.path)
            });
          }
          const whiteFontClasses = clsx({
            [" " + classes.whiteFont]: activeRoute(prop.path)
          });
          return (
            <NavLink
              to={prop.path}
              className={activePro + classes.item}
              activeClassName="active"
              key={key}
            >
              <Tooltip title={prop.name} placement="right" key={prop.name}  enterDelay={300}>
                <ListItem button className={classes.itemLink + listItemClasses}>
                  {typeof prop.icon === "string" ? (
                    <Icon
                      className={clsx(classes.itemIcon, whiteFontClasses)}
                      fontSize="large"
                    >
                      {prop.icon}
                    </Icon>
                  ) : (
                    <prop.icon
                      className={clsx(classes.itemIcon, whiteFontClasses)}
                    />
                  )}

                  <ListItemText
                    primary={prop.name}
                    className={clsx(classes.itemText, whiteFontClasses)}
                    disableTypography={true}
                  />
                  <Divider />
                </ListItem>
              </Tooltip>
            </NavLink>
          );
        })}
    </List>
  );
  // eslint-disable-next-line
  var brand = (
    <div className={classes.logo}>
      <a
        href="/"
        className={classes.logoLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        <Typography variant="h6">{logoText}</Typography>
      </a>
    </div>
  );

  return (
    <Drawer
      variant="permanent"
      ModalProps={{
        keepMounted: true // Better open performance on mobile.
      }}
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })
      }}
    >
      <Profile  {...props}/>
      <div
        className={clsx(classes.sidebarWrapper, {
          [classes.drawerClose]: !open
        })}
      >
        {links}
      </div>
      {img !== undefined ? (
        <div
          className={classes.background}
          style={{ backgroundImage: "url(" + img + ")" }}
          // style={{ backgroundImage: 'url("https://source.unsplash.com/random")' }}
        />
      ) : null}
    </Drawer>
  );
}

Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => ({
  isAuthenticated: state.loginReducer.isAuthenticated,
  data: state.reduxReducer.data
});

export default connect(mapStateToProps)(Sidebar);

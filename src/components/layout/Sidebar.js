import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import Tooltip from "@mui/material/Tooltip";
import Profile from "./Profile";
import { Divider } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

function Sidebar(props) {
  const { AppRoutes, open } = props;

  const links = (
    <List sx={{ zIndex: 1002 }}>
      {AppRoutes &&
        AppRoutes.map((item, key) => {
          return (
            <NavLink
              to={item.path}
              activeclassname="active"
              key={key}
              style={({ isActive }) => {
                return {
                  display: "block",
                  backgroundColor: isActive ? "blue" : "",
                };
              }}
            >
              <Tooltip
                title={item.name}
                placement="right"
                key={item.name}
                enterDelay={300}
              >
                <ListItem
                  key={item.name}
                  disablePadding
                  sx={{ display: "block" }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                      children={<item.icon />}
                    ></ListItemIcon>

                    <ListItemText
                      primary={item.name}
                      sx={{
                        opacity: open ? 1 : 0,
                        // bgcolor: "primary.main",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </Tooltip>
              <Divider />
            </NavLink>
          );
        })}
    </List>
  );
  return (
    <div>
      <Profile {...props} />
      {links}
    </div>
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
  open: PropTypes.bool,
};

export default Sidebar;

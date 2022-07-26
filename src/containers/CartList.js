import React from "react";
import { makeStyles } from "@mui/styles";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/Inbox";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  root1: {
    "& > *": {
      margin: theme.spacing(1),
      width: 500,
    },
  },
  root2: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing(1),
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
}));

export default function CartList(props) {
  const classes = useStyles();
  const { carts } = props;
  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        {carts &&
          carts.map((cart) => (
            <ListItem button key={cart.product}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>

              <ListItemText primary={cart.product} />
              <ListItemText primary={cart.quantity} />
              <ListItemText primary={cart.unitCost} />
            </ListItem>
          ))}
      </List>
    </div>
  );
}

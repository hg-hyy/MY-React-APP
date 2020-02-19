import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/Inbox";

const useStyles = makeStyles(theme => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: 200
      }
    },
    root1: {
      "& > *": {
        margin: theme.spacing(1),
        width: 500
      }
    },
    root2: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 300
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    },
    extendedIcon: {
      marginRight: theme.spacing(1)
    },
    margin: {
      margin: theme.spacing(1)
    },
    container: {
      display: "flex",
      flexWrap: "wrap"
    }
  }));

export default   function CartList(props) {
    const classes = useStyles();
    const {carts} = props
    return (
      <div className={classes.root}>
        <List component="nav" aria-label="main mailbox folders">
          {carts &&
            carts.map(cart => (
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
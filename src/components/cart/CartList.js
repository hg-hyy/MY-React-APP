import React from "react";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/Inbox";
import Paper from "@mui/material/Paper";

export default function CartList(props) {
  const { carts } = props;
  return (
    <Box sx={{ width: "50%" }}>
      <List component={Paper}>
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
    </Box>
  );
}

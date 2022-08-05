import React from "react";
import { useSelector } from "react-redux";
import CartTable from "./CartTable";
import CartForm from "./CartForm";
import CartList from "./CartList";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

function Cart() {
  const carts = useSelector((state) => state.cartReducer.cart);

  return (
    <Container
      component={Paper}
      maxWidth="xxl"
      sx={{ pt: 3, display: "flex", flexGrow: 1, flexWrap: "wrap" }}
    >
      <CartList carts={carts} />
      <CartTable carts={carts} />
      <CartForm carts={carts} />
    </Container>
  );
}

export default Cart;

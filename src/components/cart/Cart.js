import React from "react";
import { useSelector } from "react-redux";

import Deposits from "./Deposits";
import VerticalTabs from "./VerticalTabs";
import HorizontalTabs from "./HorizontalTabs";
import CartTable from "./CartTable";
import CartForm from "./CartForm";

import Line from "../chart/Line";

import Container from "@mui/material/Container";

function Cart() {
  const carts = useSelector((state) => state.cartReducer.cart);

  return (
    <Container
      maxWidth="xxl"
      sx={{ pt: 3, display: "flex", flexGrow: 1, flexWrap: "wrap" }}
    >
      <HorizontalTabs />
      <Deposits />
      <Line />
      <CartTable carts={carts} />
      <VerticalTabs carts={carts} />
      <CartForm />
    </Container>
  );
}

export default Cart;

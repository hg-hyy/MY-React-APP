import React from "react";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import Deposits from "./Deposits";
import VerticalTabs from "./VerticalTabs";
import HorizontalTabs from "./HorizontalTabs";
import CartTable from "./CartTable";
import CartForm from "./CartForm";
import Donut from "./Donut";
import Line from "../chart/Line";

import Container from "@mui/material/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    // padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "row",
  },
  fixedHeight: {
    height: 546,
  },
  fixedHeight1: {
    height: 268,
  },
  fixedHeight2: {
    height: 374,
  },
}));
function Cart() {
  const classes = useStyles();
  const carts = useSelector((state) => state.cartReducer.cart);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaper1 = clsx(classes.paper, classes.fixedHeight1);
  const fixedHeightPaper2 = clsx(classes.paper, classes.fixedHeight2);
  return (
    <Container maxWidth="xxl" sx={{ pt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} lg={5}>
          <Paper className={fixedHeightPaper}>
            <HorizontalTabs />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <Deposits />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Paper className={fixedHeightPaper}>
            <Donut />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={6}>
          <Paper className={fixedHeightPaper2}>
            <Line />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} lg={6}>
          <Paper className={fixedHeightPaper2}>
            <CartTable carts={carts} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} lg={6}>
          <Paper className={fixedHeightPaper1}>
            <VerticalTabs carts={carts} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} lg={6}>
          <Paper className={fixedHeightPaper1}>
            <CartForm />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Cart;

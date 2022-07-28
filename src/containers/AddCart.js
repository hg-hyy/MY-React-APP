import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";

import Deposits from "../components/cart/Deposits";
import VerticalTabs from "../components/cart/VerticalTabs";
import HorizontalTabs from "../components/cart/HorizontalTabs";
import CartTable from "./CartTable";
import CartForm from "./CartForm";
import Donut from "../components/cart/Donut";
import Line from "../components/chart/Line";

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
export default function AddToCart(props) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaper1 = clsx(classes.paper, classes.fixedHeight1);
  const fixedHeightPaper2 = clsx(classes.paper, classes.fixedHeight2);
  const { carts, addCart, updCart, delCart, delCartByID, seleteFromCart } =
    props;
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
            <CartForm
              carts={carts}
              addCart={addCart}
              updCart={updCart}
              delCart={delCart}
              delCartByID={delCartByID}
              seleteFromCart={seleteFromCart}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

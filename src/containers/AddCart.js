import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import Deposits from "../components/cart/Deposits";
import VerticalTabs from "../components/cart/VerticalTabs";
import HorizontalTabs from "../components/cart/HorizontalTabs";
import CartTable from "./CartTable";
import CartForm from "./CartForm";
import { Container } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  paper: {
    // padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 650,
  },
  fixedHeight1: {
    height: 400,
  },
}))
export default function AddToCart(props) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaper1 = clsx(classes.paper, classes.fixedHeight1);
  const {
    carts,
    addCart,
    updCart,
    delCart,
    delCartByID,
    seleteFromCart
  } = props;
  return (
    <Container>
    <Grid container spacing={2}>
      <Grid item xs={12} md={8} lg={8}>
        <Paper className={fixedHeightPaper}>
          <HorizontalTabs />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={4}>
        <Paper className={fixedHeightPaper}>
          <Deposits />
        </Paper>
      </Grid>
      <Grid item xs={12} md={8} lg={12}>
        <CartTable carts={carts} />
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
  </Container>);
}

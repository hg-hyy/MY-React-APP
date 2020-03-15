import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Container from "@material-ui/core/Container";

import Carousel from "./Carousel";
import Checkout from "./checkout/Checkout";
import Price from "./Price";
import Album from "./Album";
import NavBar from "./NavBar";
import Footer from "./Footer";
import NotFound from "../notfound/404";

export default function Home() {
  let { path } = useRouteMatch(); // /home

  return (
    <Container maxWidth="xl">
      <NavBar />
      <Switch>
        <Route exact path={`${path}/price`}>
          <Price />
        </Route>
        <Route exact path={`${path}/album`}>
          <Album />
        </Route>
        <Route  exact path={`${path}/checkout`}>
          <Checkout />
        </Route>
        <Route exact path={path}>
          <Carousel />
        </Route>
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </Container>
  );
}

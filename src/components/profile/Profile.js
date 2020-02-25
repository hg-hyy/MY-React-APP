import React from "react";
import { Grid } from "@material-ui/core";

import Htab from "./Htab";
import IDcard from "./IDcard";
import img2 from "../../images/chanel/2.jpg";

export default function Profile({ carts }) {
  return (
    <Grid container spacing={5}>
      <Grid item sm={12} md={4} lg={4}>
        <IDcard img={img2} />
      </Grid>
      <Grid item sm={12} md={8} lg={8}>
        <Htab />
      </Grid>
    </Grid>
  );
}

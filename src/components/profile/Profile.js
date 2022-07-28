import React from "react";
import { Grid } from "@mui/material";

import Htab from "./Htab";
import IDcard from "./IDcard";
import img2 from "../../images/chanel/2.jpg";
import Container from "@mui/material/Container";

export default function Profile({ carts }) {
  return (
    <Container maxWidth="xxl" sx={{ pt: 3 }}>
      <Grid container spacing={5}>
        <Grid item sm={12} md={4} lg={4}>
          <IDcard img={img2} />
        </Grid>
        <Grid item sm={12} md={8} lg={8}>
          <Htab />
        </Grid>
      </Grid>
    </Container>
  );
}

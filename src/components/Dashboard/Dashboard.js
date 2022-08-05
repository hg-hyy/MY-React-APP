import React from "react";
import Deposits from "./Deposits";
import Line from "../chart/Line";
import Container from "@mui/material/Container";
function Dashboard() {
  return (
    <Container
      maxWidth="xxl"
      sx={{ pt: 3, display: "flex", flexGrow: 1, flexWrap: "wrap" }}
    >
      <Deposits />
      <Line />
    </Container>
  );
}

export default Dashboard;

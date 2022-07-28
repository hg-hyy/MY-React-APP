import React from "react";
import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";

import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Home() {
  return (
    <Container maxWidth="xxl" sx={{ pt: 3 }}>
      <NavBar />
      <Outlet />
      <Footer />
    </Container>
  );
}

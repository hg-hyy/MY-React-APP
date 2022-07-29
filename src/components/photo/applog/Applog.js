/* jshint esversion: 6 */
import React from "react";
import Antdlist from "./antdlist";
import MyTable from "./mytable";
import Myform from "./myform";
import Antdform from "./antdform";
import "bootstrap/dist/css/bootstrap.min.css";
import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/core/dist/PNotify.css";
import Box from "@mui/material/Box";

function Applog() {
  return (
    <Box>
      <Antdlist />
      <MyTable />
      <Myform />
      <Antdform />
    </Box>
  );
}

export default Applog;

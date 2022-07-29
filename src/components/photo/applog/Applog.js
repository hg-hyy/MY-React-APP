/* jshint esversion: 6 */
import React from "react";
import Antdlist from "./antdlist";
import AntdTable from "./antdtable";
import Antdform from "./antdform";
import "bootstrap/dist/css/bootstrap.min.css";
import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/core/dist/PNotify.css";
import Box from "@mui/material/Box";

function Applog() {
  return (
    <Box>
      <Antdlist />
      <AntdTable />
      <Antdform />
    </Box>
  );
}

export default Applog;

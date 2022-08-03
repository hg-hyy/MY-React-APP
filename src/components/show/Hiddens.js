import React from "react";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Hiddens(props) {
  const { width } = props;
  // eslint-disable-next-line
  const hidden = useMediaQuery((theme) => theme.breakpoints.up("xs"));
  // const theme = useTheme();
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1b5e20",
        dark: "#0277bd",
        light: "#e1f5fe",
      },
    },
  });
  return (
    <Box sx={{ flexGrow: 1, height: "100%" }}>
      <Paper sx={{ backgroundColor: theme.palette.primary.dark }}>
        <Typography variant="subtitle1" gutterBottom>
          Current width: {width}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Item>xs=8</Item>
          </Grid>
          <Grid item xs={4}>
            <Item>xs=4</Item>
          </Grid>
          <Grid item xs={4}>
            <Item>xs=4</Item>
          </Grid>
          <Grid item xs={8}>
            <Item>xs=8</Item>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

Hiddens.propTypes = {
  width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired,
};
// eslint-disable-next-line
function useWidth() {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || "xs"
  );
}

export default Hiddens;

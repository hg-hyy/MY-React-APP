import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import red from "@mui/material/colors/red";
import purple from "@mui/material/colors/purple";
import { makeStyles, ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";

import Typography from "@mui/material/Typography";
const primary = red[500]; // #F44336
const accent = purple.A200; // #E040FB (替代方法)
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    width: 300,
  },
  high: {
    backgroundColor: accent,
    color: primary,
  },
}));
const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    // primary:purple,
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
    divider: "rgba(255,255,255,1)",
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

function Types(props) {
  const classes = useStyles();
  const { temp } = props;
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        {temp > 50 ? (
          <Typography variant="h4" gutterBottom className={classes.high}>
            当前温度：{temp}
          </Typography>
        ) : (
          <Typography variant="h4" gutterBottom>
            当前温度：{temp}
          </Typography>
        )}
        <Button color="primary">Click me</Button>
        <Divider />
      </div>
    </ThemeProvider>
  );
}

function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}
function TempInput(props) {
  const classes = useStyles();
  const { celsius, handleCelsiusChange, fahrenheit, handleFahrenheitChange } =
    props;
  return (
    <div className={classes.root}>
      <TextField
        id="Celsius"
        label="Celsius"
        color="primary"
        value={celsius}
        onChange={handleCelsiusChange}
        variant="outlined"
      />
      <TextField
        id="Fahrenheit"
        label="Fahrenheit"
        color="secondary"
        value={fahrenheit}
        onChange={handleFahrenheitChange}
        variant="outlined"
      />
      <Types temp={parseFloat(celsius)} />
    </div>
  );
}
export default function TmepCalc() {
  const [celsius, setCelsius] = React.useState("0");
  const [fahrenheit, setFahrenheit] = React.useState("0");

  const handleCelsiusChange = (event) => {
    const input = parseFloat(event.target.value);
    if (Number.isNaN(input)) {
      setCelsius("请输入数字");
      return;
    }
    const fahrenheit = toFahrenheit(input);
    const f = Math.round(fahrenheit * 1000) / 1000;
    setCelsius(input.toString());
    setFahrenheit(f.toString());
  };
  const handleFahrenheitChange = (event) => {
    const input = parseFloat(event.target.value);
    if (Number.isNaN(input)) {
      setFahrenheit("请输入数字");
      return;
    }
    const celsius = toCelsius(input);
    const c = Math.round(celsius * 1000) / 1000;
    setCelsius(c.toString());
    setFahrenheit(input.toString());
  };

  return (
    <TempInput
      celsius={celsius}
      fahrenheit={fahrenheit}
      handleCelsiusChange={handleCelsiusChange}
      handleFahrenheitChange={handleFahrenheitChange}
    />
  );
}

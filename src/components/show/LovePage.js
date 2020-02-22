import React, { useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Theme from "../widgets/Theme"
import App from "../widgets/useContext"
import Calculator from "../widgets/Calculator"
const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 300
    }
  }
}));

export default function LovePage() {
  const classes = useStyles();
  const inputEl = useRef(null);
  const [value, setValue] = React.useState("oooopp...");

  const handleChange = event => {
    setValue(event.target.value);
  };
  // 你可以直接获取 DOM button 的 ref：
  useEffect(() => {
    console.log(inputEl.current);
  });

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="email"
        label="email"
        type="email"
        defaultValue="email"
        helperText="email"
        variant="outlined"
        margin="normal"
      />
      <TextField
        id="comment"
        label="comment"
        multiline
        rows="1"
        variant="outlined"
        margin="normal"
        value={value}
        onChange={handleChange}
        ref={inputEl}
      />
      <Button variant="outlined" color="primary">
        Click me
      </Button>
      <Theme/>
      <App/>
      <Calculator/>
    </form>
  );
}

import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import Fab from "@material-ui/core/Fab";
import CheckIcon from "@material-ui/icons/Check";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center"
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative"
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

function CircularStatic() {
  const [completed, setCompleted] = React.useState(0);
  React.useEffect(() => {
    function progress() {
      setCompleted(prevCompleted =>
        prevCompleted >= 100 ? 0 : prevCompleted + 10
      );
    }

    const timer = setInterval(progress, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <CircularProgress variant="static" value={completed} />;
}

function CircularIntegration() {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Fab
          aria-label="save"
          color="primary"
          className={buttonClassname}
          onClick={handleButtonClick}
        >
          {success ? <CheckIcon /> : <SaveIcon />}
        </Fab>
        {loading && (
          <CircularProgress size={68} className={classes.fabProgress} />
        )}
      </div>
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          color="primary"
          className={buttonClassname}
          disabled={loading}
          onClick={handleButtonClick}
        >
          Accept terms
        </Button>
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>
    </div>
  );
}

function MultilineTextFields() {
  const [value, setValue] = React.useState("Controlled");

  const handleChange = event => {
    setValue(event.target.value);
  };
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  return (
    <form noValidate autoComplete="off">
      <Box display="flex" width="100%">
        <Box bgcolor="brown.300" width="50%" p={1}>
          <TextField
            id="Username"
            label="Username"
            placeholder="Placeholder"
            helperText="Full width!"
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            variant="outlined"
          />
        </Box>
        <Box bgcolor="grey.300" width="50%" p={1}>
          <TextField
            id="Username"
            label="Username"
            placeholder="Placeholder"
            helperText="Full width!"
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            variant="outlined"
          />
        </Box>
      </Box>
      <Box display="flex" width="100%">
        <Box bgcolor="grey.300" width="50%" p={1}>
          <TextField
            id="Username"
            label="Username"
            placeholder="Placeholder"
            helperText="Full width!"
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            variant="outlined"
          />
        </Box>
        <Box bgcolor="grey.300" width="50%" p={1}>
          <TextField
            id="Username"
            label="Username"
            placeholder="Placeholder"
            helperText="Full width!"
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            variant="outlined"
          />
        </Box>
      </Box>
      <Box display="flex" width="100%">
        <Box bgcolor="grey.300" width="50%" p={1}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
              Age
            </InputLabel>
            <Select
              native
              value={value}
              onChange={handleChange}
              labelWidth={labelWidth}
              inputProps={{
                name: "age",
                id: "outlined-age-native-simple"
              }}
            >
              <option value="" />
              <option value={10}>Ten</option>
              <option value={20}>Twenty</option>
              <option value={30}>Thirty</option>
            </Select>
          </FormControl>
        </Box>
        <Box bgcolor="grey.300" width="50%" p={1}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
              Counttry
            </InputLabel>
            <Select
              native
              value={value}
              fullWidth
              onChange={handleChange}
              labelWidth={labelWidth}
              inputProps={{
                name: "age",
                id: "outlined-age-native-simple"
              }}
            >
              <option value="" />
              <option value={10}>Ten</option>
              <option value={20}>Twenty</option>
              <option value={30}>Thirty</option>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box display="flex" width="100%">
        <Box bgcolor="grey.300" width="100%" p={1}>
          <TextField
            id="comment"
            label="Multiline"
            multiline
            fullWidth
            rows="10"
            defaultValue="Default Value"
            variant="outlined"
          />
        </Box>
      </Box>
      <Box display="flex" flexDirection="row-reverse">
        <CircularIntegration />
        <CircularStatic />
      </Box>
    </form>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

export default function Htab() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root1}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="tabs">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <MultilineTextFields />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </div>
  );
}

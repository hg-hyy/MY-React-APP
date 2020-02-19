import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 150,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column",
    "& > *": {
      marginBottom: theme.spacing(0)
    },
    "& .MuiBadge-root": {
      marginRight: theme.spacing(4)
    }
  },
  paper: {
    width: "80%",
    maxHeight: 435
  }
}));

const options = [
  "None",
  "purple",
  "blue",
  "green",
  "orange",
  "red",
];

function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  const handleChange = event => {
    setValue(event.target.value);
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      onEntering={handleEntering}
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">Phone Ringtone</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="ringtone"
          name="ringtone"
          value={value}
          onChange={handleChange}
        >
          {options.map(option => (
            <FormControlLabel
              value={option}
              key={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function Chips(props) {
  const classes = useStyles();
  const {changeTheme} = props
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("none");
  // eslint-disable-next-line
  const { img, data } = props;
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = newValue => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
      changeTheme(newValue)
      
    }
  };

  return (
    <div className={classes.root}>
      <Grid>
        <Chip
          variant="outlined"
          color="primary"
          deleteIcon={<DoneIcon />}
          onDelete={handleClose}
          label={value}
          avatar={<Avatar src={img} />}
          onClick={handleOpen}
        />
        <ConfirmationDialogRaw
          classes={{
            paper: classes.paper
          }}
          id="ringtone-menu"
          keepMounted
          open={open}
          onClose={handleClose}
          value={value}
        />
      </Grid>
    </div>
  );
}

export default Chips;

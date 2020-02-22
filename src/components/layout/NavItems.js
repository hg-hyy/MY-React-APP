import React, { useEffect, useState } from "react";
import { makeStyles,useTheme  } from "@material-ui/core/styles";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
// eslint-disable-next-line
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Right from "./Right";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Remove from "@material-ui/icons/Remove";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import img from "../../images/CL/CL1.jpg";
import Divider from "@material-ui/core/Divider";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import styles from "../../assets/styles/NavbarStyle";
import { Grid } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Popover from "@material-ui/core/Popover";
import MenuList from "@material-ui/core/MenuList";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import CommentIcon from "@material-ui/icons/Comment";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Tooltip from "@material-ui/core/Tooltip";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";

const useStyles = makeStyles(styles);
const options = ["None", "purple", "blue", "green", "orange", "red"];
const names = ["harlen", "moham", "sarah", "visual", "wesley", "zuhri"];
const r = require.context("../../images/theme", false, /^\.\/.*\.jpg$/);
const images = r.keys().map(r);
const data = [];
images.map((image, index) => {
  return data.push({
    imgs: image,
    theme: names[index]
  });
});

function User() {
  const classes = useStyles();
  // const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      // setOpen(false);
    }
  }
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className={classes.navitems}>
      <Button
        color="inherit"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <PeopleAltIcon fontSize="large" />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <MenuList
          autoFocusItem={open}
          id="menu-list-grow"
          onKeyDown={handleListKeyDown}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </MenuList>
      </Popover>
    </div>
  );
}

function Notify(props) {
  // const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [checked, setChecked] = useState([0]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className={classes.navitems}>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={99} color="secondary">
          <NotificationsIcon fontSize="large" />
        </Badge>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <List className={classes.notify}>
          {[0, 1].map(value => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <ListItem
                key={value}
                role={undefined}
                dense
                button
                onClick={handleToggle(value)}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="comments">
                    <CommentIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-label="Expand"
            aria-controls="additional-actions1-content"
            id="additional-actions1-header"
          >
            <FormControlLabel
              aria-label="Acknowledge"
              onClick={event => event.stopPropagation()}
              onFocus={event => event.stopPropagation()}
              control={<Checkbox />}
              label="I propagation"
            />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography color="textSecondary">
              The click event of the nested action will
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Popover>
    </div>
  );
}

function Account(props) {
  const classes = useStyles();
  const { data } = props;
  return (
    <List className={classes.account}>
      <ListItem style={{ padding: 0, margin: 0 }}>
        {data.email ? (
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={img} />
          </ListItemAvatar>
        ) : null}

        <ListItemText
          className={classes.account}
          primary={data.email ? data.email : "未登录"}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="overline"
                className={classes.inline}
                color="textPrimary"
              >
                {data.email ? "Administrator" : ""}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}

function Chips(props) {
  const classes = useStyles();
  const [modelopen, setModelopen] = useState(false);
  const [value, setValue] = useState("blue");
  const { img, changeTheme } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "pop" : undefined;
  const handleClose = newValue => {
    setModelopen(false);

    if (newValue) {
      setValue(newValue);

      data.map(item => {
        if (item.theme === newValue) {
          newValue = item.imgs;
          return newValue;
        }
        return newValue;
      });
      changeTheme(newValue);
    }
    setAnchorEl(null);
  };

  const handleOpen = event => {
    setModelopen(true);
    // setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <Chip
        variant="outlined"
        deleteIcon={<DoneIcon />}
        onDelete={handleClose}
        label={value}
        avatar={<Avatar src={img} />}
        onClick={handleOpen}
      />
      <Pop
        id={id}
        open={open}
        onClose={handleClose}
        value={value}
        anchorEl={anchorEl}
        classes={classes}
      />
      <Model
        classes={{
          paper: classes.paper
        }}
        id="ringtone-menu"
        keepMounted
        open={modelopen}
        onClose={handleClose}
        value={value}
      />
    </div>
  );
}
function Model(props) {
  const classes = useStyles();
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = useState(valueProp);
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
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Gender</FormLabel>
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
        </FormControl>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Theme</FormLabel>
          <RadioGroup
            ref={radioGroupRef}
            aria-label="ringtone"
            name="ringtone"
            value={value}
            onChange={handleChange}
          >
            {data.map(option => (
              <FormControlLabel
                value={option.theme}
                key={option.theme}
                control={<Radio />}
                label={option.theme}
              />
            ))}
          </RadioGroup>
        </FormControl>
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
function Pop(props) {
  const { id, onClose, value: valueProp, open, anchorEl, classes } = props;
  const [value, setValue] = useState(valueProp);

  useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

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
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
    >
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Color</FormLabel>
        <RadioGroup
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
      </FormControl>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Theme</FormLabel>
        <RadioGroup
          aria-label="ringtone"
          name="ringtone"
          value={value}
          onChange={handleChange}
        >
          {data.map(option => (
            <FormControlLabel
              value={option.theme}
              key={option.theme}
              control={<Radio />}
              label={option.theme}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <FormControl component="fieldset" className={classes.formControl}>
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary">
          Ok
        </Button>
      </FormControl>
    </Popover>
  );
}

export default function NavItems(props) {
  const classes = useStyles();
  const { open, handleDrawerToggle,changeTheme } = props;
  const theme = useTheme();
  const handleTogglePaletteType = () => {
    const paletteType = theme.palette.type === "light" ? "dark" : "light";

    changeTheme(paletteType );
  };
  return (
    <Grid container direction="row" alignItems="center" justify="space-between">
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerToggle}
        edge="start"
        className={clsx(classes.menuButton, {
          [classes.hide]: open
        })}
      >
        {open ? <Remove /> : <MenuIcon />}
        {/* <MenuIcon /> */}
      </IconButton>
      <Typography variant="h6" noWrap className={classes.title}>
        My React APP
      </Typography>

      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>

      <Notify {...props} />
      <User />
      <Tooltip title="toggleTheme" enterDelay={300}>
        <IconButton
          color="inherit"
          onClick={handleTogglePaletteType}
          aria-label="toggleTheme"
          data-ga-event-category="AppBar"
          data-ga-event-action="dark"
        >
          {theme.palette.type === "light" ? (
            <Brightness4Icon />
          ) : (
            <Brightness7Icon />
          )}
        </IconButton>
      </Tooltip>
      <Account {...props} />
      <Chips img={img} {...props} />
      <Divider orientation="vertical" flexItem />
      <Right />
    </Grid>
  );
}

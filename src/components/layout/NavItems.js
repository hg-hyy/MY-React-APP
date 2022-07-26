import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@mui/styles";
import clsx from "clsx";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
// eslint-disable-next-line
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Right from "./Right";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Remove from "@mui/icons-material/Remove";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import img from "../../images/CL/CL1.jpg";
import Divider from "@mui/material/Divider";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import styles from "../../assets/styles/NavbarStyle";
import { Grid } from "@mui/material";
import Chip from "@mui/material/Chip";
import DoneIcon from "@mui/icons-material/Done";
import FormControlLabel from "@mui/material/FormControlLabel";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Popover from "@mui/material/Popover";
import MenuList from "@mui/material/MenuList";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Checkbox from "@mui/material/Checkbox";
import CommentIcon from "@mui/icons-material/Comment";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import { styled, alpha } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Tooltip from "@mui/material/Tooltip";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useSelector } from "react-redux";

const useStyles = makeStyles(styles);
const options = ["None", "purple", "blue", "green", "orange", "red"];
const names = ["harlen", "moham", "sarah", "visual", "wesley", "zuhri"];
const r = require.context("../../images/theme", false, /^\.\/.*\.jpg$/);
const images = r.keys().map(r);
const data = [];

images.map((image, index) => {
  return data.push({
    imgs: image,
    theme: names[index],
  });
});
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
function User(props) {
  const classes = useStyles();
  const { loginOut } = props;
  // const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    loginOut(false);
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
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
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
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [checked, setChecked] = useState([0]);

  const handleToggle = (value) => () => {
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
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <List className={classes.notify}>
          {[0, 1].map((value) => {
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
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-label="Expand"
            aria-controls="additional-actions1-content"
            id="additional-actions1-header"
          >
            <FormControlLabel
              aria-label="Acknowledge"
              onClick={(event) => event.stopPropagation()}
              onFocus={(event) => event.stopPropagation()}
              control={<Checkbox />}
              label="I propagation"
            />
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="textSecondary">
              The click event of the nested action will
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Popover>
    </div>
  );
}

function Account(props) {
  const { isAuthenticated } = useSelector(
    (state) => state.loginReducer.isAuthenticated
  );
  const { user } = useSelector((state) => state.reduxReducer.data);
  const classes = useStyles();
  return (
    <List className={classes.account}>
      <ListItem style={{ padding: 0, margin: 0 }}>
        {user.email ? (
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={img} />
          </ListItemAvatar>
        ) : null}

        <ListItemText
          className={classes.account}
          primary={user.email ? user.email : "未登录"}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="overline"
                className={classes.inline}
                color="textPrimary"
              >
                {user.email ? "Administrator" : ""}
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
  const handleClose = (newValue) => {
    setModelopen(false);

    if (newValue) {
      setValue(newValue);

      data.map((item) => {
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

  const handleOpen = (event) => {
    setModelopen(true);
    // setAnchorEl(event.currentTarget);
  };

  return (
    <Box sx={{ display: "flex" }}>
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
          paper: classes.paper,
        }}
        id="ringtone-menu"
        keepMounted
        open={modelopen}
        onClose={handleClose}
        value={value}
      />
    </Box>
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

  // eslint-disable-next-line
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

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Dialog
      disableEscapeKeyDown
      maxWidth="xs"
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
            {options.map((option) => (
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
            {data.map((option) => (
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

  const handleChange = (event) => {
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
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
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
          {options.map((option) => (
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
          {data.map((option) => (
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
  const { changeTheme } = props;
  const theme = useTheme();
  const handleTogglePaletteType = () => {
    const paletteType = theme.palette.mode === "light" ? "dark" : "light";

    changeTheme(paletteType);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyItems: "center",
        alignItems: "center",
      }}
    >
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>

      <Notify {...props} />
      <User {...props} />
      <Tooltip title="toggleTheme" enterDelay={300}>
        <IconButton
          color="inherit"
          onClick={handleTogglePaletteType}
          aria-label="toggleTheme"
          data-ga-event-category="AppBar"
          data-ga-event-action="dark"
        >
          {theme.palette.mode === "light" ? (
            <Brightness4Icon />
          ) : (
            <Brightness7Icon />
          )}
        </IconButton>
      </Tooltip>
      {/* <Account {...props} /> */}
      <Chips img={img} {...props} />
      <Divider orientation="vertical" flexItem />
      <Right />
    </Box>
  );
}

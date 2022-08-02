import React, { useEffect, useState, useContext } from "react";
import { useTheme } from "@mui/styles";
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
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import img from "../../images/CL/CL1.jpg";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
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
import Tooltip from "@mui/material/Tooltip";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useSelector, useDispatch } from "react-redux";
import { ColorModeContext } from "./theme-context";
import { loginOut } from "../../actions/login-actions";
import changeTheme from "../../actions/theme-actions";
// const options = ["None", "purple", "blue", "green", "orange", "red"];
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
  marginRight: theme.spacing(1),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
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
function User() {
  const dispatch = useDispatch();
  // const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    dispatch(loginOut(false));
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
    <Box sx={{ mx: 1 }}>
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
    </Box>
  );
}

function Notify() {
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
    <Box sx={{ mx: 1 }}>
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
        <List>
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
    </Box>
  );
}

function Account() {
  const { user } = useSelector((state) => state.reduxReducer.data);

  return (
    <List sx={{ mx: 1 }}>
      <ListItem style={{ padding: 0, margin: 0 }}>
        {user ? (
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={img} />
          </ListItemAvatar>
        ) : null}

        <ListItemText
          primary={user ? user.email : "未登录"}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="overline"
                color="textPrimary"
              >
                {user ? "Administrator" : ""}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}

function ThemeDialog(props) {
  const { handleClose, open, themevalue } = props;
  const [value, setValue] = React.useState(themevalue);
  const radioGroupRef = React.useRef(null);
  React.useEffect(() => {
    if (!open) {
      setValue(themevalue);
    }
  }, [themevalue, open]);
  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };
  const handleCancel = () => {
    handleClose();
  };

  const handleOk = () => {
    handleClose(value);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "50%", maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
      TransitionProps={{ onEntering: handleEntering }}
      ref={radioGroupRef}
    >
      <DialogTitle>Theme</DialogTitle>
      <DialogContent dividers>
        <RadioGroup name="theme" value={value} onChange={handleChange}>
          {data.map((option) => (
            <FormControlLabel
              value={option.theme}
              key={option.theme}
              control={<Radio />}
              label={option.theme}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

function Chips() {
  console.log("work");
  const [modelopen, setModelopen] = useState(false);
  const [label, setLabel] = useState("sarah");
  const dispatch = useDispatch();
  const handleClose = (newValue) => {
    if (newValue) {
      setLabel(newValue);
      dispatch(
        changeTheme(data.filter((item) => item.theme === newValue)[0].imgs)
      );
    }

    setModelopen(false);
  };

  const handleOpen = () => {
    setModelopen(true);
  };

  return (
    <Box sx={{ display: "flex", mx: 1 }}>
      <Chip
        variant="filled"
        color="success"
        avatar={<Avatar src={img} />}
        label={label}
        deleteIcon={<DoneIcon />}
        onClick={handleOpen}
      />
      <ThemeDialog
        id="theme-model"
        keepMounted
        open={modelopen}
        handleClose={handleClose}
        themevalue={label}
      />
    </Box>
  );
}

export default function NavItems(props) {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
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
          sx={{ mx: 1 }}
          onClick={colorMode.toggleColorMode}
          color="inherit"
        >
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Tooltip>
      <Account {...props} />

      <Chips img={img} {...props} />

      <Right />
    </Box>
  );
}

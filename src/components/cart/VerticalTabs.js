import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CartList from "./CartList";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import TextField from "@mui/material/TextField";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs({ carts }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 300,
        maxWidth: "50%",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="Item One" {...a11yProps(0)} />
        <Tab label="Item Two" {...a11yProps(1)} />
        <Tab label="Item Three" {...a11yProps(2)} />
        <Tab label="Item Four" {...a11yProps(3)} />
        <Tab label="Item Five" {...a11yProps(4)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <AlignItemsList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ListOfMes />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CartList carts={carts} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <MultilineTextFields />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <MaxHeightTextarea />
      </TabPanel>
    </Box>
  );
}

function MultilineTextFields() {
  const [value, setValue] = React.useState("Controlled");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <form noValidate autoComplete="off">
      <TextField
        fullWidth
        id="outlined-multiline-static"
        label="Multiline"
        multiline
        rows="4"
        variant="outlined"
        value={value}
        onChange={handleChange}
      />
    </form>
  );
}

function MaxHeightTextarea() {
  return (
    <TextareaAutosize
      rowsMax={10}
      aria-label="maximum height"
      placeholder="Maximum 4 rows"
      defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua."
    />
  );
}

const r = require.context("../../images", true, /^\.\/.*\.jpg$/);
const images = r.keys().map(r);

function ListOfMes() {
  return (
    <div>
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
            label="HtabI should stop the click event propagation"
          />
        </AccordionSummary>
        <AccordionDetails>
          <Typography color="textSecondary">
            The click event of the nested action
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions2-content"
          id="additional-actions2-header"
        >
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            control={<Checkbox />}
            label="HtabI should stop the focus event propagation"
          />
        </AccordionSummary>
        <AccordionDetails>
          <Typography color="textSecondary">
            The focus event of the nested action will propagate
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions3-content"
          id="additional-actions3-header"
        >
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            control={<Checkbox />}
            label="HtabI should provide an aria-label on each "
          />
        </AccordionSummary>
        <AccordionDetails>
          <Typography color="textSecondary">
            If you forget to put an aria-label on the nested action,
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
function AlignItemsList() {
  return (
    <List>
      <ListItem alignItems="center">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={images[0]} />
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
          secondary={
            <React.Fragment>
              <Typography component="span" variant="body2" color="textPrimary">
                Ali Connors
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src={images[1]} />
        </ListItemAvatar>
        <ListItemText
          primary="Summer BBQ"
          secondary={
            <React.Fragment>
              <Typography component="span" variant="body2" color="textPrimary">
                to Scott, Alex, Jennifer
              </Typography>
              {" — Wish I could come, but I'm out of town this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src={images[2]} />
        </ListItemAvatar>
        <ListItemText
          primary="Oui Oui"
          secondary={
            <React.Fragment>
              <Typography component="span" variant="body2" color="textPrimary">
                Sandra Adams
              </Typography>
              {" — Do you have Paris recommendations? Have you ever…"}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}

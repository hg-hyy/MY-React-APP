import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import img1 from "../../images/chanel/1.jpg";
import img2 from "../../images/chanel/2.jpg";
import img3 from "../../images/chanel/3.jpg";
import img4 from "../../images/chanel/4.jpg";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

function ImgMediaCard(props) {
  const classes = useStyles();
  const { img } = props;
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          image={img}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
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
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`
  };
}

export default function HorizontalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="Item One" icon={<PhoneIcon />} {...a11yProps(0)} />
          <Tab label="Item Two" icon={<FavoriteIcon />} {...a11yProps(1)} />
          <Tab label="Item Three" icon={<PersonPinIcon />} {...a11yProps(2)} />
          <Tab label="Item Three" icon={<PersonPinIcon />} {...a11yProps(3)} />
          <Tab label="Item One" icon={<PhoneIcon />} {...a11yProps(4)} />
          <Tab label="Item Two" icon={<FavoriteIcon />} {...a11yProps(5)} />
          <Tab label="Item Three" icon={<PersonPinIcon />} {...a11yProps(6)} />
          <Tab label="Item Three" icon={<PersonPinIcon />} {...a11yProps(7)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ImgMediaCard img={img1}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ImgMediaCard img={img2}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ImgMediaCard img={img3}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ImgMediaCard img={img4}/>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <ImgMediaCard img={img1}/>
      </TabPanel>
      <TabPanel value={value} index={5}>
        <ImgMediaCard img={img2}/>
      </TabPanel>
      <TabPanel value={value} index={6}>
        <ImgMediaCard img={img3}/>
      </TabPanel>
      <TabPanel value={value} index={7}>
        <ImgMediaCard img={img4}/>
      </TabPanel>
    </div>
  );
}
import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import img2 from "../../images/chanel/2.jpg";
import img3 from "../../images/chanel/3.jpg";
import img4 from "../../images/chanel/4.jpg";

function ImgMediaCard(props) {
  const { img } = props;
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          height="300"
          alt="green iguana"
          component="img"
          image={img}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles
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
      {value === index && <Box p={2}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

export default function HorizontalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "50%", bgcolor: "background.paper" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        // variant="scrollable"
        // scrollButtons="on"
        indicatorColor="primary"
        textColor="primary"
        aria-label="scrollable force tabs"
        centered
      >
        <Tab icon={<PhoneIcon />} {...a11yProps(0)} />
        <Tab icon={<FavoriteIcon />} {...a11yProps(1)} />
        <Tab icon={<PersonPinIcon />} {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ImgMediaCard img={img4} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ImgMediaCard img={img2} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ImgMediaCard img={img3} />
      </TabPanel>
    </Box>
  );
}

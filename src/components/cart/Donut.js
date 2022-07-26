import React from "react";
import ChartistGraph from "react-chartist";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 500,
    width: "100%",
  },
  media: {
    height: 300,
  },
  chartist: {
    padding: theme.spacing(2),
    background: theme.palette.info.dark,
    height: "100%",
    width: "100%",
  },
}));

const c1 = {
  data: {
    series: [
      {
        value: 20,
        name: "Series 1",
        // className: 'my-custom-class-one',
        meta: "Meta One",
      },
      {
        value: 10,
        name: "Series 2",
        // className: 'my-custom-class-two',
        meta: "Meta Two",
      },
      {
        value: 70,
        name: "Series 3",
        // className: 'my-custom-class-three',
        meta: "Meta Three",
      },
    ],
    labels: [1, 2, 3, 4, 5, 6, 7],
  },

  options: {
    donut: true,
    donutWidth: 50,
    donutSolid: true,
    startAngle: 270,
    showLabel: true,
    width: 300,
    height: 300,
    chartPadding: 10,
    labelOffset: 10,
    labelDirection: "explode",
  },

  type: "Pie",
};

function Donut() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      {/* <CardActionArea> */}
      <CardMedia className={classes.media} title="Contemplative Reptile">
        <ChartistGraph {...c1} />
      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Lizard
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      {/* </CardActionArea> */}
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

export default Donut;

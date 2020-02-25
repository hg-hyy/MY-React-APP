import React from "react";
import ChartistGraph from "react-chartist";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  chartist: {
    padding: theme.spacing(2),
    background: theme.palette.info.dark,
    height: "100%"
  }
}));

function Line() {
  const classes = useStyles();
  const c2 = {
    data: {
      labels: ["1", "2", "3", "4", "5", "6"],
      series: [
        {
          data: [1, 2, 3, 5, 8, 13, 20, 30, 56, 89, 100, 120, 150]
        }
      ]
    },
    options: {
      axisX: {
        labelInterpolationFnc: function(value) {
          return "Calendar Week " + value;
        }
      },
      low: 0,
      high: 200, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      scaleMinSpace: 20,
      // Can be set to true or false. If set to true, the scale will be generated with whole numbers only.
      onlyInteger: true,
      // The reference value can be used to make sure that this value will always be on the chart. This is especially useful on bipolar charts where the bipolar center always needs to be part of the chart.
      referenceValue: 5,
      chartPadding: {
        top: 20
      },
      width: 752,
      height: 354
    },
    type: "Line",
    responsiveOptions: [
      [
        "screen and (min-width: 641px) and (max-width: 1024px)",
        {
          showPoint: false,
          axisX: {
            labelInterpolationFnc: function(value) {
              return "Week " + value;
            }
          }
        }
      ],
      [
        "screen and (max-width: 640px)",
        {
          showLine: false,
          axisX: {
            labelInterpolationFnc: function(value) {
              return "W" + value;
            }
          }
        }
      ]
    ]
  };
  return (
    <div className={classes.chartist}>
      <ChartistGraph {...c2} />
    </div>
  );
}

export default Line;

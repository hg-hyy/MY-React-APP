import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Loop from "./viserchart";
import Loop1 from "./bizchart";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

// 全局设置
Highcharts.setOptions({
  global: {
    useUTC: false
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));
// 完整图表
const options1 = {
  title: {
    text: "HighChart"
  },
  subtitle: {
    text: "When resizing the window or the frame, the chart should resize"
  },
  lang: {
    numericSymbols: [" thousands", " millions"]
  },
  data: {
    table: "datatable"
  },
  chart: {
    backgroundColor: {
      linearGradient: [0, 0, 500, 500],
      stops: [
        [0, "rgb(255, 255, 255)"],
        [1, "rgb(200, 200, 255)"]
      ]
    },
    type: "line",
    // type: "column",
    // type: "pie",
    marginTop: 150
  },
  colors: [
    "#7cb5ec",
    "#434348",
    "#90ed7d",
    "#f7a35c",
    "#8085e9",
    "#f15c80",
    "#e4d354",
    "#2b908f",
    "#f45b5b",
    "#91e8e1"
  ],
  xAxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    crosshair: {
      width: 3,
      color: "green"
    },
    lineColor: "#FF0000",
    lineWidth: 1
  },
  credits: {
    text: "hyy.cn",
    href: "http://www.hyy.cn",
    position: {
      align: "right",
      x: 10
    }
  },
  yAxis: {
    title: {
      text: "Units"
    },
    alternateGridColor: "#FDFFD5",
    gridLineColor: "#197F07",
    gridLineDashStyle: "longdash",
    floor: -100,
    ceiling: 300,
    crosshair: { width: 3, color: "green" },
    lineColor: "#FF0000",
    lineWidth: 1
  },
  legend: {
    layout: "vertical",
    backgroundColor: "#FFFFFF",
    floating: true,
    align: "left",
    x: 100,
    verticalAlign: "top",
    y: 70
  },
  tooltip: {
    formatter: function() {
      return "<b>" + this.series.name + "</b><br/>" + this.x + ": " + this.y;
    },
    valueSuffix: "%"
  },
  plotOptions: {
    series: {
      allowPointSelect: true
    },
    pie: {
      shadow: false,
      center: ["50%", "50%"]
    }
  },
  // series: [
  //   {
  //     data: [
  //       29.9,
  //       71.5,
  //       106.4,
  //       129.2,
  //       144.0,
  //       176.0,
  //       135.6,
  //       148.5,
  //       216.4,
  //       194.1,
  //       95.6,
  //       54.4
  //     ],
  //     // type: "pie",
  //     name: "Random data"
  //   }
  // ],
  series: [
    {
      size: "80%",
      innerSize: "60%",
      data: [1, 2, 4, 5, 6, 7, 8]
    },
    {
      size: "60%",
      data: [2, 3, 45, 6, 7, 8, 9, 0, 7]
    }
  ],
  exporting: {
    chartOptions: {
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true
          }
        }
      }
    },
    buttons: {
      contextbutton: {
        enabled: true
      }
    }
  },
  navigation: {
    buttonOptions: {
      height: 40,
      width: 48,
      symbolSize: 24,
      symbolX: 23,
      symbolY: 21,
      symbolStrokeWidth: 2
    }
  },
  loading: {
    hideDuration: 1000,
    showDuration: 1000
  },
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 400
        },
        chartOptions: {
          series: [
            {
              id: "versions",
              dataLabels: {
                enabled: false
              }
            }
          ]
        }
      }
    ]
  }
};

function activeLastPointToolip(chart) {
  var points = chart.series[0].points;
  chart.tooltip.refresh(points[points.length - 1]);
}
// 模拟实时数据
const options3 = {
  chart: {
    type: "spline",
    marginRight: 10,
    events: {
      load: function() {
        let series = this.series[0],
          chart = this;
        alert(series);
        activeLastPointToolip(chart);
        setInterval(function() {
          let x = new Date().getTime(), // 当前时间
            y = Math.random(); // 随机值
          series.addPoint([x, y], true, true);
          activeLastPointToolip(chart);
        }, 5000);
      }
    }
  },
  title: {
    text: "动态模拟实时数据"
  },
  xAxis: {
    type: "datetime",
    tickPixelInterval: 150
  },
  yAxis: {
    title: {
      text: null
    }
  },
  tooltip: {
    formatter: function() {
      return (
        "<b>" +
        this.series.name +
        "</b><br/>" +
        Highcharts.dateFormat("%Y-%m-%d %H:%M:%S", this.x) +
        "<br/>" +
        Highcharts.numberFormat(this.y, 2)
      );
    }
  },
  legend: {
    enabled: false
  },
  series: [
    {
      name: "随机数据",
      data: (() => {
        // 生成随机值
        let data = [],
          time = new Date().getTime();
        for (let i = -19; i <= 0; i += 1) {
          data.push({
            x: time + i * 1000,
            y: Math.random()
          });
        }
        return data;
      })()
    }
  ]
};

function Mychart() {
  const classes = useStyles();
  const [option, setOptions] = useState({});
  useEffect(() => {
    setOptions(options3);
  },[]);
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options1} />
      <HighchartsReact highcharts={Highcharts} options={option} />
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Loop />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Loop1 />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Mychart;

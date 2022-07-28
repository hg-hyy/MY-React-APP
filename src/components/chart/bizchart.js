import React from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coordinate,
  Label,
  Legend,
  Guide,
} from "bizcharts";
import DataSet from "@antv/data-set";

function Loop1() {
  const { DataView } = DataSet;
  const { Html } = Guide;
  const data = [
    {
      item: "事例一",
      count: 40,
    },
    {
      item: "事例二",
      count: 21,
    },
    {
      item: "事例三",
      count: 17,
    },
    {
      item: "事例四",
      count: 13,
    },
    {
      item: "事例五",
      count: 9,
    },
  ];
  const dv = new DataView().source(data).transform({
    type: "percent",
    field: "count",
    dimension: "item",
    as: "percent",
  });
  const cols = {
    percent: {
      formatter: (val) => {
        val = val * 100 + "%";
        return val;
      },
    },
  };
  return (
    <div>
      <Chart
        //   height={window.innerHeight}
        height={400}
        data={dv}
        scale={cols}
        padding={[80, 100, 80, 0]}
        forceFit
        style={{ display: "inline" }}
      >
        <Coordinate type={"theta"} radius={0.75} innerRadius={0.6} />
        <Axis name="percent" />
        <Legend
          position="right"
          // offsetY={-window.innerHeight / 2 + 120}
          offsetY={-30}
          offsetX={-100}
        />
        <Tooltip
          showTitle={false}
          itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
        />
        {/* <Guide>
          <Html
            position={["50%", "50%"]}
            html={() => {
              return '<div style="color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;">主机<br><span style="color:#262626;font-size:2.5em">200</span>台</div>';
            }}
            alignX="middle"
            alignY="middle"
          />
        </Guide> */}
        {/* <Guide>
          <Html
            position={["Action", 150]}
            html={(xScale, yScale) => {
              console.log(yScale);
              return `<div>最大值是${yScale.sold.max}，<br/>最小值是${yScale.sold.min}</div>`; //位置信息
            }}
          />
        </Guide> */}
        <Geom
          type="intervalStack"
          position="percent"
          color="item"
          tooltip={[
            "item*percent",
            (item, percent) => {
              percent = percent * 100 + "%";
              return {
                name: item,
                value: percent,
              };
            },
          ]}
          style={{
            lineWidth: 1,
            stroke: "#fff",
          }}
        >
          <Label
            content="percent"
            formatter={(val, item) => {
              return item.point.item + ": " + val;
            }}
          />
        </Geom>
      </Chart>
    </div>
  );
}

export default Loop1;

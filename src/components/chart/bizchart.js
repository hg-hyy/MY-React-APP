import React from "react";
import { Chart, Geom, Axis, Tooltip, Legend, getTheme } from "bizcharts";
import DataSet from "@antv/data-set";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";

import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const colors = getTheme().colors10;
// 数据源
const data = [
  {
    month: "Jan",
    city: "Tokyo",
    temperature: 7,
  },
  {
    month: "Jan",
    city: "London",
    temperature: 3.9,
  },
  {
    month: "Feb",
    city: "Tokyo",
    temperature: 6.9,
  },
  {
    month: "Feb",
    city: "London",
    temperature: 4.2,
  },
  {
    month: "Mar",
    city: "Tokyo",
    temperature: 9.5,
  },
  {
    month: "Mar",
    city: "London",
    temperature: 5.7,
  },
  {
    month: "Apr",
    city: "Tokyo",
    temperature: 14.5,
  },
  {
    month: "Apr",
    city: "London",
    temperature: 8.5,
  },
  {
    month: "May",
    city: "Tokyo",
    temperature: 18.4,
  },
  {
    month: "May",
    city: "London",
    temperature: 11.9,
  },
  {
    month: "Jun",
    city: "Tokyo",
    temperature: 21.5,
  },
  {
    month: "Jun",
    city: "London",
    temperature: 15.2,
  },
  {
    month: "Jul",
    city: "Tokyo",
    temperature: 25.2,
  },
  {
    month: "Jul",
    city: "London",
    temperature: 17,
  },
  {
    month: "Aug",
    city: "Tokyo",
    temperature: 26.5,
  },
  {
    month: "Aug",
    city: "London",
    temperature: 16.6,
  },
  {
    month: "Sep",
    city: "Tokyo",
    temperature: 23.3,
  },
  {
    month: "Sep",
    city: "London",
    temperature: 14.2,
  },
  {
    month: "Oct",
    city: "Tokyo",
    temperature: 18.3,
  },
  {
    month: "Oct",
    city: "London",
    temperature: 10.3,
  },
  {
    month: "Nov",
    city: "Tokyo",
    temperature: 13.9,
  },
  {
    month: "Nov",
    city: "London",
    temperature: 6.6,
  },
  {
    month: "Dec",
    city: "Tokyo",
    temperature: 9.6,
  },
  {
    month: "Dec",
    city: "London",
    temperature: 4.8,
  },
];

function Loop1() {
  const dv = new DataSet().createView().source(data);
  dv.transform({
    type: "percent",
    field: "count",
    dimension: "item",
    as: "percent",
  });

  const cols = {
    month: {
      range: [0, 1],
    },
  };
  return (
    <Chart
      height={400}
      data={data}
      scale={cols}
      autoFit
      onAxisLabelClick={console.log}
    >
      <Legend
        itemName={{
          style: (item) => {
            return { fill: item.name === "Tokyo" ? colors[0] : colors[1] };
          },
        }}
      />
      <Axis name="month" />
      <Axis
        name="temperature"
        label={{
          formatter: (val) => `${val}°C`,
        }}
      />
      <Tooltip>
        {(title, items) => {
          // 配置了 class="g2-tooltip-list" 则会将模版中的内容渲染进来
          // 您也可以根据 items 自行渲染
          return (
            <Table sx={{ minWidth: 50 }} size="small" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>City</TableCell>
                  <TableCell align="right">Month</TableCell>
                  <TableCell align="right">Temperature</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          );
        }}
      </Tooltip>
      <Geom
        type="point"
        position="month*temperature"
        size={4}
        shape={"circle"}
        color={"city"}
        style={{
          stroke: "#fff",
          lineWidth: 1,
        }}
      />
      <Geom
        type="line"
        position="month*temperature"
        size={2}
        color={"city"}
        shape={"smooth"}
      />
    </Chart>
  );
}

export default Loop1;

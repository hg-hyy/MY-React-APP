import React from "react";
import { Chart, Tooltip, Axis, Legend, Coord, Pie } from 'viser-react';
import DataSet from "@antv/data-set";

const sourceData = [
  { item: '事例一', count: 40 },
  { item: '事例二', count: 21 },
  { item: '事例三', count: 17 },
  { item: '事例四', count: 13 },
  { item: '事例五', count: 9 }
];

const scale = [{
  dataKey: 'percent',
  min: 0,
  formatter: '.0%',
}];

const dv = new DataSet.View().source(sourceData);
dv.transform({
  type: 'percent',
  field: 'count',
  dimension: 'item',
  as: 'percent'
});
const data = dv.rows;

 class Loop extends React.Component {
  render() {
    return (
      <Chart forceFit height={400} data={data} scale={scale}  padding={[80, 100, 80, 0]}>
        <Tooltip showTitle={false} />
        <Axis />
        <Legend dataKey="item" />
        <Coord type="theta" radius={0.75} innerRadius={0.6} />
        <Pie position="percent" color="item" style={{ stroke: '#fff', lineWidth: 1 }}
          label={['percent', {
            formatter: (val, item) => {
              return item.point.item + ': ' + val;
            }
          }]}
        />
      </Chart>
    );
  }
}
export default Loop





// @flow

import React from 'react';
// 引用要使用的圖表元素
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

const styles = {
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

// 這是每個點
const data = [
  {
    name: 'Page A', uv: 400, pv: 2400, amt: 2400, uvError: [75, 20],
  },
  {
    name: 'Page B', uv: 300, pv: 4567, amt: 2400, uvError: [90, 40],
  },
  {
    name: 'Page C', uv: 280, pv: 1398, amt: 2400, uvError: 40,
  },
  {
    name: 'Page D', uv: 200, pv: 9800, amt: 2400, uvError: 20,
  },
  {
    name: 'Page E', uv: 278, pv: null, amt: 2400, uvError: 28,
  },
  {
    name: 'Page F', uv: 189, pv: 4800, amt: 2400, uvError: [90, 20],
  },
  {
    name: 'Page G', uv: 189, pv: 4800, amt: 2400, uvError: [28, 40],
  },
  {
    name: 'Page H', uv: 87, pv: 4800, amt: 2400, uvError: 28,
  },
  {
    name: 'Page I', uv: 189, pv: 4800, amt: 2400, uvError: 28,
  },
  {
    name: 'Page J', uv: 20, pv: 4800, amt: 2400, uvError: [15, 60],
  },
];

function LineChartWrapper() {
  return (
    <div style={styles.wrapper}>
      <LineChart width={225} height={70} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#ccc" />
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}

export default LineChartWrapper;

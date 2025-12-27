// @flow
/** @jsx jsx */

import {
  useMemo,
  useContext,
  useState,
  useEffect,
} from 'react';
import moment from 'moment';
import { jsx } from '@emotion/core';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import { SimulationDataContext } from '../../Constant/context';

const styles = {
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
  },
  header: {
    fontSize: 18,
  },
};

function StockSimulationChart({
  from,
  to,
}: Props) {
  const simulationData = useContext(SimulationDataContext);

  const [dataLength, setDataLength] = useState(0);
  const [lineNames, setLineNames] = useState([]);

  useEffect(() => {
    if (simulationData.length) {
      setDataLength(simulationData[0].funds.length);

      setLineNames(simulationData.map(el => el.id));
    }
  }, [simulationData]);

  const fundsData = useMemo(() => {
    if (!simulationData.length) return [];

    return Array.from(Array(dataLength)).map((n, index) => {
      const lineDatas = lineNames.map(name => ([
        `${name}`, simulationData.find(data => data.id === name).funds[index],
      ]));

      const lineDataObjects = Object.fromEntries(lineDatas);

      return {
        name: moment(from).add((index + 1), 'quarters').format('YYYY-MM'),
        ...lineDataObjects,
      };
    });
  }, [simulationData, dataLength, lineNames, from]);

  const fundsWithProfitData = useMemo(() => {
    if (!simulationData.length) return [];

    return Array.from(Array(dataLength)).map((n, index) => {
      const lineDatas = lineNames.map(name => ([
        `${name}`, simulationData.find(data => data.id === name).fundsWithProfit[index],
      ]));

      const lineDataObjects = Object.fromEntries(lineDatas);

      return {
        name: moment(from).add((index + 1), 'quarters').format('YYYY-MM'),
        ...lineDataObjects,
      };
    });
  }, [simulationData, dataLength, lineNames, from]);

  const lines = useMemo(() => {
    if (!lineNames.length) return null;

    return lineNames.map(el => (
      <Line type="monotone" dataKey={el} stroke="#8884d8" />
    ));
  }, [lineNames]);

  console.log('from', from);

  console.log('fundsData', fundsData);

  console.log('simulationData', simulationData);

  return (
    <div css={styles.wrapper}>
      <h2 style={styles.header}>資金</h2>
      <LineChart width={800} height={300} data={fundsData}>
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip
          labelStyle={{ color: '#000' }}
          contentStyle={{ color: '#000' }} />
        <XAxis dataKey="name" />
        <YAxis />
        {lines}
      </LineChart>
      <h2 style={styles.header}>資本</h2>
      <LineChart width={800} height={300} data={fundsWithProfitData}>
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip
          labelStyle={{ color: '#000' }}
          contentStyle={{ color: '#000' }} />
        <XAxis dataKey="name" />
        <YAxis />
        {lines}
      </LineChart>
    </div>
  );
}

export default StockSimulationChart;

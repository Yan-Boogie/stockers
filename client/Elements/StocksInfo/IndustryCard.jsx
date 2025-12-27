// @flow
/** @jsx jsx */

import { useMemo } from 'react';
import { jsx, css } from '@emotion/core';
import { Link, useParams } from 'react-router-dom';
import { flex } from '../../Constant/emotion';
import IndustryCardChart from './Form/IndustryCardChart';

const styles = {
  wrapper: css`
    width: 225px;
    height: 225px;
    border-radius: 40px;
    background-color: ${Colors.LAYER_FIRST};
    margin: 0 10px 20px 10px;
    text-decoration: none;
  `,
  main: css`
    ${flex}
  `,
  word: css`
    ${flex}
    flex-grow: 1;
    align-items: flex-start;
    padding: 0 0 0 40px;
  `,
  chart: css`
    ${flex}
    flex-grow: 1;
  `,
  title: css`
    font-size: 13px;
    color: #FFFFFF;
    margin: 0 0 18px;
  `,
  badPercent: css`
    font-size: 13px;
    color: ${Colors.BULL_MARKET};
  `,
  goodPercent: css`
    font-size: 13px;
    color: ${Colors.BEAR_MARKET};
  `,
};
type Props = {
  name: string,
  industryId: number,
  companies: Array,
};

function IndustryCard({
  name,
  industryId,
  companies,
}: Props) {
  const average = useMemo(() => {
    if (!companies) return null;
    const gain = companies?.map(company => company.gain_diff.map(c => c.gain));

    const eachAverages = gain.map((g) => {
      const sum = g.reduce((prev, cur) => cur + prev);
      const ave = sum / g.length;

      return ave * 100;
    });

    const sum = eachAverages.reduce((prev, cur) => cur + prev);

    const ave = sum / eachAverages.length;

    return ave.toFixed(2);
  }, [companies]);

  const percentStyle = useMemo(() => {
    if (average < 0) return styles.goodPercent;

    return styles.badPercent;
  }, [average]);

  const chartData = useMemo(() => {
    if (!companies) return null;

    const gain = companies?.map(company => company.gain_diff.map(c => c.gain));

    const firstMon = (gain.map(g => g[0]).reduce((prev, cur) => cur + prev)) / gain.length;
    const secondMon = (gain.map(g => g[1]).reduce((prev, cur) => cur + prev)) / gain.length;
    const thirdMon = (gain.map(g => g[2]).reduce((prev, cur) => cur + prev)) / gain.length;

    return [{
      name: 'firstMon',
      percent: (firstMon + 1) * 10000,
    }, {
      name: 'secondMon',
      percent: (secondMon + 1) * 10000,
    }, {
      name: 'thirdMon',
      percent: (thirdMon + 1) * 10000,
    }];
  }, [companies]);

  return (
    <Link css={styles.wrapper} to={`/industry/${industryId}`}>
      <div css={styles.main}>
        <div css={styles.word}>
          <span css={styles.title}>
            {name}
          </span>
          <span css={percentStyle}>
            {average}
            %
            &nbsp;
            (近三個月來漲幅)
          </span>
        </div>
        <div css={styles.chart}>
          <IndustryCardChart
            average={average}
            data={chartData} />
        </div>
      </div>
    </Link>
  );
}

export default IndustryCard;

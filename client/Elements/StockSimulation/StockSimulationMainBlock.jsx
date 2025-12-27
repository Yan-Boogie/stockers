// @flow
/** @jsx jsx */

import { jsx } from '@emotion/core';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { FORM_STOCK_SIMULATION } from '../../Constant/form';
import StockSimulationChart from './StockSimulationChart';

const selector = formValueSelector(FORM_STOCK_SIMULATION);

const styles = {
  wrapper: {
    backgroundColor: Colors.LAYER_FIRST,
    width: '100%',
    height: 600,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    padding: 40,
  },
  block: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  btn: {
    width: 70,
    height: 32,
    fontSize: 13,
    lineHeight: '32px',
    color: '#FFF',
    backgroundColor: Colors.LAYER_SECOND,
    margin: '20px 0',
  },
  investBlock: {
    fontSize: 19,
    backgroundColor: Colors.LAYER_SECOND,
    width: 205,
    padding: '0 24px',
    height: 64,
    lineHeight: '64px',
  },
  revenuBlock: {
    fontSize: 19,
    padding: '0 24px',
    height: 64,
    lineHeight: '64px',
  },
};

function StockSimulationMainBlock({
  from,
  to,
  principle,
}: Props) {
  return (
    <div css={styles.wrapper}>
      <h4>用迴歸分析測試績效</h4>
      <StockSimulationChart from={from} to={to} />
      {/* <div css={styles.block}>
        <button
          css={styles.btn}
          type="button"
          onClick={() => console.log("click")}>
          2018
        </button>
        <button
          css={styles.btn}
          type="button"
          onClick={() => console.log('click2')}>
          2019
        </button>
      </div> */}
      <div css={styles.block}>
        <div css={styles.investBlock}>{`投入金額：${principle}`}</div>
        <div css={styles.revenuBlock}>結餘金額 $350.000</div>
      </div>
    </div>
  );
}

const reduxHook = connect(
  state => ({
    from: selector(state, 'from'),
    to: selector(state, 'to'),
    principle: selector(state, 'principle') || 0,
  })
);

export default reduxHook(StockSimulationMainBlock);

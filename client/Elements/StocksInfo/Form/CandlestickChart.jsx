// @flow
/** @jsx jsx */

import { jsx, css } from '@emotion/core';

const styles = {
  wrapper: css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${Colors.LAYER_FIRST}
  `,
};

function CandlestickChart() {
  return (
    <div css={styles.wrapper}>
      <span>
        台股大盤表現
      </span>
      <div>
        K線圖
      </div>
    </div>
  );
}

export default CandlestickChart;

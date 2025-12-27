// @flow
/** @jsx jsx */

import { jsx, css } from '@emotion/core';

const styles = {
  btn: css`
    width: 320px;
    height: 32px;
    padding: 0;
    line-height: 32px;
    text-align: left;
    font-size: 13px;
    transition: 0.3s;
    margin: 0 30px 10px 0;
    &:hover {
      background-color: ${Colors.LAYER_THIRD};
    }
  `,
  btnUsing: {
    position: 'relative',
    width: 320,
    height: 32,
    padding: 0,
    lineHeight: '32px',
    textAlign: 'left',
    fontSize: 13,
    margin: '0 30px 10px 0',
    backgroundColor: Colors.LAYER_THIRD,
  },
  index: {
    position: 'absolute',
    width: 16,
    height: 16,
    color: '#FFF',
    backgroundColor: Colors.PRIMARY,
    lineHeight: '16px',
    textAlign: 'center',
    top: -8,
    right: -8,
    borderRadius: 50,
  },
};

type Props = {
  name: string,
  usingIndex: number,
  addChip: Function,
  removeChip: Function,
}

function ChipHeaderUpdateBlockButton({
  name,
  usingIndex,
  addChip,
  removeChip,
}: Props) {
  if (~usingIndex) {
    return (
      <button
        onClick={() => removeChip(usingIndex)}
        css={styles.btnUsing}
        type="button">
        {name}
        <div style={styles.index}>
          {usingIndex + 1}
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={() => addChip(name)}
      css={styles.btn}
      type="button">
      {name}
    </button>
  );
}

export default ChipHeaderUpdateBlockButton;

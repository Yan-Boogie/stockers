// @flow
/** @jsx jsx */

import { useMemo } from 'react';
import { jsx } from '@emotion/core';

const styles = {
  wrapper: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
  },
  btnWrapper: {
    padding: '0 7px 0 0',
  },
  button: {
    width: 16,
    height: 16,
    margin: 0,
    flexShrink: 0,
    backgroundColor: '#F4F3F3',
    border: '1px solid #C1C1C1',
    borderRadius: 1,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    width: 14,
    height: 14,
    backgroundColor: '#1062b1',
    position: 'absolute',
    top: 1,
    left: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    width: '100%',
    height: 16,
    lineHeight: '16px',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#000',
    textAlign: 'left',
  },
  errorStr: {
    fontSize: 14,
    color: '#F44336',
    position: 'absolute',
    letterSpacing: 1,
    textAlign: 'left',
    top: 25,
    whiteSpace: 'nowrap',
  },
};

function Checkbox({
  title,
  input: {
    value,
    onChange,
  },
  meta,
}: {
  title?: string,
  input: {
    value: boolean,
    onChange: Function,
  }
} & FieldProps) {
  const {
    error,
  } = meta || {};

  const titleTag = useMemo(() => (
    title ? (
      <span style={styles.title}>
        {title}
      </span>
    ) : null
  ), [title]);

  const errorTag = useMemo(() => {
    if (!error) return null;

    return (
      <div style={styles.errorStr}>
        {error}
      </div>
    );
  }, [error]);

  return (
    <div css={styles.wrapper}>
      <div css={styles.btnWrapper}>
        <button
          type="button"
          aria-label="select"
          value={value}
          onClick={() => onChange(!value)}
          style={{
            ...styles.button,
            ...(value ? styles.checked : {}),
          }}>
          {value ? (
            <span css={styles.checked}>
              <svg width="9" height="9">
                <line
                  x1="9"
                  y1="0"
                  x2="3"
                  y2="8"
                  stroke="#000"
                  strokeWidth="2" />
                <line
                  x1="0"
                  y1="4"
                  x2="3"
                  y2="7"
                  stroke="#000"
                  strokeWidth="2" />
              </svg>
            </span>
          ) : null}
        </button>
      </div>
      {titleTag}
      {errorTag}
    </div>
  );
}

Checkbox.defaultProps = {
  title: null,
};

export default Checkbox;

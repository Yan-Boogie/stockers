// @flow

import React from 'react';

const styles = {
  wrapper: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    padding: '8px 0',
  },
  btnWrapper: {
    padding: '0 8px 0 0',
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
};

function RadioButtonItem({
  onClick,
  checked,
  label,
}: {
  onClick: Function,
  checked: boolean,
  label: string,
  }) {
  return (
    <div
      style={styles.wrapper}>
      <div style={styles.btnWrapper}>
        <button
          aria-label="select"
          type="button"
          onClick={() => onClick()}
          style={{
            ...styles.button,
            ...(checked ? styles.checked : {}),
          }} />
      </div>
      <span style={styles.title}>
        {label}
      </span>
    </div>
  );
}

export default RadioButtonItem;

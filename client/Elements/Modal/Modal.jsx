// @flow
/** @jsx jsx */

import { jsx } from '@emotion/core';
import { useMemo } from 'react';
import {
  MODAL_INDEX,
  FLOAT_TEXT_INDEX,
  FLOAT_TEXT_ANCHOR_INDEX,
} from '../../Constant/zIndex';

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: MODAL_INDEX,
    backgroundSize: '60px 60px',
    backgroundPosition: 'center',
    backgroundColor: 'rgba(140, 140, 140, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px 0',
  },
  modal: {
    maxHeight: 'calc(100vh - 30px)',
    padding: '50px',
    borderRadius: 2,
    boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.54)',
    position: 'relative',
    overflowY: 'auto',
    overflowX: 'hidden',
    backgroundColor: Colors.LAYER_SECOND,
  },
  closeBtn: {
    width: 24,
    height: 24,
    display: 'block',
    backgroundSize: 24,
    backgroundColor: 'transparent',
    zIndex: FLOAT_TEXT_ANCHOR_INDEX,
    position: 'relative',
  },
  closeBtnOuter: {
    right: -30,
    top: 2,
  },
  closeBtnWrapper: {
    position: 'absolute',
    right: 6,
    top: 6,
    width: 24,
    height: 24,
  },
  fakeBtn: {
    position: 'absolute',
    width: 40,
    height: 40,
    left: -8,
    top: -8,
    cursor: 'default',
    zIndex: FLOAT_TEXT_INDEX,
  },
};

function Modal({
  children,
  onClose,
}: {
  children: Node,
  onClose?: ?Function,
}) {
  const closeBtn = useMemo(() => {
    if (typeof onClose !== 'function') return null;

    return (
      <div css={styles.closeBtnWrapper}>
        <button
          aria-label="close"
          onTouchStart={onClose}
          type="button"
          css={styles.fakeBtn} />
        <button
          aria-label="close"
          onTouchStart={onClose}
          onClick={onClose}
          css={styles.closeBtn}
          type="button">
          <svg width="24" height="24">
            <path
              d="M4 4L20 20M20 4L4 20"
              fill="transparent"
              strokeWidth="2"
              stroke="#FFF" />
          </svg>
        </button>
      </div>
    );
  }, [onClose]);

  return (
    <div css={[
      styles.container,
    ]}>
      <div css={[
        styles.modal,
      ]}>
        {children}
        {closeBtn}
      </div>
    </div>
  );
}

Modal.defaultProps = {
  onClose: null,
};

export default Modal;

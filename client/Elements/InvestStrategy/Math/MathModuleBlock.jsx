// @flow

import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
} from 'react';
import MathInput from './MathInput';
import {
  investStrategySharedEmitter,
  START_EDITTING,
  END_EDITTING,
  INIT_MODULE,
} from '../../../Constant/investStrategy';

const styles = {
  wrapper: {
    width: '100%',
    flexBasis: 100,
    backgroundColor: Colors.PRIMARY_THIRD,
    borderRadius: 40,
    padding: '0 0 0 40px',
    margin: '20px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    fontSize: 14,
    color: Colors.PRIMARY,
    margin: '0 22px 0 0',
    flexShrink: 0,
    position: 'relative',
  },
  mathInputBlock: {
    flexGrow: 1,
    height: '100%',
  },
  btnWrapper: {
    height: '100%',
    width: 106,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 40,
    transition: '0.3s',
    backgroundColor: Colors.PRIMARY_SECOND,
  },
  btn: {
    flexBasis: 106,
    height: '100%',
    borderRadius: 40,
    fontSize: 13,
    lineHeight: '100px',
    textAlign: 'center',
  },
  btnWrapperActived: {
    width: 212,
  },
  hintModalBtn: {
    width: 0,
    height: 0,
    opacity: 0,
    textAlign: 'center',
    lineHeight: '16px',
    backgroundColor: Colors.LAYER_THIRD,
    position: 'absolute',
    right: 14,
    bottom: 2,
    borderRadius: 50,
    fontWeight: 500,
  },
  hintModalBtnActived: {
    width: 16,
    height: 16,
    opacity: 1,
  },
  hintModal: {
    padding: 16,
    opacity: 0,
    width: 0,
    display: 'flex',
    flexDirection: 'flex-start',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 12px',
    backgroundColor: Colors.PRIMARY,
    margin: '8px 0 0 0',
    borderRadius: 8,
  },
  hintModalActived: {
    width: 252,
    opacity: 1,
    transition: 'opacity 0.2s ease-out',
  },
  hint: {
    fontSize: 12,
    letterSpacing: 2,
  },
};

function MathModuleBlock() {
  const [isMathModuleEditting, setMathModuleEditting] = useState(false);
  const [isHintModalActived, setHintModalActived] = useState(false);

  useEffect(() => {
    function startEditHandler() {
      setMathModuleEditting(true);

      setHintModalActived(true);
    }

    function endEditHandler() {
      setMathModuleEditting(false);

      setHintModalActived(false);
    }

    investStrategySharedEmitter.on(START_EDITTING, startEditHandler);
    investStrategySharedEmitter.on(END_EDITTING, endEditHandler);
    investStrategySharedEmitter.on(INIT_MODULE, endEditHandler);

    return () => {
      investStrategySharedEmitter.removeListener(START_EDITTING, startEditHandler);
      investStrategySharedEmitter.removeListener(END_EDITTING, endEditHandler);
      investStrategySharedEmitter.removeListener(INIT_MODULE, endEditHandler);
    };
  }, []);

  const mathModuleHandlerOnClick = useCallback(() => {
    if (!isMathModuleEditting) {
      investStrategySharedEmitter.emit(START_EDITTING);

      document.querySelector('.math-module-handler').style.setProperty('width', '212px');
    } else {
      investStrategySharedEmitter.emit(END_EDITTING);

      document.querySelector('.math-module-handler').style.setProperty('width', '106px');
    }
  }, [isMathModuleEditting]);

  const initMathModuleOnClick = useCallback(() => {
    investStrategySharedEmitter.emit(INIT_MODULE);

    document.querySelector('.math-module-handler').style.setProperty('width', '106px');
  }, []);

  const hintModalBtnStyles = useMemo(() => ({
    ...styles.hintModalBtn,
    ...(isMathModuleEditting ? styles.hintModalBtnActived : {}),
    ...(isHintModalActived ? { backgroundColor: Colors.PRIMARY } : {}),
  }), [isHintModalActived, isMathModuleEditting]);

  const hintModalStyles = useMemo(() => ({
    ...styles.hintModal,
    ...(isHintModalActived && isMathModuleEditting ? styles.hintModalActived : {}),
  }), [isHintModalActived, isMathModuleEditting]);

  const mathModuleHandlerBtn = useMemo(() => {
    if (isMathModuleEditting) {
      return '編輯完成';
    }

    return '編輯數學模型';
  }, [isMathModuleEditting]);

  const cancelBtn = useMemo(() => {
    if (!isMathModuleEditting) return null;

    return (
      <button
        style={styles.btn}
        onClick={initMathModuleOnClick}
        type="button">
        取消編輯
      </button>
    );
  }, [isMathModuleEditting, initMathModuleOnClick]);

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.header}>
        數學模型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;：
        <button
          style={hintModalBtnStyles}
          onClick={() => setHintModalActived(!isHintModalActived)}
          type="button">
          !
          <div style={hintModalStyles}>
            <span style={styles.hint}>點擊Module Grid以獲取資料內容</span>
          </div>
        </button>
      </h2>
      <div style={styles.mathInputBlock}>
        <MathInput />
      </div>
      <div
        className="math-module-handler"
        style={styles.btnWrapper}>
        {cancelBtn}
        <button
          onClick={mathModuleHandlerOnClick}
          style={styles.btn}
          type="button">
          {mathModuleHandlerBtn}
        </button>
      </div>
    </div>
  );
}

export default MathModuleBlock;

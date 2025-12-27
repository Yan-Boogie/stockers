// @flow

import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import { useParams } from 'react-router-dom';
import Editor from '../ArtiboxEditor/Editor';
import {
  investStrategySharedEmitter,
  CLICK_EVENT,
  START_EDITTING,
  END_EDITTING,
  INIT_MODULE,
  EDITTER_GET_GRID,
} from '../../Constant/investStrategy';
import { FIXED_BUTTON_INDEX, BASE_CONTAINER_INDEX } from '../../Constant/zIndex';
import Modal from '../Modal/Modal';
import { useGlobalMessage } from '../../helper/useGlobalMessage';

const styles = {
  wrapper: {
    width: 80,
    height: 80,
    position: 'fixed',
    right: 30,
    bottom: 30,
  },
  btn: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: FIXED_BUTTON_INDEX,
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
    padding: 0,
    lineHeight: '80px',
    textAlign: 'center',
    color: '#000',
    fontWeight: 500,
    borderRadius: 50,
  },
  formBlock: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: BASE_CONTAINER_INDEX,
    width: 0,
    height: 0,
    borderRadius: 40,
    backgroundColor: Colors.LAYER_THIRD,
    opacity: 0,
  },
  formBlockActived: {
    width: 284,
    height: 456,
    opacity: 1,
  },
  modalWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: 228,
    height: 216,
    position: 'relative',
  },
  header: {
    fontSize: 22,
    letterSpacing: 2,
    color: Colors.PRIMARY,
    margin: '0 0 16px 0',
  },
  p: {
    fontSize: 14,
    margin: 0,
  },
  btnWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  cancelBtn: {
    width: 72,
    height: 40,
    borderRadius: 4,
    lineHeight: '32px',
    textAlign: 'center',
    backgroundColor: Colors.ERROR,
    fontSize: 14,
    margin: '0 8px',
  },
  acceptBtn: {
    width: 72,
    height: 40,
    borderRadius: 4,
    lineHeight: '32px',
    textAlign: 'center',
    backgroundColor: Colors.PRIMARY,
    fontSize: 14,
    margin: '0 8px',
  },
};

async function submit(data, setFormOpened, moduleId, showMessage, updateCommentInitData) {
  const localState = {
    token: localStorage.getItem('token'),
  };

  const resStatus = await fetch(`${API_HOST}/modules/updateCommentInfo`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: localState.token,
    },
    body: JSON.stringify({
      moduleId,
      commentInfo: data,
    }),
  }).then(res => res.status);

  if (resStatus === 200) {
    showMessage('儲存成功');

    updateCommentInitData(data);
  }

  setFormOpened(false);
}

function CommentBlock({
  updateCommentInitData,
}: {
  updateCommentInitData: Function,
}) {
  const [isFormOpened, setFormOpened] = useState(false);
  const [gridInfoForEmitTrigger, setGridInfoForEmitTrigger] = useState({});
  const [isMathModuleEditting, setMathModuleEditting] = useState(false);
  const [isConfirmedModalOpened, setConfirmedModalOpened] = useState(false);

  const showMessage = useGlobalMessage();

  const { moduleId } = useParams();

  useEffect(() => {
    function mathStartEditHandler() {
      setMathModuleEditting(true);
    }

    function mathEndEditHandler() {
      setMathModuleEditting(false);
    }

    investStrategySharedEmitter.on(START_EDITTING, mathStartEditHandler);
    investStrategySharedEmitter.on(END_EDITTING, mathEndEditHandler);
    investStrategySharedEmitter.on(INIT_MODULE, mathEndEditHandler);

    return () => {
      investStrategySharedEmitter.removeListener(START_EDITTING, mathStartEditHandler);
      investStrategySharedEmitter.removeListener(END_EDITTING, mathEndEditHandler);
      investStrategySharedEmitter.removeListener(INIT_MODULE, mathEndEditHandler);
    };
  }, []);

  useEffect(() => {
    if (isMathModuleEditting) return () => {};

    function clickHandler(gridInfo) {
      setFormOpened(true);

      setGridInfoForEmitTrigger(gridInfo);
    }

    investStrategySharedEmitter.on(CLICK_EVENT, clickHandler);

    return () => {
      investStrategySharedEmitter.removeListener(CLICK_EVENT, clickHandler);
    };
  }, [isMathModuleEditting]);

  useEffect(() => {
    investStrategySharedEmitter.emit(EDITTER_GET_GRID, gridInfoForEmitTrigger);
  }, [gridInfoForEmitTrigger]);

  const onClick = useCallback(() => {
    if (!isFormOpened) {
      setFormOpened(true);
    } else {
      setConfirmedModalOpened(true);
    }
  }, [isFormOpened]);

  const editor = useMemo(() => {
    if (!isFormOpened) return null;

    return (
      <Editor
        submitAction={data => submit(data,
          setFormOpened, moduleId, showMessage, updateCommentInitData)} />
    );
  }, [isFormOpened, moduleId, showMessage, updateCommentInitData]);

  const confirmedModal = useMemo(() => {
    if (!isConfirmedModalOpened) return null;

    return (
      <Modal>
        <div style={styles.modalWrapper}>
          <h2 style={styles.header}>確認是否關閉</h2>
          <p style={styles.p}>關閉模組將遺失修改內容，請儲存後再關閉</p>
          <div style={styles.btnWrapper}>
            <button
              style={styles.cancelBtn}
              onClick={() => setConfirmedModalOpened(false)}
              type="button">
              取消
            </button>
            <button
              style={styles.acceptBtn}
              onClick={() => {
                setConfirmedModalOpened(false);
                setFormOpened(false);
              }}
              type="button">
              關閉
            </button>
          </div>
        </div>
      </Modal>
    );
  }, [isConfirmedModalOpened]);

  const formBlockStyles = useMemo(() => ({
    ...styles.formBlock,
    ...(isFormOpened ? styles.formBlockActived : {}),
  }), [isFormOpened]);

  return (
    <div style={styles.wrapper}>
      <button
        onClick={onClick}
        style={styles.btn}
        type="button">
        筆記欄
      </button>
      <div style={formBlockStyles}>
        {editor}
      </div>
      {confirmedModal}
    </div>
  );
}

export default CommentBlock;

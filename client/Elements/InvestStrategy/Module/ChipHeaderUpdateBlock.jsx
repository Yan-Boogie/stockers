// @flow
/** @jsx jsx */

import { jsx } from '@emotion/core';
import {
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react';
import EventEmitter from 'events';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import Modal from '../../Modal/Modal';
import { ModuleDataContext } from '../../../Constant/context';
import ChipHeaderUpdateBlockButton from './ChipHeaderUpdateBlockButton';
import { useGlobalMessage, useGlobalErrorMessage } from '../../../helper/useGlobalMessage';

const styles = {
  wrapper: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    maxHeight: 'calc(100vh - 130px)',
    overflow: 'auto',
    backgroundColor: Colors.LAYER_SECOND,
  },
  columnBoard: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 19,
    fontWeight: 500,
  },
  submitBtn: {
    position: 'fixed',
    right: 32,
    bottom: 40,
    width: 96,
    height: 48,
    borderRadius: 8,
    textAlign: 'center',
    backgroundColor: Colors.PRIMARY,
    color: '#FFF',
  },
};

type Props = {
  isOpen: boolean,
  setOpen: Function,
  stockData: {},
}

export const sharedEmitter = new EventEmitter();

sharedEmitter.setMaxListeners(100);

export const UPDATE_MODULE_HEADER = 'E/UPDATE_MODULE_HEADER';

async function submit(chipsData, moduleId, showMessage, setOpen, showErrorMessage) {
  if (!chipsData.length) {
    showErrorMessage('請至少勾選一個');

    return;
  }

  const userToken = localStorage.getItem('token');

  const resData = await fetch(`${API_HOST}/modules/updateModuleHeaderChips`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: userToken,
    },
    body: JSON.stringify({
      moduleId,
      headerChips: chipsData.map((chip, index) => ({
        moduleId,
        headerName: chip.name,
        parentName: chip.parentName,
        columnId: index,
      })),
    }),
  }).then(res => res.json());

  if (resData) {
    showMessage('儲存成功');

    sharedEmitter.emit(UPDATE_MODULE_HEADER, resData);

    setOpen(false);
  }
}

function ChipHeaderUpdateBlock({
  isOpen,
  setOpen,
  stockData,
}: Props) {
  const moduleData = useContext(ModuleDataContext);

  const { moduleId } = useParams();

  const [usingHeaderChips, setUsingHeaderChips] = useState([]);

  const showMessage = useGlobalMessage();
  const showErrorMessage = useGlobalErrorMessage();

  useEffect(() => {
    const initHeaderChips = moduleData.map(el => ({
      name: el.name,
      parentName: el.parentName,
    }));

    setUsingHeaderChips(initHeaderChips);
  }, [moduleData]);

  const headerChips = useMemo(() => {
    const headerData = Object.values(stockData).reduce((accum, el, index) => {
      if (!el.name) return accum;

      return [
        ...accum,
        {
          name: el.name,
          id: index,
          childNodes: el.chipInfos.slice(0, 30).map((chip, chipIndex) => ({
            id: chipIndex,
            name: chip.chipName,
          })),
        },
      ];
    }, []);

    return headerData;
  }, [stockData]);

  const onClose = useCallback(() => {
    if (setOpen) {
      setOpen(false);
    }
  }, [setOpen]);

  const addChips = useCallback((data, name) => {
    setUsingHeaderChips([
      ...usingHeaderChips,
      {
        name: data,
        parentName: name,
      },
    ]);
  }, [usingHeaderChips]);

  const removeChip = useCallback((removeIndex) => {
    setUsingHeaderChips([
      ...usingHeaderChips.slice(0, removeIndex),
      ...usingHeaderChips.slice(removeIndex + 1),
    ]);
  }, [usingHeaderChips]);

  const mainBlock = useMemo(() => {
    if (!headerChips.length) return null;

    return (
      <div css={styles.wrapper}>
        {headerChips.map(({ name, childNodes, id }) => (
          <div key={id} css={styles.columnBoard}>
            <h2 css={styles.title}>{name}</h2>
            {childNodes.map(childNode => (
              <ChipHeaderUpdateBlockButton
                usingIndex={usingHeaderChips.findIndex(chip => chip.name === childNode.name)}
                addChip={data => addChips(data, name)}
                removeChip={removeIndex => removeChip(removeIndex)}
                key={childNode.id}
                name={childNode.name} />
            ))}
          </div>
        ))}
        <button
          style={styles.submitBtn}
          onClick={() => submit(usingHeaderChips, moduleId, showMessage, setOpen, showErrorMessage)}
          type="button">
          儲存變更
        </button>
      </div>
    );
  }, [headerChips, usingHeaderChips, addChips, removeChip, moduleId, setOpen, showMessage, showErrorMessage]);

  if (!isOpen) return null;

  return (
    <Modal onClose={onClose}>
      {mainBlock}
    </Modal>
  );
}

const reduxHook = connect(
  state => ({
    stockData: state.Stocks.stockData,
  }),
);

export default reduxHook(ChipHeaderUpdateBlock);

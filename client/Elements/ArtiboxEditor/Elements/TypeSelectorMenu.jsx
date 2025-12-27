// @flow

import React, {
  useMemo,
  useCallback,
  useContext,
} from 'react';
import Icons from '../../../Constant/ArtiboxEditor/icons';
import { BLOCK_TYPES } from '../../../Constant/ArtiboxEditor/types';
import { Dispatch as DispatchContext } from '../../../Constant/ArtiboxEditor/context';
import Actions from '../../../Constant/ArtiboxEditor/actions';

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
    flexGrow: 1,
    backgroundColor: 'transparent',
    padding: '0 80px 0 10px',
  },
  btn: {
    height: 30,
    width: 30,
    margin: '0 9px',
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnFocused: {
    backgroundColor: Colors.PRIMARY,
  },
};

type Props = {
  curFocusId: string,
  curFocusType: symbol,
};

function TypeSelectorMenu({
  curFocusId,
  curFocusType,
}: Props) {
  const dispatch = useContext(DispatchContext);

  const onClick = useCallback((type) => {
    dispatch({
      type: Actions.CHANGE_TYPE,
      id: curFocusId,
      newType: type,
    });
  }, [dispatch, curFocusId]);

  const wrapperStyles = useMemo(() => ({
    ...styles.wrapper,
    ...(curFocusId ? {} : { opacity: 0.4 }),
  }), [curFocusId]);

  return (
    <div style={wrapperStyles}>
      <button
        style={{
          ...styles.btn,
          ...(curFocusType === BLOCK_TYPES.TITLE ? styles.btnFocused : {}),
        }}
        onClick={() => onClick(BLOCK_TYPES.TITLE)}
        className="Artibox-type-selector-btn"
        type="button">
        <Icons.TITLE />
      </button>
      <button
        style={{
          ...styles.btn,
          ...(curFocusType === BLOCK_TYPES.SUBTITLE ? styles.btnFocused : {}),
        }}
        onClick={() => onClick(BLOCK_TYPES.SUBTITLE)}
        className="Artibox-type-selector-btn"
        type="button">
        <Icons.SUBTITLE />
      </button>
      <button
        style={{
          ...styles.btn,
          ...(curFocusType === BLOCK_TYPES.LINE ? styles.btnFocused : {}),
        }}
        onClick={() => onClick(BLOCK_TYPES.LINE)}
        className="Artibox-type-selector-btn"
        type="button">
        <Icons.LINE />
      </button>
      <button
        style={{
          ...styles.btn,
          ...(curFocusType === BLOCK_TYPES.GRID ? styles.btnFocused : {}),
        }}
        onClick={() => onClick(BLOCK_TYPES.GRID)}
        className="Artibox-type-selector-btn"
        type="button">
        <Icons.GRID />
      </button>
    </div>
  );
}

export default TypeSelectorMenu;

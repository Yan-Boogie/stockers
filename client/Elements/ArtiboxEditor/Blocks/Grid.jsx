// @flow
/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import {
  Fragment,
  useMemo,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import Actions from '../../../Constant/ArtiboxEditor/actions';
import { Dispatch as DispatchContext } from '../../../Constant/ArtiboxEditor/context';

const BASIC_HEIGHT = 30;

const styles = {
  wrapper: {
    width: '100%',
    borderLeft: '2px solid transparent',
    padding: '0 12px',
    height: BASIC_HEIGHT,
    position: 'relative',
    outline: 'none',
  },
  invisibleTxtButton: {
    width: '100%',
    height: '100%',
    fontSize: 0,
    padding: 0,
  },
  focusWrapper: {
    width: '100%',
    borderLeft: `2px solid ${Colors.PRIMARY}`,
    padding: '0 12px',
    height: BASIC_HEIGHT,
    position: 'relative',
    outline: 'none',
  },
  placeholderTxt: {
    fontSize: 16,
    letterSpacing: 2,
    fontWeight: 100,
  },
  btn: css`
    font-size: 12px;
    letter-spacing: 1px;
    color: #FFF;
    padding: 4px 8px;
    border-radius: 4px;
    background-color: ${Colors.LAYER_SECOND};
    margin: 0 4px 4px 0;
    &:hover {
      background-color: ${Colors.PRIMARY};
    }
  `,
};

type Props = {
  focus: boolean,
  meta: Object,
  id: string,
  firstLoaded: boolean,
}

function Grid({
  focus,
  meta,
  id,
  firstLoaded,
}: Props) {
  const wrapperRef = useRef();

  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    dispatch({
      type: Actions.LOADED,
      id,
    });
  }, [dispatch, firstLoaded, id]);

  useEffect(() => {
    if (wrapperRef) {
      const { current } = wrapperRef;

      current.style.setProperty('height', `${BASIC_HEIGHT}px`);

      const newHeight = `${current.scrollHeight}px`;

      current.style.setProperty('height', newHeight);
    }
  }, [meta]);

  const onFocusHandler = useCallback(() => {
    dispatch({
      type: Actions.FOCUS,
      id,
    });
  }, [dispatch, id]);

  const removeGrid = useCallback((gridIndex) => {
    dispatch({
      type: Actions.REMOVE_GRID_INFO,
      id,
      gridIndex,
    });
  }, [dispatch, id]);

  const getGridButtonContent = useCallback((grid) => {
    if (grid.rowId === 'header') {
      return `${grid.name}-h`;
    }

    return `${grid.name}-${grid.rowId + 1}`;
  }, []);

  const gridButtons = useMemo(() => {
    if (!meta.GRIDS || !meta.GRIDS.length) return null;

    const buttonList = [];

    const {
      GRIDS: grids,
    } = meta;

    grids.forEach((grid, index) => {
      buttonList.push(
        <button
          key={`${grid}_${index}`}
          css={styles.btn}
          onClick={() => removeGrid(index)}
          type="button">
          {getGridButtonContent(grid)}
        </button>
      );
    });

    return (
      <Fragment>
        {buttonList}
      </Fragment>
    );
  }, [meta, removeGrid]);

  const placeholderZone = useMemo(() => {
    const { GRIDS: grids } = meta;

    if (grids && grids.length) return null;

    return (
      <span style={styles.placeholderTxt}>點選欄位填入欄位資訊</span>
    );
  }, [meta]);

  const wrapperStyles = useMemo(() => ({
    ...(focus ? styles.focusWrapper : styles.wrapper),
  }), [focus]);

  return (
    <div
      ref={wrapperRef}
      tabIndex="0"
      onMouseDown={onFocusHandler}
      role="button"
      style={wrapperStyles}>
      {gridButtons}
      {placeholderZone}
    </div>
  );
}

export default Grid;

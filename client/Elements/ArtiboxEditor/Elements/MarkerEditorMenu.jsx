// @flow

import React, {
  useEffect,
  useState,
  useCallback,
  useContext,
} from 'react';
import Icons from '../../../Constant/ArtiboxEditor/icons';
import { MARKER_TYPES } from '../../../Constant/ArtiboxEditor/types';
import Actions from '../../../Constant/ArtiboxEditor/actions';
import { Dispatch as Dispatcher } from '../../../Constant/ArtiboxEditor/context';

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: -30,
    right: 0,
    backgroundColor: Colors.LAYER_FOURTH,
    borderRadius: 40,
    pointerEvents: 'auto',
    padding: '0 7px',
    height: 38,
    border: `solid 1px ${Colors.LAYER_FOURTH}`,
  },
  btn: {
    cursor: 'pointer',
    margin: '0 8px',
  },
};

type Props = {
  textarea: {
    current: ?Node,
  },
  displayer: {
    current: ?Node,
  },
  meta: {
    MARKERS: Array,
  },
  blockId: string,
}

function MarkerEditorMenu({
  textarea: {
    current: input,
  },
  displayer: {
    current: display,
  },
  meta,
  blockId,
}: Props) {
  const dispatch = useContext(Dispatcher);
  const [isShown, setShown] = useState(false);

  useEffect(() => {
    if (!input) return () => {};

    function onSelectionChangeHandler() {
      if (document.activeElement !== input) {
        setShown(false);

        return;
      }

      const {
        selectionStart,
        selectionEnd,
      } = input;

      if (selectionStart === selectionEnd) {
        setShown(false);

        return;
      }

      setShown(true);
    }

    document.addEventListener('selectionchange', onSelectionChangeHandler, false);

    return () => {
      document.removeEventListener('selectionchange', onSelectionChangeHandler, false);
    };
  }, [isShown, input]);

  const addMarkersToList = useCallback((markerType) => {
    if (!input) return;

    const {
      selectionStart,
      selectionEnd,
    } = input;

    if (selectionStart === selectionEnd) return;

    const initUnitMarkersSet = (meta.MARKERS || []).reduce((map, curMarker) => {
      Array.from(Array(curMarker.TO - curMarker.FROM)).forEach((n, index) => {
        map.set(curMarker.FROM + index, curMarker.TYPE);
      });

      return map;
    }, new Map());


    const unitMarkersSet = Array.from(Array(selectionEnd - selectionStart))
      .reduce((unitMarkers, selectedUnit, id) => {
        if (markerType !== MARKER_TYPES.ERASE) {
          unitMarkers.set(selectionStart + id, markerType);
        } else {
          unitMarkers.delete(selectionStart + id);
        }

        return unitMarkers;
      }, initUnitMarkersSet);

    const newMarkers = Array.from(unitMarkersSet.entries())
      .sort((cursorA, cursorB) => cursorA[0] - cursorB[0])
      .reduce((markers, [unitIndex, mark], index, markerSet) => {
        if (!markers.length) {
          return [{
            TYPE: mark,
            FROM: unitIndex,
            TO: unitIndex + 1,
          }];
        }

        const [
          prevUnitIndex,
          prevMark,
        ] = markerSet[index - 1];

        if (prevUnitIndex === unitIndex - 1 && prevMark === mark) {
          return [
            ...markers.slice(0, markers.length - 1),
            {
              ...markers[markers.length - 1],
              TO: unitIndex + 1,
            },
          ];
        }

        return [
          ...markers,
          {
            TYPE: mark,
            FROM: unitIndex,
            TO: unitIndex + 1,
          },
        ];
      }, []);

    dispatch({
      type: Actions.SET_METADATA,
      id: blockId,
      meta: {
        ...meta,
        MARKERS: [
          ...newMarkers,
        ],
      },
    });
  }, [input, meta, dispatch, blockId]);

  if (!isShown) return null;

  return (
    <div style={styles.wrapper}>
      <button
        onClick={() => addMarkersToList(MARKER_TYPES.HIGHTLIGHT)}
        style={styles.btn}
        type="button">
        <Icons.HIGHLIGHT />
      </button>
      <button
        onClick={() => addMarkersToList(MARKER_TYPES.BOLD)}
        style={styles.btn}
        type="button">
        <Icons.BOLD />
      </button>
      <button
        onClick={() => addMarkersToList(MARKER_TYPES.ITALIC)}
        style={styles.btn}
        type="button">
        <Icons.ITALIC />
      </button>
      <button
        onClick={() => addMarkersToList(MARKER_TYPES.ERASE)}
        style={styles.btn}
        type="button">
        <Icons.ERASE />
      </button>
    </div>
  );
}

export default MarkerEditorMenu;

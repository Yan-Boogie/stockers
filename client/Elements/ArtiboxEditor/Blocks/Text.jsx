// @flow

import React, {
  Fragment,
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useContext,
} from 'react';
import Actions from '../../../Constant/ArtiboxEditor/actions';
import { Dispatch as DispatchContext } from '../../../Constant/ArtiboxEditor/context';
import { BLOCK_TYPES, MARKER_TYPES } from '../../../Constant/ArtiboxEditor/types';
import MarkerEditorMenu from '../Elements/MarkerEditorMenu';

const BASIC_HEIGHT = {
  [BLOCK_TYPES.TEXT]: 26,
  [BLOCK_TYPES.TITLE]: 36,
  [BLOCK_TYPES.SUBTITLE]: 30,
};

const FONT_SIZE = {
  [BLOCK_TYPES.TEXT]: 16,
  [BLOCK_TYPES.TITLE]: 24,
  [BLOCK_TYPES.SUBTITLE]: 20,
};

const FONT_WEIGHT = {
  [BLOCK_TYPES.TEXT]: 400,
  [BLOCK_TYPES.TITLE]: 700,
  [BLOCK_TYPES.SUBTITLE]: 500,
};

const LETTER_SPACING = {
  [BLOCK_TYPES.TEXT]: 1,
  [BLOCK_TYPES.TITLE]: 3,
  [BLOCK_TYPES.SUBTITLE]: 2,
};

const COLOR = {
  [BLOCK_TYPES.TEXT]: '#FFF',
  [BLOCK_TYPES.TITLE]: '#FFF',
  [BLOCK_TYPES.SUBTITLE]: '#FFF',
};

const styles = {
  wrapper: {
    width: '100%',
    position: 'relative',
    borderLeft: '2px solid transparent',
    padding: '0 12px',
  },
  focusWrapper: {
    width: '100%',
    position: 'relative',
    borderLeft: `2px solid ${Colors.PRIMARY}`,
    padding: '0 12px',
  },
  input: {
    height: 26,
    border: 'none',
    width: '100%',
    outline: 'none',
    resize: 'none',
    backgroundColor: 'transparent',
    padding: 0,
    color: Colors.LAYER_THIRD,
    caretColor: '#FFF',
  },
  displayer: {
    position: 'absolute',
    width: '100%',
    padding: '0 12px',
    left: 0,
    top: 0,
    pointerEvents: 'none',
    wordWrap: 'break-word',
    whiteSpace: 'pre-wrap',
  },
  hightLightTag: {
    color: 'rgb(214, 87, 71)',
  },
  boldTag: {
    fontWeight: 700,
  },
  italicTag: {
    fontStyle: 'italic',
  },
};

type Props = {
  type: symbol,
  content: string,
  focus: boolean,
  meta: Object,
  id: string,
  loaded: boolean,
  firstLoaded: boolean,
  placeholder?: string,
}

function Text({
  type,
  content,
  focus,
  meta,
  id,
  firstLoaded,
  placeholder,
  loaded,
}: Props) {
  const textarea = useRef();
  const displayer = useRef();

  const dispatch = useContext(DispatchContext);

  const [currentCaret, setCurrentCaret] = useState(0);

  useEffect(() => {
    if (textarea.current && displayer.current) {
      textarea.current.style.height = `${BASIC_HEIGHT[type]}px`;

      displayer.current.style.height = `${BASIC_HEIGHT[type]}px`;

      const {
        parentNode,
      } = textarea.current;

      parentNode.style.height = `${BASIC_HEIGHT[type]}px`;
    }
  }, [type]);

  useEffect(() => {
    const { current } = textarea;

    if (loaded && textarea.current) {
      current.style.setProperty('height', `${BASIC_HEIGHT[type]}px`);

      const newHeight = `${current.scrollHeight}px`;

      current.style.setProperty('height', newHeight);
      current.parentNode.style.setProperty('height', newHeight);
    }
  }, [loaded, type]);

  useEffect(() => {
    const { current } = textarea;

    if (current && firstLoaded && focus) {
      current.focus();
    }

    dispatch({
      type: Actions.LOADED,
      id,
    });
  }, [dispatch, firstLoaded, id, focus]);

  const onInputHandler = useCallback(({ target }) => {
    target.style.setProperty('height', `${BASIC_HEIGHT[type]}px`);

    const newHeight = `${target.scrollHeight}px`;

    target.style.setProperty('height', newHeight);
    target.parentNode.style.setProperty('height', newHeight);
  }, [type]);

  const onFocusHandler = useCallback(() => {
    dispatch({
      type: Actions.FOCUS,
      id,
    });
  }, [dispatch, id]);

  const onChangeHandler = useCallback(({ target }) => {
    const diff = target.selectionStart - currentCaret;

    const MARKERS = (meta.MARKERS || []).reduce((markers, marker) => {
      if (currentCaret > marker.TO && target.selectionStart < marker.FROM) return markers;

      if (currentCaret > marker.TO) {
        if (target.selectionStart < marker.TO) {
          return [
            ...markers,
            {
              ...marker,
              TO: target.selectionStart,
            },
          ];
        }

        return [
          ...markers,
          marker,
        ];
      }

      if (currentCaret <= marker.FROM) {
        return [
          ...markers,
          {
            ...marker,
            FROM: marker.FROM + diff,
            TO: marker.TO + diff,
          },
        ];
      }

      if (currentCaret > marker.FROM && target.selectionStart < marker.FROM) {
        return [
          ...markers,
          {
            ...marker,
            FROM: marker.FROM - (marker.FROM - target.selectionStart),
            TO: marker.TO + diff,
          },
        ];
      }

      return [
        ...markers,
        {
          ...marker,
          TO: marker.TO + diff,
        },
      ];
    }, []);

    console.log('MARKERS', MARKERS);

    dispatch({
      type: Actions.UPDATE_META_AND_CONTENT,
      id,
      content: target.value,
      meta: {
        ...meta,
        MARKERS,
      },
    });

    setCurrentCaret(target.selectionEnd);
  }, [dispatch, id, currentCaret, meta]);

  const onKeyDownHandler = useCallback((e) => {
    const {
      keyCode,
      target,
    } = e;

    setCurrentCaret(target.selectionEnd);

    // delete
    if (keyCode === 8) {
      if (content === '') {
        dispatch({
          type: Actions.REMOVE_BLOCK,
          id,
        });
      }
    } else if (keyCode === 13) { // enter
      e.preventDefault();

      dispatch({
        type: Actions.NEW_LINE,
        at: id,
      });
    }
  }, [dispatch, content, id]);

  const onPasteHandler = useCallback(({ target }) => {
    setCurrentCaret(target.selectionEnd);
  }, []);

  const addTagToList = useCallback((tag, marker) => {
    switch (marker.TYPE) {
      case MARKER_TYPES.HIGHTLIGHT: {
        tag.push(
          <span
            style={styles.hightLightTag}
            key={`${marker.FROM}:${marker.TO}`}>
            {content.substring(marker.FROM, marker.TO)}
          </span>
        );

        break;
      }

      case MARKER_TYPES.BOLD: {
        tag.push(
          <span
            style={styles.boldTag}
            key={`${marker.FROM}:${marker.TO}`}>
            {content.substring(marker.FROM, marker.TO)}
          </span>
        );

        break;
      }

      case MARKER_TYPES.ITALIC: {
        tag.push(
          <span
            style={styles.italicTag}
            key={`${marker.FROM}:${marker.TO}`}>
            {content.substring(marker.FROM, marker.TO)}
          </span>
        );

        break;
      }

      default: {
        tag.push(
          <span
            key={`${marker.FROM}:${marker.TO}`}>
            {content.substring(marker.FROM, marker.TO)}
          </span>
        );

        break;
      }
    }
  }, [content]);

  const contentDisplayer = useMemo(() => {
    const tag = [];
    const markers = (meta.MARKERS || []);

    if (!markers.length) return content;

    markers.forEach((marker, index, Markers) => {
      if (index === 0) {
        tag.push(
          <span
            key={`0:${marker.FROM}`}>
            {content.substring(0, marker.FROM)}
          </span>
        );

        addTagToList(tag, marker);

        if (markers.length === 1) {
          tag.push(
            <span
              key={`${marker.TO}:`}>
              {content.substring(marker.TO)}
            </span>
          );
        }

        return;
      }

      const prevMarker = Markers[index - 1];

      if (prevMarker.TO !== marker.FROM) {
        tag.push(
          <span
            key={`${prevMarker.TO}:${marker.FROM}`}>
            {content.substring(prevMarker.TO, marker.FROM)}
          </span>
        );
      }

      addTagToList(tag, marker);

      if (index === Markers.length - 1) {
        tag.push(
          <span
            key={`${marker.TO}:`}>
            {content.substring(marker.TO)}
          </span>
        );
      }
    });

    return (
      <Fragment>
        {tag}
      </Fragment>
    );
  }, [meta, content, addTagToList]);

  const wrapperStyles = useMemo(() => ({
    ...(focus ? styles.focusWrapper : styles.wrapper),
    height: BASIC_HEIGHT[type],
  }), [focus, type]);

  const inputStyles = useMemo(() => ({
    ...styles.input,
    fontSize: FONT_SIZE[type],
    fontWeight: FONT_WEIGHT[type],
    letterSpacing: LETTER_SPACING[type],
    caretColor: COLOR[type],

    lineHeight: `${BASIC_HEIGHT[type]}px`,
  }), [type]);

  const displayerStyles = useMemo(() => ({
    ...styles.displayer,
    fontSize: FONT_SIZE[type],
    fontWeight: FONT_WEIGHT[type],
    letterSpacing: LETTER_SPACING[type],
    color: COLOR[type],
    lineHeight: `${BASIC_HEIGHT[type]}px`,
  }), [type]);

  return (
    <div style={wrapperStyles}>
      <textarea
        placeholder={placeholder}
        value={content}
        onPaste={onPasteHandler}
        onKeyDown={onKeyDownHandler}
        onChange={onChangeHandler}
        onInput={onInputHandler}
        onFocus={onFocusHandler}
        style={inputStyles}
        className="Artibox-input"
        ref={textarea} />
      <div
        style={displayerStyles}
        ref={displayer}>
        {contentDisplayer}
        <MarkerEditorMenu
          meta={meta}
          blockId={id}
          displayer={displayer}
          textarea={textarea} />
      </div>
    </div>
  );
}

Text.defaultProps = {
  placeholder: '請在此輸入內容',
};

export default Text;

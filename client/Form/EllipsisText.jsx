// @flow
/* eslint react/no-array-index-key: 0 */

import React, {
  useState,
  useMemo,
  Fragment,
} from 'react';
import TextareaEditorModal from './TextareaEditorModal';
import useMouseHover from '../helper/useMouseHover';

const styles = {
  wrapper: {
    position: 'relative',
    width: '100%',
  },
  ellipsis: {
    width: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'block',
    cursor: 'default',
    minWidth: '1em',
    minHeight: '1em',
  },
  ellipsisWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    padding: '12px 11px 12px 12px',
    position: 'relative',
    borderRadius: 4,
    backgroundColor: '#fff',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    fontSize: 13,
    letterSpacing: 1,
    margin: 0,
    lineHeight: 1.618,
    wordBreak: 'break-all',
  },
  editBtn: {
    position: 'absolute',
    backgroundColor: '#e2e2e2',
    padding: '2px 6px 3px 6px',
    letterSpacing: 1,
    fontSize: 12,
    borderRadius: '0 4px 0 0',
    right: 0,
    top: 0,
    color: Colors.SECONDARY,
    fontWeight: 300,
    transition: 'all 0.2s ease-out',
  },
  editBtnHovered: {
    color: '#fff',
    backgroundColor: Colors.SECONDARY,
  },
  paragraph: {
    margin: 0,
    color: Colors.SECONDARY,
  },
};

type Props = {
  onEdit?: ?Function,
  children: string,
  editDesc?: ?string,
  editTitle?: ?string,
  editPlaceholder?: ?string,
  placeholderComponent?: ?ReactElement,
  size?: number,
  justifyContent?: string,
  textAlign: string,
};

function EllipsisText({
  textAlign,
  children,
  onEdit,
  editDesc,
  editTitle,
  editPlaceholder,
  placeholderComponent: PlaceholderComponent,
  size,
  justifyContent,
}: Props) {
  const [
    triggerElem,
    onMouseEnter,
    onMouseLeave,
    fullContentStyle,
  ] = useMouseHover(!!onEdit);

  const [editorShown, setEditorShown] = useState(false);
  const [btnHover, setBtnHover] = useState(false);

  const ellipsisWrapperStyle = useMemo(() => ({
    ...styles.ellipsisWrapper,
    justifyContent,
  }), [justifyContent]);

  // 可控制字的大小 和
  const ellipsisStyle = useMemo(() => ({
    ...styles.ellipsis,
    ...{
      fontSize: size,
      textAlign,
    },
  }), [size, textAlign]);

  const editBtnStyle = useMemo(() => ({
    ...styles.editBtn,
    ...(btnHover ? styles.editBtnHovered : {}),
  }), [btnHover]);

  return (
    <Fragment>
      {PlaceholderComponent && !children ? (
        <PlaceholderComponent openEditor={() => setEditorShown(true)} />
      ) : null}
      {children ? (
        <div
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={styles.wrapper}>
          <div
            style={ellipsisWrapperStyle}>
            <span
              ref={triggerElem}
              style={ellipsisStyle}>
              {children}
            </span>
          </div>
          <div style={fullContentStyle}>
            <div style={styles.container}>
              {onEdit ? (
                <button
                  onClick={() => setEditorShown(true)}
                  onMouseEnter={() => setBtnHover(true)}
                  onMouseLeave={() => setBtnHover(false)}
                  style={editBtnStyle}
                  type="button">
                  編輯
                </button>
              ) : null}
              {Array.isArray(children) ? (
                <p style={styles.paragraph}>
                  {children}
                </p>
              ) : `${children || ''}`.split('\n').map((text, index) => (
                <p key={index} style={styles.paragraph}>
                  {text}
                </p>
              ))}
            </div>
          </div>
        </div>
      ) : null}
      {onEdit && editorShown ? (
        <TextareaEditorModal
          onEdit={onEdit}
          defaultValue={children}
          close={() => setEditorShown(false)}
          placeholder={editPlaceholder}
          editTitle={editTitle}
          editDesc={editDesc} />
      ) : null}
    </Fragment>
  );
}

EllipsisText.defaultProps = {
  onEdit: null,
  editDesc: null,
  editTitle: null,
  editPlaceholder: null,
  placeholderComponent: null,
  size: 13,
  justifyContent: 'center',
};

export default EllipsisText;

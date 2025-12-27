// @flow
/* eslint max-len:0 */

import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import moment from 'moment';
import type { FieldProps } from 'redux-form';
import InputCalendar from '../Elements/Form/InputCalendar';
import { FLOAT_TEXT_INDEX } from '../Constant/zIndex';

const styles = {
  wrapper: {
    width: '100%',
    position: 'relative',
    height: 32,
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    width: '100%',
    height: 32,
    outline: 'none',
    fontSize: 14,
    backgroundColor: '#EDEDED',
    borderRadius: 2,
    boxShadow: '0px 1px 1px 0px #FFF, 1px 2px 1px rgba(0, 0, 0, 0.3) inset',
    textAlign: 'left',
    padding: '0 12px',
    letterSpacing: 1,
    fontWeight: 400,
    position: 'relative',
  },
  hasValue: {
    color: Colors.SECONDARY,
  },
  btnExtended: {
    width: 240,
  },
  clearBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  picker: {
    width: 0,
    height: 0,
    backgroundColor: '#E3E3E3',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    position: 'absolute',
    top: 31,
    left: 0,
    padding: 0,
    borderRadius: 2,
    opacity: 0,
    transition: 'opacity 0s ease-out',
    overflow: 'hidden',
  },
  pickerShown: {
    padding: 24,
    width: 316,
    height: 'auto',
    opacity: 1,
    zIndex: FLOAT_TEXT_INDEX,
    transition: 'opacity 0.2s ease-out',
  },
  errorStr: {
    fontSize: 12,
    color: Colors.ERROR,
    position: 'absolute',
    bottom: 6,
    letterSpacing: 1,
    textAlign: 'left',
    right: 20,
    left: 'auto',
    padding: '0 10px 0 0',
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
    borderLeft: 'none',
    borderTopLeft: 0,
    borderBottomLeft: 0,
  },
  openErrorStr: {
    display: 'none',
  },
  singleInput: {
    width: '100%',
    height: 30,
    border: '1px solid #E0E0E0',
    backgroundColor: '#fff',
    borderRadius: 3,
    outline: 'none',
    textAlign: 'center',
    fontSize: 13,
    color: Colors.SECONDARY,
    padding: '0 12px',
    letterSpacing: 1,
    fontWeight: 400,
    position: 'relative',
  },
};

type Props = {
  disabled?: boolean,
  ...FieldProps,
};

function usePrevValue(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

function DatePicker({
  input: {
    onChange,
    value,
  },
  disabled,
  meta,
}: Props) {
  const {
    error,
    dirty,
    submitFailed,
  } = meta || {};

  const [date, setDate] = useState(value || '');
  const [isShown, show] = useState(false);

  const text = useMemo(() => {
    if (error) return '';

    return value;
  }, [error, value]);

  const errorTag = useMemo(() => {
    if (error && (dirty || submitFailed || !value)) return null;

    return (
      <div
        style={isShown ? styles.openErrorStr : styles.errorStr}>
        {error}
      </div>
    );
  }, [
    error,
    dirty,
    submitFailed,
    isShown,
    value,
  ]);

  const prevValue = usePrevValue(value);

  const onClick = useCallback(() => {
    if (!value) {
      show(!isShown);

      return;
    }

    onChange(null);
  }, [onChange, value, show, isShown]);

  useEffect(() => {
    if (!value || !prevValue) return;

    if (value !== prevValue) {
      show(false);
    }
  }, [prevValue, value, show, isShown]);

  const extendBtnStyles = useMemo(() => ({
    ...styles.button,
    ...(value ? styles.hasValue : {}),
    ...(value && value.endOn ? styles.btnExtended : {}),
    ...(error ? { border: `1px solid ${Colors.ERROR}` } : {}),
  }), [error, value]);

  const isShownedBtn = useMemo(() => (isShown ? (
    <button
      onClick={() => onClick()}
      style={styles.clearBtn}
      type="button">
      <svg width="12" height="12">
        <path
          d="M1 1L11 11M11 1L1 11"
          fill="transparent"
          strokeWidth="1"
          stroke="#000" />
      </svg>
    </button>
  ) : null), [isShown, onClick]);

  const pickerStyles = useMemo(() => ({
    ...styles.picker,
    ...isShown && styles.pickerShown,
  }), [isShown]);

  const inputCalendar = useMemo(() => {
    if (!isShown) return null;

    return (
      <InputCalendar
        single
        closePicker={() => show(false)}
        value={value}
        onChange={onChange}
        defaultMonth={value ? moment(value) : moment()} />
    );
  }, [isShown, onChange, value, show]);

  const inputDate = useMemo(() => (
    <div style={styles.inputWrapper}>
      <input
        name="singleInput"
        type="text"
        style={styles.singleInput}
        value={date ? date.replace(/[^\d-]/g, '') || '' : date || ''}
        onKeyDown={(e) => {
          if (e.which === 13 || e.keyCode === 13) {
            e.preventDefault();
          }
        }}
        onKeyUp={(e) => {
          if (e.which === 13 || e.keyCode === 13) {
            if (moment(date).isValid()
            && (date ? (date.length > 7) : true)) {
              onChange(date);
            }

            show(!isShown);
          }
        }}
        onChange={(e) => {
          setDate(e.target.value);
        }} />
    </div>
  ), [date, show, isShown, onChange]);

  return (
    <div style={styles.wrapper}>
      {isShown ? (
        <div>
          { inputDate }
        </div>
      ) : (
        <button
          onClick={() => {
            show(!isShown);
            setDate(null);
          }}
          style={extendBtnStyles}
          disabled={disabled}
          type="button">
          {text}
        </button>
      )}
      {isShownedBtn}
      <div style={pickerStyles}>
        {inputCalendar}
      </div>
      {errorTag}
    </div>
  );
}

DatePicker.defaultProps = {
  disabled: false,
};

export default DatePicker;

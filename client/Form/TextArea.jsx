// @flow

import React, {
  useMemo,
  useCallback,
} from 'react';
import type { FieldProps } from 'redux-form';

const styles = {
  wrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  errorStr: {
    fontSize: 12,
    color: Colors.ERROR,
    position: 'absolute',
    top: 20,
    letterSpacing: 1,
    textAlign: 'left',
    left: '100%',
    padding: '0 10px',
    whiteSpace: 'nowrap',
  },
  textarea: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    color: '#FFF',
    fontSize: 13,
    border: 'none',
    outline: 'none',
    resize: 'none',
  },
};

type Props = {
  isStrategyCommentForm?: boolean,
  placeholder?: string,
  disabled?: boolean,
} & FieldProps;

function TextArea({
  meta: {
    error,
    dirty,
    submitFailed,
  },
  input: {
    onChange,
    name,
    value,
  },
  isStrategyCommentForm,
  placeholder,
  disabled,
}: Props) {
  const onChangeHandler = useCallback((e) => {
    if (!isStrategyCommentForm) {

    } else {
      onChange(e);
    }
  }, [isStrategyCommentForm, onChange, value]);

  const errorTag = useMemo(() => (error && (dirty || submitFailed) ? (
    <div
      style={styles.errorStr}>
      {error}
    </div>
  ) : null), [error, dirty, submitFailed]);

  return (
    <div style={styles.wrapper}>
      <textarea
        name={name}
        value={value}
        style={styles.textarea}
        onChange={onChangeHandler}
        disabled={disabled}
        placeholder={placeholder} />
      {errorTag}
    </div>
  );
}

TextArea.defaultProps = {
  placeholder: null,
  disabled: false,
  isStrategyCommentForm: false,
};

export default TextArea;

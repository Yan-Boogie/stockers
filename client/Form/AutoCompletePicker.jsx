// @flow
/** @jsx jsx */

import {
  useState,
  useMemo,
} from 'react';
import { jsx, css } from '@emotion/core';
import LoadingSpinner from '../Elements/LoadingSpinner';

const styles = {
  wrapper: css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
};

type Props = {
  placeholder: string,
  value: string,
  onChange: Function,
  onClick: Function,
  onKeyPress: Function,
  list: Array,
  loading: boolean,
};

function AutoCompletePicker({
  placeholder,
  value,
  onChange,
  onClick,
  onKeyPress,
  list,
  loading,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const listItems = useMemo(() => {
    if (!isOpen) return null;

    if (loading) return <LoadingSpinner />;

    return (
      <div>
        {list.map(item => (
          <button
            key={item.id}
            onClick={onClick}
            onKeyPress={onKeyPress}
            aria-label="list"
            type="button">
            {item.name}
          </button>
        ))}
      </div>
    );
  }, [isOpen, onClick, list, loading, onKeyPress]);

  return (
    <div css={styles.wrapper}>
      <input
        value={value}
        onChange={onChange}
        onClick={() => setIsOpen(!isOpen)}
        placeholder={placeholder}
        type="text" />
      {listItems}
    </div>
  );
}

export default AutoCompletePicker;

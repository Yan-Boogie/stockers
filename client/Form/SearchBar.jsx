// @flow

import React, {
  useState,
  useRef,
  useEffect,
} from 'react';
import type { FieldProps } from 'redux-form';
import search from '../static/images/search-icon.png';

const styles = {
  wrapper: {
    width: 170,
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.LAYER_FIRST,
    border: 'none',
    borderRadius: 4,
  },
  icon: {
    width: 24,
    height: 24,
  },
  search: {
    width: 120,
    height: 20,
    backgroundColor: Colors.LAYER_FIRST,
    border: 'none',
    outline: 'none',
    margin: '0 0 0 10px',
  },
};

type Props = {
  placeholder: string,
};

function usePrevValue(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

function SearchBar({
  input: {
    value,
    onChange,
  },
  placeholder,
}: Props & FieldProps) {
  const [terms, setTerms] = useState(value);
  const prevValue = usePrevValue(value);

  useEffect(() => {
    if (value !== prevValue && value !== terms) {
      setTerms(value);
    }
  }, [value, prevValue, terms]);

  useEffect(() => {
    if (!terms && value) {
      onChange('');
    }
  }, [terms, value, onChange]);

  return (
    <div style={styles.wrapper}>
      <img src={search} alt="search" style={styles.icon} />
      <input
        value={terms}
        onKeyDown={(e) => {
          if (e.which === 13 || e.keyCode === 13) {
            e.preventDefault();
          }
        }}
        onKeyUp={(e) => {
          if (e.which === 13 || e.keyCode === 13) {
            onChange(terms);
          }
        }}
        onChange={({
          target: {
            value: newVal,
          },
        }) => {
          setTerms(newVal);
        }}
        style={styles.search}
        placeholder={placeholder}
        type="text" />
    </div>
  );
}

export default SearchBar;

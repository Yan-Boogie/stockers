// @flow
/** @jsx jsx */

import { useMemo, useState, useContext } from 'react';
import { jsx } from '@emotion/core';
import type { FieldProps } from 'redux-form';
import { HeaderBlockAllValuesContext } from '../../../Constant/context';

const styles = {
  wrapper: {
    opacity: 0,
    position: 'absolute',
    bottom: 107,
    left: -107,
    transform: 'rotate(-90deg)',
    transition: 'opacity 0.5s',
    zIndex: 0,
  },
  actived: {
    opacity: 1,
    transition: 'opacity 0.5s 1s',
  },
  percentText: {
    position: 'absolute',
    transform: 'rotate(90deg)',
    left: 25,
    bottom: 30,
    color: '#FFF',
    zIndex: 1000,
  },
  rangeSlider: {
    position: 'absolute',
    top: 0,
    height: 80,
    width: 300,
    borderRadius: 40,
    pointerEvents: 'none',
    overflow: 'hidden',
  },
};

function RangeSlider({
  index,
  actived,
  className,
}: FieldProps & {
  actived: boolean,
  className: string,
}) {
  const [allvalues, setallvalues] = useContext(HeaderBlockAllValuesContext);

  const [value, setValue] = useState(0);
  const rangeSliderValue = useMemo(() => ({
    position: 'absolute',
    height: 80,
    width: (300 * allvalues?.[index]) / 100,
    backgroundColor: '#FF9500',
  }), [allvalues, index]);

  return (
    <div css={[styles.wrapper, actived && styles.actived]}>
      <input
        className={className}
        type="range"
        value={value}
        min="0"
        max="100"
        step="1"
        onChange={({
          target,
        }) => {
          const accumValue = [
            ...allvalues.slice(0, index),
            Number(target.value),
            ...allvalues.slice(index + 1),
          ].reduce((accum, curr) => accum + curr, 0);

          if (accumValue < 100) {
            setallvalues([
              ...allvalues.slice(0, index),
              Number(target.value),
              ...allvalues.slice(index + 1),
            ]);
          }

          const hasValueIndex = allvalues.findIndex((allvalue, i) => allvalue > 0 && i !== index);

          if (accumValue > 100) {
            if (index === 0) {
              if (hasValueIndex > 1) {
                setallvalues([
                  Number(target.value),
                  ...allvalues.slice(1, hasValueIndex),
                  allvalues[hasValueIndex] - (accumValue - 100),
                  ...allvalues.slice(hasValueIndex + 1),
                ]);
              } else {
                setallvalues([
                  Number(target.value),
                  allvalues[1] - (accumValue - 100),
                  ...allvalues.slice(2),
                ]);
              }
            } else {
              setallvalues([
                allvalues[0] - (accumValue - 100),
                ...allvalues.slice(1, index),
                Number(target.value),
                ...allvalues.slice(index + 1),
              ]);
            }
          }

          setValue(Number(target.value));
        }} />
      <span css={styles.percentText}>{allvalues?.[index] ? `${allvalues[index]}%` : '0%'}</span>
      <div css={styles.rangeSlider}>
        <span css={rangeSliderValue} />
      </div>
    </div>
  );
}

export default RangeSlider;

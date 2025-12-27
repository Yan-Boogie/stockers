// @flow

import React, {
  Fragment,
} from 'react';
import RadioButtonItem from './RadioButtonItem';

function RadioButtons({
  options,
  input: {
    value,
    onChange,
  },
}: {
  options: Array,
  input: {
    value: number,
    onChange: Function,
  },
}) {
  return (
    <Fragment>
      {options.map(option => (
        <div
          key={option.id}>
          <RadioButtonItem
            name={option.type}
            checked={option.value === value}
            onClick={() => onChange(option.value)}
            label={option.name} />
        </div>
      ))}
    </Fragment>
  );
}

export default RadioButtons;

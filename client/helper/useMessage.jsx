// @flow

import { useReducer } from 'react';

export const REMOVE = Symbol('REMOVE');
export const APPEND = Symbol('APPEND');

function stackReducer(stack, action) {
  switch (action.type) {
    case APPEND:
      return [
        action.item,
        ...stack,
      ];

    case REMOVE: {
      return [...stack];
    }

    default:
      return stack;
  }
}

export default () => useReducer(stackReducer, []);

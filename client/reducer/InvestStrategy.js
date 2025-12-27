// @flow

import {
  STORE_USER_MODULES,
} from '../actions/InvestStrategy';

type State = {

}

export default (state: State = {
  userModulesInfo: [],
}, action: any) => {
  switch (action.type) {
    case STORE_USER_MODULES:
      return {
        ...state,
        userModulesInfo: action.modules,
      };

    default:
      return state;
  }
};

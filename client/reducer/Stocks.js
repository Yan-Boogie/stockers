// @flow

import {
  STORE_STOCK_DATA,
} from '../actions/Stocks';

type State = {

}

export default (state: State = {
  stockData: {},
}, action: any) => {
  switch (action.type) {
    case STORE_STOCK_DATA:
      return {
        ...state,
        stockData: action.stockData,
      };

    default:
      return state;
  }
};

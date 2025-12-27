// @flow

import {
  STORE_STOCK_PRICE_DATA,
} from '../actions/StockPrices';

type State = {

}

export default (state: State = {
  stockPriceData: {},
}, action: any) => {
  switch (action.type) {
    case STORE_STOCK_PRICE_DATA:
      return {
        ...state,
        stockPriceData: action.stockPriceData,
      };

    default:
      return state;
  }
};

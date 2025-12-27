// @flow

export const STORE_STOCK_PRICE_DATA = 'STOCK/STORE_STOCK_PRICE_DATA';

export function storeStockPriceData(stockPriceData) {
  return {
    type: STORE_STOCK_PRICE_DATA,
    stockPriceData,
  };
}

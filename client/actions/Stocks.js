// @flow

export const STORE_STOCK_DATA = 'STOCK/STORE_STOCK_DATA';

export function storeStockData(stockData) {
  return {
    type: STORE_STOCK_DATA,
    stockData,
  };
}

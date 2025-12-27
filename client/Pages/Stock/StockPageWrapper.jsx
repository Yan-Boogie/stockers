// @flow

import React, {
  useState,
  useEffect,
} from 'react';
import {
  Switch,
  Route,
  useParams,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import StockPage from './StockPage';
import InvestStrategyPageWrapper from '../InvestStrategy/InvestStrategyPageWrapper';
import { prettifyStockData } from '../../helper/stocks';
import * as StockActions from '../../actions/Stocks';
import * as StockPricesActions from '../../actions/StockPrices';
import LoadingSpinner from '../../Elements/LoadingSpinner';

function StockPageWrapper({
  storeStockData,
  storeStockPriceData,

}: {
  storeStockData: Function,
  storeStockPriceData: Function,
}) {
  const { stockId } = useParams();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let canceled = false;

    async function fetchStockData() {
      const resData = await fetch(`${API_HOST}/stocker/individualStock/${stockId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => (!canceled ? res.json() : null));

      if (resData) {
        const prettifiedStockData = prettifyStockData(resData);

        storeStockData(prettifiedStockData);
      }
    }

    fetchStockData();
    setLoading(false);

    return () => {
      canceled = true;
    };
  }, [storeStockData, stockId]);

  useEffect(() => {
    let canceled = false;

    async function fetchStockPricesData() {
      const resData = await fetch(`${API_HOST}/stocker/seasonPrice/${stockId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => (!canceled ? res.json() : null));

      if (resData) {
        storeStockPriceData(resData);
      }
    }

    fetchStockPricesData();
    setLoading(false);

    return () => {
      canceled = true;
    };
  }, [isLoading, stockId, storeStockPriceData]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <Switch>
      <Route path="/industry/:industryId/stocks/:stockId/modules" component={InvestStrategyPageWrapper} />
      <Route path="/industry/:industryId/stocks/:stockId" component={StockPage} />
    </Switch>
  );
}

const reduxHook = connect(
  () => ({}),
  dispatch => bindActionCreators({
    ...StockActions,
    ...StockPricesActions,
  }, dispatch),
);

export default reduxHook(StockPageWrapper);

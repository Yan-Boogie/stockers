// @flow

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import type { ContextRouter } from 'react-router';
import { storeUserModules as storeUserModulesAction } from '../../actions/InvestStrategy';
import InvestStrategyPage from '../../Elements/InvestStrategy/InvestStrategyPage';
import getModuleAlertion from '../../helper/getModuleAlertion';

function InvestStrategyPageWrapper({
  storeUserModules,
  history,
  stockData,
  match: {
    params: {
      industryId,
      stockId,
    },
  },
}: {
  stockData: {},
  storeUserModules: Function,
} & ContextRouter) {
  const localState = {
    userId: localStorage.getItem('userId'),
    token: localStorage.getItem('token'),
  };

  useEffect(() => {
    if (!localState.userId || !localState.token) {
      history.replace(`/industry/${industryId}/stocks/${stockId}`);
    }
  }, [localState, history, industryId, stockId]);

  useEffect(() => {
    let canceled = false;

    async function fetchUserModulesData() {
      const resData = await fetch(`${API_HOST}/modules/userModules/${localState.userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: localState.token,
        },
      }).then(res => (!canceled ? res.json() : null));

      if (resData) {
        const dataWithAlertionValue = resData.map((el) => {
          const moduleAlertion = getModuleAlertion(el.mathModule, stockData);

          return {
            ...el,
            alertion: moduleAlertion,
          };
        });

        storeUserModules(dataWithAlertionValue);
      }
    }

    if (localState.userId && localState.token) {
      fetchUserModulesData();
    }

    return () => {
      canceled = true;
    };
  }, [storeUserModules, localState, stockData]);

  return (
    <InvestStrategyPage />
  );
}

const reduxHook = connect(
  state => ({
    stockData: state.Stocks.stockData,
  }),
  dispatch => bindActionCreators({
    storeUserModules: storeUserModulesAction,
  }, dispatch),
);

export default reduxHook(InvestStrategyPageWrapper);

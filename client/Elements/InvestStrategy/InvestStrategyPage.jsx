// @flow

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HeaderBlock from './HeaderBlock';
import InvestStrategyMainBlock from './InvestStrategyMainBlock';
import StockSimulationPage from '../../Pages/StockSimulation/StockSimulationPage';

const styles = {
  wrapper: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    height: '100%',
  },
  headerBlock: {
    width: '100%',
    flexBasis: 100,
    flexShrink: 0,
    backgroundColor: Colors.LAYER_SECOND,
  },
  btn: {
    position: 'absolute',
    width: 100,
    height: 40,
    top: 20,
    right: 20,
    fontSize: 14,
    backgroundColor: Colors.PRIMARY,
  },
};

function InvestStrategyPage() {
  return (
    <div style={styles.wrapper}>
      <HeaderBlock />
      <Switch>
        <Route path="/industry/:industryId/stocks/:stockId/modules/simulation" component={StockSimulationPage} />
        <Route path="/industry/:industryId/stocks/:stockId/modules/:moduleId" component={InvestStrategyMainBlock} />
      </Switch>
    </div>
  );
}

export default InvestStrategyPage;

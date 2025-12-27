// @flow

import React, { useEffect } from 'react';
import {
  Switch,
  Route,
  useHistory,
} from 'react-router-dom';
import HeaderBlock from '../Elements/InvestStrategy/HeaderBlock';
import InvestStrategyMainBlock from '../Elements/InvestStrategy/InvestStrategyMainBlock';
import SiteHeader from '../Elements/Sites/SiteHeader';

// MOCK
import { moduleDataMock } from '../Mocks/Queries/financeTable';

const styles = {
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '0 20px 0 30px',
  },
  example: {
    width: '100%',
  },
};

function MainBoard() {
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem('token')) history.replace('/');
  }, [history]);

  return (
    <div style={styles.wrapper}>
      <SiteHeader />
      <div style={styles.main}>
        <div style={styles.wrapper}>
          <HeaderBlock />
          <InvestStrategyMainBlock
            moduleInfo={{
              comment: {},
              mathModule: {},
              headers: moduleDataMock,
            }} />
        </div>
      </div>
    </div>
  );
}

export default MainBoard;

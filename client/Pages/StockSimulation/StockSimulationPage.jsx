// @flow
/** @jsx jsx */

import { useState } from 'react';
import { jsx } from '@emotion/core';
import { reduxForm } from 'redux-form';
import StockSimulationModal from '../../Elements/StockSimulation/StockSimulationModal';
import StockSimulationMainBlock from '../../Elements/StockSimulation/StockSimulationMainBlock';
import { SimulationDataContext } from '../../Constant/context';
import { FORM_STOCK_SIMULATION } from '../../Constant/form';

const styles = {
  wrapper: {
    width: '100%',
    padding: '40px 0',
  },
  btn: {
    width: 132,
    height: 80,
    borderRadius: 40,
    color: '#FFF',
    fontSize: 13,
    lineHeight: '80px',
    backgroundColor: Colors.PRIMARY,
  },
};

function StockSimulationPage({
  handleSubmit,
}: {
  handleSubmit: Function,
}) {
  const [shownModal, showModal] = useState(false);
  const [simulationData, setSimulationData] = useState([]);

  return (
    <SimulationDataContext.Provider value={simulationData}>
      <div style={styles.wrapper}>
        <button
          css={styles.btn}
          onClick={() => showModal(true)}
          type="button">
          測試績效
        </button>
        {shownModal ? (
          <StockSimulationModal
            handleSubmit={handleSubmit}
            setSimulationData={setSimulationData}
            close={() => showModal(false)} />
        ) : null}
        <StockSimulationMainBlock />
      </div>
    </SimulationDataContext.Provider>
  );
}

const formHook = reduxForm({
  form: FORM_STOCK_SIMULATION,
});

export default formHook(StockSimulationPage);

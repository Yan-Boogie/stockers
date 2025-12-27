// @flow

import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { ModuleDataContext } from '../../../Constant/context';
import ModuleTable from './ModuleTable';
import { sharedEmitter, UPDATE_MODULE_HEADER } from './ChipHeaderUpdateBlock';

type Props = {
  stockData: {},
  headers: Array,
}

function ModuleTableWrapper({
  stockData,
  headers,
}: Props) {
  const [moduleData, setModuleData] = useState([]);

  const updateModuleData = useCallback((updateData) => {
    if (Array.isArray(updateData)) {
      const sheets = Object.values(stockData).filter(el => el.name);

      if (sheets.length) {
        const newData = updateData.map((data) => {
          const dataBelongSheetInfo = sheets.find(sheet => sheet.name === data.parentName);

          const chipDataBeforeProgressionDetermine = dataBelongSheetInfo.chipInfos
            .find(chipInfo => chipInfo.chipName === data.headerName).chipData;

          const newChipData = (dataBelongSheetInfo.isProgression
            ? chipDataBeforeProgressionDetermine.map((chip, index) => {
              if (moment(chip.date).month() - 2) {
                return {
                  ...chip,
                  value: parseInt(chip.value, 10)
                    - parseInt(chipDataBeforeProgressionDetermine[index + 1].value, 10),
                };
              }

              return chip;
            }).slice(0, 10)
            : chipDataBeforeProgressionDetermine.slice(0, 10));

          return {
            id: data.columnId,
            name: data.headerName,
            parentName: data.parentName,
            isProgression: dataBelongSheetInfo.isProgression,
            chipData: newChipData,
          };
        });

        setModuleData(newData);
      }
    }
  }, [stockData]);

  useEffect(() => {
    updateModuleData(headers);
  }, [stockData, headers, updateModuleData]);

  useEffect(() => {
    function updateModuleHandler(data) {
      updateModuleData(data);
    }

    sharedEmitter.on(UPDATE_MODULE_HEADER, updateModuleHandler);

    return () => {
      sharedEmitter.removeListener(UPDATE_MODULE_HEADER, updateModuleHandler);
    };
  }, [updateModuleData]);

  return (
    <ModuleDataContext.Provider value={moduleData}>
      <ModuleTable />
    </ModuleDataContext.Provider>
  );
}

const reduxHook = connect(
  state => ({
    stockData: state.Stocks.stockData,
  }),
);

export default reduxHook(ModuleTableWrapper);

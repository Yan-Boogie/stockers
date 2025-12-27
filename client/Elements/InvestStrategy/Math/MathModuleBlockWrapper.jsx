// @flow

import React, {
  useMemo,
} from 'react';
import MathModuleBlock from './MathModuleBlock';
import { MathInitDataContext } from '../../../Constant/context';

import { MATH_META_TYPES } from '../../../Constant/investStrategy';

function MathModuleBlockWrapper({
  mathModule,
}: {
  mathModule: {
    chipInfos: Array,
  },
}) {
  const transformedMathInfo = useMemo(() => {
    if (!mathModule.chipInfos || !mathModule.chipInfos.length) {
      return {
        content: '',
        chipInfos: [],
      };
    }

    return {
      ...mathModule,
      chipInfos: mathModule.chipInfos.map(chipInfo => ({
        ...chipInfo,
        chipData: {
          ...chipInfo.chipData,
          type: MATH_META_TYPES[chipInfo.chipData.type],
        },
      })),
    };
  }, [mathModule]);

  return (
    <MathInitDataContext.Provider value={transformedMathInfo}>
      <MathModuleBlock />
    </MathInitDataContext.Provider>
  );
}

export default MathModuleBlockWrapper;

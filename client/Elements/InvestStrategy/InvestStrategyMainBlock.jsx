// @flow

import React, {
  Fragment,
} from 'react';
import ModuleTableWrapper from './Module/ModuleTableWrapper';
import CommentBlockWrapper from './CommentBlockWrapper';
import MathModuleBlockWrapper from './Math/MathModuleBlockWrapper';

type Props = {
  moduleInfo: {
    comment: {},
    mathModule: {},
    headers: Array,
  },
};

function InvestStrategyMainBlock({
  moduleInfo,
}: Props) {
  const {
    comment,
    mathModule,
    headers,
  } = moduleInfo;

  console.log('moduleInfo', moduleInfo);

  return (
    <Fragment>
      <MathModuleBlockWrapper
        mathModule={mathModule || {}} />
      <ModuleTableWrapper
        headers={headers || []} />
      <CommentBlockWrapper
        comment={comment || {}} />
    </Fragment>
  );
}

export default InvestStrategyMainBlock;

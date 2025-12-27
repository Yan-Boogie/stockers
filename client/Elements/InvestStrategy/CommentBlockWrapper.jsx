// @flow

import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';
import CommentBlock from './CommentBlock';
import { CommentInitDataContext } from '../../Constant/context';

const MOCK = {
  blocks: [
    {
      id: '12dde25f-4578-470b-9943-b0c3b0fa85aa',
      meta: {
        GRIDS: [
          {
            name: '存貨',
            rowId: 'header',
            columnId: 2,
          },
          {
            name: '折舊費用',
            rowId: 'header',
            columnId: 3,
          },
        ],
      },
      type: 'GRID',
      content: '',
    },
    {
      id: 'a9dd5f05-1d50-4cb2-934e-f81fc682361b',
      meta: {},
      type: 'TEXT',
      content: 'adsfasdf:asdfsafdasdfdsfsdafasfdsdfsdfasfshifsjkfhskjfhjkshfkjh'
    },
    {
      id: '7e66351d-f629-4472-a796-10ec368ce36f',
      meta: {},
      type: 'LINE',
      content: '',
    },
  ],
};

function CommentBlockWrapper({
  comment,
}: {
  comment: {},
}) {
  const [contextProviderData, setContextProviderData] = useState();

  useEffect(() => {
    setContextProviderData(MOCK);
  }, [comment]);

  const updateCommentInitData = useCallback((data) => {
    setContextProviderData(data);
  }, []);

  return (
    <CommentInitDataContext.Provider value={contextProviderData}>
      <CommentBlock
        updateCommentInitData={updateCommentInitData} />
    </CommentInitDataContext.Provider>
  );
}

export default CommentBlockWrapper;

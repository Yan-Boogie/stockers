// @flow

import uuid from 'uuid/v4';
import { BLOCK_TYPES } from '../../Constant/ArtiboxEditor/types';

import Actions from '../../Constant/ArtiboxEditor/actions';

export function initializer(initialArg = { blocks: [] }) {
  return {
    ...initialArg,
    blocks: [
      ...initialArg.blocks.map(block => ({
        ...block,
        focus: false,
        loaded: false,
      })),
    ],
  };
}

export default function reducer(state, action) {
  switch (action.type) {
    case Actions.LOADED: {
      const updateIndex = state.blocks.findIndex(block => action.id === block.id);

      if (~updateIndex) {
        return {
          ...state,
          blocks: [
            ...state.blocks.slice(0, updateIndex),
            {
              ...state.blocks[updateIndex],
              loaded: true,
            },
            ...state.blocks.slice(updateIndex + 1),
          ],
        };
      }

      return state;
    }
    case Actions.NEW_LINE: {
      if (action.at) {
        const currentIndex = state.blocks.findIndex(block => block.id === action.at);

        if (~currentIndex) {
          return {
            ...state,
            blocks: [
              ...state.blocks.slice(0, currentIndex + 1).map(block => (block.focus ? {
                ...block,
                focus: false,
              } : block)),
              {
                id: uuid(),
                type: BLOCK_TYPES.TEXT,
                content: '',
                meta: {},
                focus: true,
              },
              ...state.blocks.slice(currentIndex + 1).map(block => (block.focus ? {
                ...block,
                focus: false,
              } : block)),
            ],
          };
        }
      }

      return {
        ...state,
        blocks: [
          ...state.blocks.map(block => (block.focus ? {
            ...block,
            focus: false,
          } : block)),
          {
            id: uuid(),
            type: BLOCK_TYPES.TEXT,
            content: '',
            meta: {},
            focus: true,
          },
        ],
      };
    }

    case Actions.NEW_GRID: {
      return {
        ...state,
        blocks: [
          ...state.blocks.map(block => (block.focus ? {
            ...block,
            focus: false,
          } : block)),
          {
            id: uuid(),
            type: BLOCK_TYPES.GRID,
            content: '',
            meta: {
              GRIDS: [{
                rowId: action.gridInfo.rowId,
                columnId: action.gridInfo.columnId,
                name: action.gridInfo.name,
              }],
            },
            focus: true,
          },
        ],
      };
    }

    case Actions.ADD_GRID_INFO: {
      const blockIndex = state.blocks.findIndex(block => block.id === action.id);

      return {
        ...state,
        blocks: [
          ...state.blocks.slice(0, blockIndex),
          {
            ...state.blocks[blockIndex],
            meta: {
              GRIDS: [
                ...(state.blocks[blockIndex].meta.GRIDS || []),
                {
                  rowId: action.gridInfo.rowId,
                  columnId: action.gridInfo.columnId,
                  name: action.gridInfo.name,
                },
              ],
            },
          },
          ...state.blocks.slice(blockIndex + 1),
        ],
      };
    }

    case Actions.REMOVE_GRID_INFO: {
      const blockIndex = state.blocks.findIndex(block => block.id === action.id);

      if (state.blocks[blockIndex].meta.GRIDS.length === 1) {
        return {
          ...state,
          blocks: [
            ...state.blocks.slice(0, blockIndex),
            ...state.blocks.slice(blockIndex + 1),
          ],
        };
      }

      return {
        ...state,
        blocks: [
          ...state.blocks.slice(0, blockIndex),
          {
            ...state.blocks[blockIndex],
            meta: {
              GRIDS: [
                ...state.blocks[blockIndex].meta.GRIDS.slice(0, action.gridIndex),
                ...state.blocks[blockIndex].meta.GRIDS.slice(action.gridIndex + 1),
              ],
            },
          },
          ...state.blocks.slice(blockIndex + 1),
        ],
      };
    }

    case Actions.UPDATE_META_AND_CONTENT: {
      const updateIndex = state.blocks.findIndex(block => block.id === action.id);

      if (~updateIndex) {
        const targetBlock = state.blocks[updateIndex];

        return {
          ...state,
          blocks: [
            ...state.blocks.slice(0, updateIndex),
            {
              ...targetBlock,
              content: action.content,
            },
            ...state.blocks.slice(updateIndex + 1),
          ],
        };
      }

      return state;
    }

    case Actions.FOCUS: {
      return {
        ...state,
        blocks: [
          ...state.blocks.map((block) => {
            if (block.id === action.id) {
              return {
                ...block,
                focus: true,
              };
            }

            return {
              ...block,
              focus: false,
            };
          }),
        ],
      };
    }

    case Actions.REMOVE_BLOCK: {
      const removeId = state.blocks.findIndex(block => block.id === action.id);

      if (~removeId) {
        return {
          ...state,
          blocks: [
            ...state.blocks.slice(0, removeId),
            ...state.blocks.slice(removeId + 1),
          ],
        };
      }

      return state;
    }

    case Actions.CHANGE_TYPE: {
      return {
        ...state,
        blocks: [
          ...state.blocks.map(block => ((block.id === action.id) ? {
            ...block,
            type: (action.newType === block.type) ? BLOCK_TYPES.TEXT : action.newType,
          } : block)),
        ],
      };
    }

    case Actions.SET_METADATA: {
      const updateIndex = state.blocks.findIndex(block => action.id === block.id);

      if (~updateIndex) {
        return {
          ...state,
          blocks: [
            ...state.blocks.slice(0, updateIndex),
            {
              ...state.blocks[updateIndex],
              meta: {
                ...state.blocks[updateIndex].meta,
                ...action.meta,
              },
            },
            ...state.blocks.slice(updateIndex + 1),
          ],
        };
      }

      return state;
    }

    default:
      return state;
  }
}

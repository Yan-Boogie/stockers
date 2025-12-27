// @flow

export const BLOCK_TYPES = {
  LINE: Symbol('Artibox/Block/LINE'),
  TITLE: Symbol('Artibox/Block/TITLE'),
  SUBTITLE: Symbol('Artibox/Block/SUBTITLE'),
  TEXT: Symbol('Artibox/Block/TEXT'),
  GRID: Symbol('Artibox/Block/GRID'),
  HIGHLIGHT_AREA: Symbol('Artibox/Block/HIGHLIGHT_AREA'),
};

export const BLOCK_NAMES = {
  [BLOCK_TYPES.LINE]: 'LINE',
  [BLOCK_TYPES.TEXT]: 'TEXT',
  [BLOCK_TYPES.TITLE]: 'TITLE',
  [BLOCK_TYPES.SUBTITLE]: 'SUBTITLE',
  [BLOCK_TYPES.GRID]: 'GRID',
  [BLOCK_TYPES.HIGHLIGHT_AREA]: 'HIGHLIGHT_AREA',
};

export const MARKER_TYPES = {
  HIGHLIGHT: Symbol('Artibox/Marker/HIGHLIGHT'),
  BOLD: Symbol('Artibox/Marker/BOLD'),
  ITALIC: Symbol('Artibox/Marker/ITALIC'),
  ERASE: Symbol('Artibox/Marker/ERASE'),
};

export const MARKER_NAMES = {
  [MARKER_TYPES.HIGHLIGHT]: 'HIGHLIGHT',
  [MARKER_TYPES.BOLD]: 'BOLD',
  [MARKER_TYPES.ITALIC]: 'ITALIC',
};

export default null;

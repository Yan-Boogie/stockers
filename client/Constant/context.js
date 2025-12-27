// @flow

import React from 'react';

import EventEmitter from 'events';
import {
  HEAVY,
  LIGHT,
} from './wishHeatLevels';

export const ModuleDataContext = React.createContext([]);

export const ErrorHandlerContext = React.createContext({
  errorHub: new EventEmitter(),
  ERROR: Symbol('Error'),
});

export const MessageHandlerContext = React.createContext({
  messageHub: new EventEmitter(),
  MESSAGE: Symbol('Message'),
});

export const MathInitDataContext = React.createContext({});

export const CommentInitDataContext = React.createContext({});

export const HeaderBlockAllValuesContext = React.createContext([[], () => {}]);

export const SimulationDataContext = React.createContext([]);

export default null;

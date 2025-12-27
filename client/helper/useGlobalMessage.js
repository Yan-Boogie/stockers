// @flow

import {
  useContext,
  useCallback,
} from 'react';
import {
  ErrorHandlerContext,
  MessageHandlerContext,
} from '../Constant/context';

export function useGlobalErrorMessage() {
  const { ERROR, errorHub } = useContext(ErrorHandlerContext);

  const showError = useCallback(message => errorHub.emit(ERROR, message), [errorHub, ERROR]);

  return showError;
}

export function useGlobalMessage() {
  const { MESSAGE, messageHub } = useContext(MessageHandlerContext);

  const showMessage = useCallback(message => (
    messageHub.emit(MESSAGE, message)
  ), [messageHub, MESSAGE]);

  return showMessage;
}

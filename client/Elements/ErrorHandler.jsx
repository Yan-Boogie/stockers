// @flow
/** @jsx jsx */

import {
  Fragment,
  useMemo,
  useEffect,
} from 'react';
import { jsx } from '@emotion/core';
import EventEmitter from 'events';
import { NOTIFICATION_INDEX } from '../Constant/zIndex';
import { ErrorHandlerContext } from '../Constant/context';
import useMessage, { APPEND, REMOVE } from '../helper/useMessage';

const styles = {
  wrapper: {
    position: 'fixed',
    zIndex: NOTIFICATION_INDEX,
    width: '100%',
    height: 'auto',
    top: 0,
    left: 0,
  },
  message: {
    margin: 0,
    backgroundColor: Colors.ERROR,
    color: '#fff',
    fontWeight: 400,
    fontSize: 15,
    textAlign: 'center',
    width: '100%',
    lineHeight: 2,
    opacity: 1,
    height: 30,
    position: 'relative',
    transform: 'translate(0, 0)',
    transition: 'opacity 0.24s ease-out, height 0.24s ease-out, transform 0.24s ease-out',
  },
  messageMissing: {
    opacity: 0,
    transform: 'translate(0, -30px)',
    height: 0,
  },
};

const ERROR_DISPLAY_TIME = 3000;

function ErrorHandler({
  children,
}: {
  children: Node,
}) {
  const errorHub = useMemo(() => new EventEmitter(), []);
  const ERROR = useMemo(() => Symbol('GlobalError'), []);
  const timeoutMap = useMemo(() => new Map(), []);

  const [errorStack, dispatch] = useMessage();

  useEffect(() => {
    function onError(errorMessage) {
      const error = {
        id: Date.now(),
        message: errorMessage,
        createdAt: Date.now(),
      };

      dispatch({
        type: APPEND,
        item: error,
      });

      timeoutMap.set(error, setTimeout(
        () => dispatch({
          type: REMOVE,
          item: error,
        }),
        ERROR_DISPLAY_TIME + 1000,
      ));
    }

    errorHub.on(ERROR, onError);

    return () => {
      errorHub.removeListener(ERROR, onError);
    };
  }, [errorHub, ERROR, timeoutMap, dispatch]);

  return (
    <Fragment>
      <div style={styles.wrapper}>
        {errorStack.slice(0, 2).map((error, index) => (
          <p
            key={error.id}
            css={[
              styles.message,
              { zIndex: index },
              ((Date.now() - error.createdAt) > ERROR_DISPLAY_TIME)
                && styles.messageMissing,
            ]}>
            {error.message}
          </p>
        ))}
      </div>
      <ErrorHandlerContext.Provider
        value={{
          errorHub,
          ERROR,
        }}>
        {children}
      </ErrorHandlerContext.Provider>
    </Fragment>
  );
}

export default ErrorHandler;

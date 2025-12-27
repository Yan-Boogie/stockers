// @flow
/** @jsx jsx */

import {
  PureComponent,
  Fragment,
} from 'react';
import { jsx } from '@emotion/core';
import EventEmitter from 'events';
import { MessageHandlerContext } from '../Constant/context';
import { SECONDARY_NOTIFICATION_INDEX } from '../Constant/zIndex';

type Props = {
  children: Node,
};

const styles = {
  wrapper: {
    position: 'fixed',
    zIndex: SECONDARY_NOTIFICATION_INDEX,
    width: '100%',
    height: 'auto',
    top: 0,
    left: 0,
  },
  message: {
    margin: 0,
    backgroundColor: Colors.MAIN,
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

class MessageHandler extends PureComponent<Props> {
  static MESSAGE_DISPLAY_TIME = 3000

  constructor(props) {
    super(props);

    this.counter = 0;
    this.timeoutMap = {};

    this.onMessage = (message) => {
      const { messageStack } = this.state;

      this.counter += 1;

      const id = this.counter;

      this.setState({
        messageStack: [
          {
            id,
            message,
            createdAt: Date.now(),
          },
          ...messageStack,
        ],
      });

      this.timeoutMap[id] = setTimeout(
        this.makeMessageClear(id),
        MessageHandler.MESSAGE_DISPLAY_TIME + 1000,
      );
    };
  }

  state = {
    messageStack: [],
    messageHub: new EventEmitter(),
    MESSAGE: Symbol('GLOBAL_MESSAGE'),
  }

  componentDidMount() {
    const {
      messageHub,
      MESSAGE,
    } = this.state;

    messageHub.on(MESSAGE, this.onMessage);

    this.animationInterval = setInterval(() => {
      const { messageStack } = this.state;

      if (messageStack.length) {
        this.forceUpdate();
      }
    }, 1000);
  }

  componentWillUnmount() {
    const {
      messageHub,
      MESSAGE,
    } = this.state;

    messageHub.removeListener(MESSAGE, this.onMessage);

    clearInterval(this.animationInterval);
  }

  makeMessageClear(id) {
    return () => {
      const { messageStack } = this.state;
      const index = messageStack.findIndex(err => err.id === id);

      if (~index) {
        this.setState({
          messageStack: [
            ...messageStack.slice(0, index),
            ...messageStack.slice(index + 1),
          ],
        });
      }
    };
  }

  render() {
    const { children } = this.props;

    const {
      messageHub,
      messageStack,
      MESSAGE,
    } = this.state;

    return (
      <Fragment>
        <div style={styles.wrapper}>
          {messageStack.slice(0, 2).map((msg, index) => (
            <p
              key={msg.id}
              css={[
                styles.message,
                { zIndex: index },
                ((Date.now() - msg.createdAt) > MessageHandler.MESSAGE_DISPLAY_TIME)
                  && styles.messageMissing,
              ]}>
              {msg.message}
            </p>
          ))}
        </div>
        <MessageHandlerContext.Provider
          value={{
            messageHub,
            MESSAGE,
          }}>
          {children}
        </MessageHandlerContext.Provider>
      </Fragment>
    );
  }
}

export default MessageHandler;

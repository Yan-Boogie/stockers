// @flow

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import type { ApolloClient } from 'apollo-client';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';
import MessageHandler from './Elements/MessageHandler';
import ErrorHandler from './Elements/ErrorHandler';

// Root Pages
import RegisterPage from './Pages/Auth/RegisterPage';
import LoginPage from './Pages/Auth/LoginPage';
import MainBoard from './Pages/MainBoard';
import BreadCrumb from './Elements/BreadCrumb/BreadCrumb';

const styles = {
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
};

function App({
  client,
}: {
  client: ApolloClient,
}) {
  return (
    <div style={styles.wrapper}>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <ConnectedRouter history={history}>
            <MessageHandler>
              <ErrorHandler>
                <Router>
                  <Switch>
                    <Route exact path="/breadCrumb" component={BreadCrumb} />
                    <Route exact path="/register" component={RegisterPage} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route path="/" component={MainBoard} />
                  </Switch>
                </Router>
              </ErrorHandler>
            </MessageHandler>
          </ConnectedRouter>
        </ApolloProvider>
      </Provider>
    </div>
  );
}

export default App;

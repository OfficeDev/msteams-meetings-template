import React from 'react';
import { createBrowserHistory, History } from 'history'
import { applyMiddleware, createStore, combineReducers, compose } from 'redux'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router'
import LandingPage from './LandingPage'
import { createAuthMiddleware } from './auth/middleware';
import MeetingPage from './MeetingPage';

const hist = createBrowserHistory();

const createRootReducer = (history : History<History.PoorMansUnknown>) => combineReducers({
  router: connectRouter(history),
});

const store = createStore(
  createRootReducer(hist),
  {},
  compose(
    applyMiddleware(
      routerMiddleware(hist),
      createAuthMiddleware()
    )
  )
)


function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={hist}>
        <Switch>
          <Route exact path="/createEvent" component={MeetingPage} />
          <Route component={LandingPage} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;

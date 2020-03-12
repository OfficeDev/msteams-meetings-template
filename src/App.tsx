import React from 'react';
import { createBrowserHistory, History } from 'history'
import { applyMiddleware, createStore, combineReducers, compose } from 'redux'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router'
import LandingPage from './LandingPage'
import { createAuthMiddleware } from './auth/middleware';
import MeetingPage from './MeetingPage';
import { createRootReducer } from './RootReducer'
import { createMeetingMiddleware } from './meeting-creator/middleware';
import CopyMeetingPage from './CopyMeetingPage';

const hist = createBrowserHistory();

const store = createStore(
  createRootReducer(hist),
  compose(
    applyMiddleware(
      routerMiddleware(hist),
      createAuthMiddleware(),
      createMeetingMiddleware()
    )
  )
)


function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={hist}>
        <Switch>
          <Route exact path="/createEvent" component={MeetingPage} />
          <Route exact path="/copyMeeting" component={CopyMeetingPage} />
          <Route component={LandingPage} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;

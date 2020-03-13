import React from 'react';
import { createBrowserHistory } from 'history'
import { applyMiddleware, createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import { ConnectedRouter, routerMiddleware } from 'connected-react-router'
import SigninPage from './SigninPage'
import { createAuthMiddleware } from './auth/middleware';
import MeetingPage from './MeetingPage';
import { createRootReducer } from './RootReducer'
import { createMeetingMiddleware } from './meeting-creator/middleware';
import CopyMeetingPage from './CopyMeetingPage';
import CreateLandingPage from './CreateLandingPage';
import ErrorPage from './ErrorPage';

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
          <Route exact path="/signin" component={SigninPage} />
          <Route exact path="/createMeeting" component={MeetingPage} />
          <Route exact path="/copyMeeting" component={CopyMeetingPage} />
          <Route exact path="/error" component={ErrorPage} />
          <Route component={CreateLandingPage} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;

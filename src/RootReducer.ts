import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { MeetingState } from './meeting-creator/state';
import { meetingReducer } from './meeting-creator/reducers';

export interface AppState {
  meeting: MeetingState;
  router: History<unknown>;
}

export function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    meeting: meetingReducer
  });
}

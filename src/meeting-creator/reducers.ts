import { MeetingState } from './state';
import { SET_MEETING_COMMAND, MeetingAction, MEETING_CREATED_EVENT, CREATE_MEETING_COMMAND } from './actions'
import _ from 'lodash';
import { createDefaultMeetingInput } from './models';
import { LOCATION_CHANGE, LocationChangeAction, LocationChangePayload } from 'connected-react-router';

const loadInitialState = () => {
    return {
        inputMeeting: createDefaultMeetingInput(),
        creationInProgress: false
    } as MeetingState
}

export const meetingReducer = (state: MeetingState, action : MeetingAction | LocationChangeAction<LocationChangePayload>) => {
    if (!state) return loadInitialState();
    switch (action.type)
    {
        case SET_MEETING_COMMAND:
            return {
                ...state,
                inputMeeting: _.cloneDeep(action.meeting),
            }
        case CREATE_MEETING_COMMAND: 
            return {
                ...state,
                creationInProgress: true
            }
        case MEETING_CREATED_EVENT:
            return {
                ...state,
                createdMeeting: action.meeting
            }
        case LOCATION_CHANGE:
            if (action.payload.location.pathname === "/createMeeting") {
                return {
                    ...state, 
                    creationInProgress: false
                }
            }
            // falls through
        default: 
            return state;
    }
};
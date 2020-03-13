import { MeetingState } from './state';
import { SET_MEETING_COMMAND, MeetingAction, MEETING_CREATED_EVENT } from './actions'
import _ from 'lodash';
import { createDefaultMeetingInput } from './models';

const loadInitialState = () => {
    return {
        inputMeeting: createDefaultMeetingInput(),
    } as MeetingState
}

export const meetingReducer = (state: MeetingState, action : MeetingAction) => {
    if (!state) return loadInitialState();
    switch (action.type)
    {
        case SET_MEETING_COMMAND:
            return {
                ...state,
                inputMeeting: _.cloneDeep(action.meeting),
            }
        case MEETING_CREATED_EVENT:
            return {
                ...state,
                createdMeeting: action.meeting
            }
        default: 
            return state;
    }
};
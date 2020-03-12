import { MeetingState } from './state';
import { SET_MEETING_COMMAND, MeetingAction, MEETING_CREATED_EVENT } from './actions'
import moment from 'moment';
import * as _ from 'lodash';

const loadInitialState = () => {
    return {
        inputMeeting: {
            subject: "",
            endDateTime: moment().startOf('hour').add(1, 'hour'),
            startDateTime: moment().startOf('hour').subtract(1, 'hour'),
            allDay: false
        }
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
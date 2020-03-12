import { MeetingState } from './state';
import { SET_MEETING_COMMAND, MeetingAction } from './actions'
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
            console.log('Changing meeting', JSON.stringify(action.meeting));
            return {
                ...state,
                inputMeeting: _.cloneDeep(action.meeting),
            }
        default: 
            return state;
    }
};
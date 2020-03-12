import { Middleware } from "redux";
import * as _ from 'lodash';

import { CREATE_MEETING_COMMAND, MEETING_CREATED_EVENT } from "./actions";
import { createMeetingService } from "./service";
import { MeetingState } from "./state";
import { push } from "connected-react-router";


export function createMeetingMiddleware() : Middleware
{
    const service = createMeetingService();

    return store => next => action => {

        if (action.type === CREATE_MEETING_COMMAND) {
            service.createMeeting(action.meeting).then(meeting => {
                store.dispatch({
                    type: MEETING_CREATED_EVENT,
                    meeting
                })
            })
        }

        if (action.type === MEETING_CREATED_EVENT) {
            store.dispatch(push("/copyMeeting"))
        }
        next(action);
    }
}
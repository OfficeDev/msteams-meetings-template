import { Middleware } from "redux";
import * as _ from 'lodash';

import { CREATE_MEETING_COMMAND } from "./actions";
import { createMeetingService } from "./service";
import { MeetingState } from "./state";

interface StateShape {
    meeting: MeetingState
}

export function createMeetingMiddleware() : Middleware
{
    const service = createMeetingService();

    return store => next => action => {

        if (action.type === CREATE_MEETING_COMMAND) {
            service.createMeeting(action.meeting);
        }
        next(action);
    }
}
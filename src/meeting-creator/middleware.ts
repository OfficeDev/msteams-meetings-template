import { Middleware } from "redux";
import * as _ from 'lodash';
import { CREATE_MEETING_COMMAND, MEETING_CREATED_EVENT } from "./actions";
import { createMeetingService } from "./service";
import { push, replace } from "connected-react-router";


export function createMeetingMiddleware() : Middleware
{
    const service = createMeetingService();

    return store => next => action => {

        if (action.type === CREATE_MEETING_COMMAND) {
            service.createMeeting(action.meeting)
            .then(meeting => {
                store.dispatch({
                    type: MEETING_CREATED_EVENT,
                    meeting
                })
            })
            .catch(error => {
                console.error('Create meeting failed', error);
                if (action.fromPage !== "error") {
                    store.dispatch(push('/error'));
                }
            });
        }

        if (action.type === MEETING_CREATED_EVENT) {
            store.dispatch(push("/copyMeeting"))
        }
        next(action);
    }
}
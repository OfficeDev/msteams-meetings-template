import moment from "moment";
import { Moment } from "moment";

export interface OnlineMeetingInput {
    subject?: string,
    startDateTime: Moment,
    endDateTime: Moment,
}

export interface OnlineMeeting {
    id: string,
    joinWebUrl: string,
    subject: string,
    videoTeleconferenceId: string,
    creationDateTime: Moment,
    startDateTime: Moment,
    endDateTime: Moment,
    dialinUrl: string,
    conferenceId: string,
    tollNumber: string,
    tollFreeNumber: string,
}

export function createDefaultMeetingInput(): OnlineMeetingInput {
    return {
        subject: "",
        startDateTime: moment().startOf('hour').add(1, 'hour'),
        endDateTime: moment().startOf('hour').add(2, 'hour'),
    };
}
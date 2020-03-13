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
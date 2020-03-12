import { Moment } from "moment";

export interface OnlineMeetingInput {
    subject?: string
    startDateTime?: Moment
    endDateTime?: Moment,
    allDay: boolean
}

export interface OnlineMeeting {
    id: string
    joinWebUrl: string
    subject: string
    videoTeleconferenceId: string
    creationDateTime: Moment
    startDateTime: Moment
    endDateTime: Moment
}
import { OnlineMeetingInput, OnlineMeeting } from "./models"

export const SET_MEETING_COMMAND = "SetMeetingCommand"
export interface SetMeetingCommand {
    type: typeof SET_MEETING_COMMAND,
    meeting: Partial<OnlineMeetingInput>,
}

export const CREATE_MEETING_COMMAND = "CreateMeetingCommand"
export interface CreateMeetingCommand {
    type: typeof CREATE_MEETING_COMMAND,
    fromPage: "meeting" | "error",
    meeting: OnlineMeetingInput,
}

export const MEETING_CREATED_EVENT = "MeetingCreatedEvent"
export interface MeetingCreatedEvent {
    type: typeof MEETING_CREATED_EVENT,
    meeting: OnlineMeeting,
}

export type MeetingAction = SetMeetingCommand | CreateMeetingCommand | MeetingCreatedEvent
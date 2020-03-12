import { OnlineMeetingInput } from "./models"

export const SET_MEETING_COMMAND = "SetMeetingCommand"
export interface SetMeetingCommand {
    type: typeof SET_MEETING_COMMAND,
    meeting: OnlineMeetingInput
}

export const CREATE_MEETING_COMMAND = "CreateMeetingCommand"
export interface CreateMeetingCommand {
    type: typeof CREATE_MEETING_COMMAND,
    meeting: OnlineMeetingInput
}

export type MeetingAction = SetMeetingCommand
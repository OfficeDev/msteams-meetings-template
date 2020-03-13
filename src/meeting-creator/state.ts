import { OnlineMeetingInput, OnlineMeeting } from './models'

export interface MeetingState {
    inputMeeting: OnlineMeetingInput
    createdMeeting?: OnlineMeeting,
    creationInProgress: boolean
};

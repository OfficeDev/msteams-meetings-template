import { OnlineMeetingInput } from "./models";

export function hasValidSubject(meeting : OnlineMeetingInput)
{
    return !!meeting.subject && 
        meeting.subject.length >= 0
}
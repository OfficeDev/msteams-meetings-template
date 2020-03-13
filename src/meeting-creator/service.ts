import { OnlineMeetingInput, OnlineMeeting } from "./models";
import { msalApp } from '../auth/msalApp'
import axios from 'axios'
import moment from 'moment'

export function createMeetingService() {    
    return {
        async createMeeting(meeting: OnlineMeetingInput) {
            let token;
            try {
                token = await msalApp.acquireTokenSilent({
                    scopes: [
                        'OnlineMeetings.ReadWrite'
                    ]
                });
            } catch (ex) {
                token = await msalApp.acquireTokenPopup({
                    scopes: [
                        'OnlineMeetings.ReadWrite'
                    ]
                })
            }
            
            const requestBody = {
                "startDateTime": meeting.startDateTime?.toISOString(),
                "endDateTime": meeting.endDateTime?.toISOString(),
                "subject": meeting.subject
            };
            console.log('POST body', requestBody);

            const response = await axios.post("https://graph.microsoft.com/v1.0/me/onlineMeetings", requestBody, {
                headers: {
                    'Authorization': `Bearer ${token.accessToken}`, 
                    'Content-type': 'application/json'
                }
            });

            const createdMeeting = {
                id: response.data.id,
                creationDateTime: moment(response.data.creationDateTime),
                subject: response.data.subject,
                joinUrl: response.data.joinUrl,
                joinWebUrl: response.data.joinWebUrl,
                startDateTime: moment(response.data.startDateTime),
                endDateTime: moment(response.data.endDateTime),
                conferenceId: response.data.audioConferencing?.conferenceId || '', 
                tollNumber: response.data.audioConferencing?.tollNumber || '',
                tollFreeNumber: response.data.audioConferencing?.tollFreeNumber || '',
                dialinUrl: response.data.audioConferencing?.dialinUrl || '',
                videoTeleconferenceId: response.data.videoTeleconferenceId,
            } as OnlineMeeting
            console.log('Created meeting', createdMeeting);
            
            return createdMeeting;
        }
    }
}
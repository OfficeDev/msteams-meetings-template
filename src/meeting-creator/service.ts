import { OnlineMeetingInput } from "./models";
import { msalApp } from '../auth/msalApp'
import axios from 'axios'

export function createMeetingService() {
    
    return {
        async createMeeting(meeting: OnlineMeetingInput) {
            console.log(JSON.stringify(meeting));
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
            
            console.log(token.accessToken);
            console.log('Post body', {
                "startDateTime": meeting.startDateTime?.toString(),
                "endDateTime": meeting.endDateTime?.toString(),
                "subject": meeting.subject
            });
            // await axios.post("https://graph.microsoft.com/beta/me/onlineMeetings", {
            //     "startDateTime": meeting.startDateTime?.toISOString(),
            //     "endDateTime": meeting.endDateTime?.toISOString(),
            //     "subject": meeting.subject
            // }, {
            //     headers: {
            //         'Authorization': `Bearer ${token.accessToken}`, 
            //         'Content-type': 'application/json'
            //     }
            // })
        }
    }
}
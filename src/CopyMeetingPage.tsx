import React from 'react';
import { Stack, Text, PrimaryButton, Link } from 'office-ui-fabric-react';
import { AppState } from './RootReducer'
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { OnlineMeeting } from './meeting-creator/models';
import { Header } from './components/header';


interface CopyMeetingPageProps {
  meeting?: OnlineMeeting,
  onCopyToClipboard: (meeting?: OnlineMeeting) => void,
}

const mapStateToProps = (state : AppState) => ({
  meeting: state.meeting.createdMeeting,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onCopyToClipboard: (meeting?: OnlineMeeting) => {
    const str = document.getElementById('copy')?.innerHTML || 'Failed to copy'
    function listener(e : ClipboardEvent) {
      if (!e || !e.clipboardData) { 
        return
      }
      e.clipboardData.setData("text/html", str);
      e.preventDefault();
    }
    document.addEventListener("copy", listener);
    document.execCommand("copy");
    document.removeEventListener("copy", listener);
  },
});

function CopyMeetingPageComponent(props: CopyMeetingPageProps) {
  return (
    <>
      <Header />
      <Stack
        className="container"
        verticalFill
        tokens={{
          childrenGap: 35
        }}>
        <Stack.Item align="center" className="meetingCardContainer">
          <svg className="meetingSuccess"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path d="M24 0c2.2 0 4.3.3 6.4.9 2 .6 3.9 1.4 5.7 2.4 1.8 1 3.4 2.3 4.9 3.8 1.5 1.5 2.7 3.1 3.8 4.9 1 1.8 1.8 3.7 2.4 5.7.6 2 .9 4.2.9 6.4s-.3 4.3-.9 6.3c-.6 2-1.4 3.9-2.4 5.7-1 1.8-2.3 3.4-3.8 4.9-1.5 1.5-3.1 2.7-4.9 3.8-1.8 1-3.7 1.9-5.7 2.4-2 .6-4.1.9-6.4.9-2.2 0-4.3-.3-6.3-.9-2-.6-3.9-1.4-5.7-2.4-1.8-1-3.4-2.3-4.9-3.8-1.5-1.5-2.7-3.1-3.8-4.9-1-1.8-1.9-3.7-2.4-5.7C.3 28.3 0 26.2 0 24s.3-4.3.9-6.4c.6-2 1.4-3.9 2.4-5.7 1-1.8 2.3-3.4 3.8-4.9 1.5-1.5 3.1-2.7 4.9-3.8 1.8-1 3.7-1.9 5.7-2.4S21.8 0 24 0zm7.9 17.1c-.6 0-1.2.2-1.6.7l-8.5 8.5-3-3c-.4-.4-1-.7-1.6-.7-.3 0-.6.1-.8.2-.3.1-.5.3-.7.5s-.4.4-.5.7c-.2.3-.2.5-.2.8 0 .6.2 1.2.7 1.6l4.6 4.6c.4.4 1 .7 1.6.7.6 0 1.2-.2 1.6-.7l10.1-10.1c.4-.5.7-1 .7-1.6 0-.3-.1-.6-.2-.8-.1-.3-.3-.5-.5-.7s-.4-.4-.7-.5c-.4-.2-.7-.2-1-.2z" fill="#599c00"/>
          </svg>

          <Text block variant="xLarge" className="meetingCardHeader">Meeting Created</Text>
          <Text block variant="medium" className="meetingCardSubHeader">A link to your meeting was automatically copied to your clipboard</Text>
          <div className="meetingCardBody" id="copy">
            <Link href={props.meeting?.joinWebUrl} className="teamsLink meetingCardUrl">Join Microsoft Teams Meeting</Link>
            
            {props.meeting?.dialinUrl && props.meeting?.tollNumber &&
              <div className="meetingCardDialInfo">
                <Link href={props.meeting?.dialinUrl} className="teamsLink">
                  <Text variant="medium">{props.meeting?.tollNumber}</Text>
                </Link>
              </div>
            }

            {props.meeting?.conferenceId &&
              <div className="meetingCardConfID">
                <Text>Conference ID: {props.meeting?.conferenceId}</Text>
              </div>
            }

            <div>
              <Link className="teamsLink" href="https://products.office.com/en-us/microsoft-teams/group-chat-software">Learn more about Teams</Link>
            </div>
          </div>
          <PrimaryButton 
            className="teamsButton copyButton"
            text="Copy"
            onClick={() => props.onCopyToClipboard(props.meeting)}
            ariaLabel="Copy Meeting"
          />
        </Stack.Item>
    </Stack>
  </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CopyMeetingPageComponent);

import React from 'react';
import { Stack, Text, FontWeights, PrimaryButton, Link, StackItem } from 'office-ui-fabric-react';
import { msalApp } from './auth';
import { AuthResponse } from 'msal';
import { AppState } from './RootReducer'
import { Dispatch } from 'redux';
import { OPEN_SIGNIN_DIALOG_COMMAND } from './auth/actions';
import { connect } from 'react-redux';
import { OnlineMeeting } from './meeting-creator/models';

const boldStyle = { root: { fontWeight: FontWeights.semibold } };

interface CopyMeetingPageProps {
  meeting: OnlineMeeting,
  onCopyToClipboard: (meeting?: OnlineMeeting) => {}
}

const mapStateToProps = (state : AppState) => ({
  meeting: state.meeting.createdMeeting
}) as Partial<CopyMeetingPageProps>;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onCopyToClipboard: (meeting?: OnlineMeeting) => {
    console.log('COPY THIS', meeting)
  },

}) as Partial<CopyMeetingPageProps>;

function CopyMeetingPageComponent(props: Partial<CopyMeetingPageProps>) {
  const onCopyToClipboard = props.onCopyToClipboard ?? (() => {});
  
  return (
    <Stack
    horizontalAlign="start"
    verticalAlign="center"
    verticalFill
    styles={{
      root: {
        width: '960px',
        margin: '0 auto',
        textAlign: 'center',
        color: '#605e5c'
      }
    }}
    tokens={{
      childrenGap: 35
    }}>
    <Text variant="medium" styles={boldStyle}>
      You're invited to join a Microsoft Teams meeting
    </Text>
    <Stack verticalFill horizontalAlign="start">
      <Link href={props.meeting?.joinWebUrl}><Text variant="xLargePlus">Join online now</Text></Link>
      <Text variant="medium">Video conferencing, screen sharing and more.</Text>
    </Stack>
    <Stack verticalFill horizontalAlign="start">
      <Text variant="medium" styles={boldStyle}>Join by phone (audio only)</Text>
      <Link href={props.meeting?.dialinUrl}><Text>{props.meeting?.tollNumber}</Text></Link>
      <Text>Phone conference ID: {props.meeting?.conferenceId}</Text>
    </Stack>
    <Stack horizontal horizontalAlign="start" tokens={{
      childrenGap: 12
    }}>
      <Link href="help">Help</Link> 
      <Text> | </Text>
      <Link href="meetingOptions">Meeting Options</Link>
    </Stack>
  <Text>{JSON.stringify(props.meeting, null, 2)}</Text>
    <PrimaryButton text="Copy to clipboard" onClick={() => onCopyToClipboard(props.meeting)}/>
  </Stack>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CopyMeetingPageComponent);

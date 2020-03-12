import React from 'react';
import { Stack, Text, FontWeights, PrimaryButton } from 'office-ui-fabric-react';
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
    horizontalAlign="center"
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
    <Text variant="xxLarge" styles={boldStyle}>
      Copy the meeting!
    </Text>
    <Text variant="large">Sign in to Microsoft Teams using your school account to get started.</Text>
  <Text>{JSON.stringify(props.meeting, null, 2)}</Text>
    <PrimaryButton text="Copy to clipboard" onClick={() => onCopyToClipboard(props.meeting)}/>
  </Stack>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CopyMeetingPageComponent);

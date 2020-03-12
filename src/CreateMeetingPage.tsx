import React from 'react';
import { Stack, Text, FontWeights, PrimaryButton } from 'office-ui-fabric-react';
import { msalApp } from './auth';
import { AuthResponse } from 'msal';
import { AppState } from './RootReducer'
import { Dispatch } from 'redux';
import { OPEN_SIGNIN_DIALOG_COMMAND } from './auth/actions';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

const boldStyle = { root: { fontWeight: FontWeights.semibold } };

interface CreateLandingPageProps {
  onNewMeeting: () => void
}

const mapStateToProps = (state : AppState) => ({

}) as Partial<CreateLandingPageProps>;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onNewMeeting: () => dispatch(push("/createEvent")),

}) as Partial<CreateLandingPageProps>;

function CreateLandingPageComponent(props: Partial<CreateLandingPageProps>) {
  const onNewMeeting = props.onNewMeeting ?? (() => {});
  
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
    <img
      src="https://statics.teams.microsoft.com/hashedassets-launcher/launcher_meetings_new.b2c45282207c2dff1f96b89f128a7e31.svg"
      alt="logo"
    />
    <Text variant="large">Schedule Teams meetings for your course.</Text>
    <PrimaryButton text="+ New Meeting" onClick={() => onNewMeeting()}/>
  </Stack>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateLandingPageComponent);

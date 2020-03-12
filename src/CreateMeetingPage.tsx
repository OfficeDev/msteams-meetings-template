import React from 'react';
import { Stack, Text, PrimaryButton } from 'office-ui-fabric-react';
import { AppState } from './RootReducer'
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

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
    className="container"
    horizontalAlign="center"
    verticalAlign="center"
    verticalFill
    tokens={{
      childrenGap: 35
    }}>
    <img
      className="splashImage"
      src="https://statics.teams.microsoft.com/hashedassets-launcher/launcher_meetings_new.b2c45282207c2dff1f96b89f128a7e31.svg"
      alt="logo"
    />
    <Text variant="large">Schedule Teams meetings for your course.</Text>
    <PrimaryButton className="teamsButton" text="+ New Meeting" onClick={() => onNewMeeting()}/>
  </Stack>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateLandingPageComponent);

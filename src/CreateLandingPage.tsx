import React from 'react';
import { Stack, Text, PrimaryButton } from 'office-ui-fabric-react';
import { AppState } from './RootReducer'
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { CHECK_FOR_SIGNEDIN_USER_COMMAND } from './auth/actions';
import { SET_MEETING_COMMAND, SetMeetingCommand } from './meeting-creator/actions';
import { Header } from './components/header';
import { createDefaultMeetingInput } from './meeting-creator/models';

interface CreateLandingPageProps {
  checkForSignedInUser: () => void;
  onNewMeeting: () => void
}

const mapStateToProps = (state : AppState) => ({
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  checkForSignedInUser: () => dispatch({
    type: CHECK_FOR_SIGNEDIN_USER_COMMAND,
  }),
  onNewMeeting: () => {
    dispatch({
      type: SET_MEETING_COMMAND,
      meeting: createDefaultMeetingInput(),
    } as SetMeetingCommand);
    dispatch(push("/createMeeting"))
  },
});

function CreateLandingPageComponent(props: CreateLandingPageProps) {
  // Check for a signed-in user and go to the signin page if there isn't one
  const checkForSignedInUser = props.checkForSignedInUser;
  React.useEffect(() => {
    checkForSignedInUser();
  }, []);
  
  return (
    <>
    <Header />
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
      <PrimaryButton 
        className="teamsButton"
        text="Create meeting link" 
        onClick={() => props.onNewMeeting()}
        ariaLabel="Create Meeting link"
      />
    </Stack>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateLandingPageComponent);

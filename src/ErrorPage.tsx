import React from 'react';
import { Stack, Text, FontWeights, PrimaryButton, DefaultButton } from 'office-ui-fabric-react';
import { AppState } from './RootReducer'
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { goBack } from 'connected-react-router';
import { OnlineMeetingInput } from './meeting-creator/models';
import { CREATE_MEETING_COMMAND, CreateMeetingCommand } from './meeting-creator/actions';

const semiboldStyle = { root: { fontWeight: FontWeights.semibold } };

interface ErrorPageProps {
  meeting: OnlineMeetingInput,
  goBack: () => void,
  createMeeting: (meeting: OnlineMeetingInput) => void,
}

const mapStateToProps = (state : AppState) => ({
  meeting: state.meeting.inputMeeting,
}) as Partial<ErrorPageProps>;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  goBack: () => dispatch(goBack()),
  createMeeting: (meeting: OnlineMeetingInput) => {
    dispatch({
      type: CREATE_MEETING_COMMAND,
      fromPage: "error",
      meeting,
    } as CreateMeetingCommand)
  }
}) as Partial<ErrorPageProps>;

function ErrorPageComponent(props: Partial<ErrorPageProps>) {
  const goBack = props.goBack ?? (() => {});

  function createMeeting(meeting?: OnlineMeetingInput)
  {
    if (!meeting) {
      console.warn("Meeting is undefined, ignoring input");
      return;
    }

    const createMeeting = props.createMeeting || (() => {})
    createMeeting(meeting);
  }

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
      <Text variant="xxLarge" styles={semiboldStyle}>
        Oops! Your meeting wasn't created successfully.
      </Text>
      <Text variant="large" className="uTextCenter">
        Please try again. If the problem persists, check with your IT administrator to ensure you have the proper permissions.
      </Text>
      <Stack horizontal tokens={{childrenGap: 10}}>
        <DefaultButton className="teamsButtonInverted" text="Back" onClick={(event) => goBack()} />
        <PrimaryButton className="teamsButton" primary text="Try again" onClick={(event) => createMeeting(props.meeting)} />
      </Stack>
    </Stack>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorPageComponent);

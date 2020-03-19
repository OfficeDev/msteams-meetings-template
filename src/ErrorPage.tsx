import React from 'react';
import { Stack, Text, FontWeights, PrimaryButton, DefaultButton } from 'office-ui-fabric-react';
import { AppState } from './RootReducer'
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { goBack, replace } from 'connected-react-router';
import { OnlineMeetingInput } from './meeting-creator/models';
import { CREATE_MEETING_COMMAND, CreateMeetingCommand } from './meeting-creator/actions';
import { Header } from './components/header';
import errorImage from './images/genericError.svg';

const semiboldStyle = { root: { fontWeight: FontWeights.semibold } };

interface ErrorPageProps {
  meeting: OnlineMeetingInput,
  goBack: () => void,
  retryCreateMeeting: (meeting: OnlineMeetingInput) => void,
}

const mapStateToProps = (state : AppState) => ({
  meeting: state.meeting.inputMeeting,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  goBack: () => dispatch(goBack()),
  retryCreateMeeting: (meeting: OnlineMeetingInput) => {
    dispatch(replace('/createMeeting'));
    dispatch({
      type: CREATE_MEETING_COMMAND,
      meeting,
    } as CreateMeetingCommand);
  }
});

function ErrorPageComponent(props: ErrorPageProps) {
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
          src={errorImage}
          alt="Error graphic"
        />
        <Text variant="xxLarge" styles={semiboldStyle}>
          Oops! Your meeting wasn't created successfully.
        </Text>
        <Text variant="large" className="uTextCenter">
          Please try again. If the problem persists, check with your IT administrator to ensure you have the proper permissions.
        </Text>
        <Stack horizontal tokens={{childrenGap: 10}}>
          <DefaultButton
            className="teamsButtonInverted"
            text="Back"
            onClick={() => props.goBack()} 
            ariaLabel="Back to last screen"
          />
          <PrimaryButton
            className="teamsButton"
            primary text="Try again" 
            onClick={() => props.retryCreateMeeting(props.meeting)} 
            ariaLabel="Try again"
          />
        </Stack>
      </Stack>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorPageComponent);

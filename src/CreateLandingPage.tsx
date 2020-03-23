import React from 'react';
import { Stack, Text, PrimaryButton, FontWeights } from 'office-ui-fabric-react';
import { AppState } from './RootReducer'
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { CHECK_FOR_SIGNEDIN_USER_COMMAND } from './auth/actions';
import { SET_MEETING_COMMAND, SetMeetingCommand } from './meeting-creator/actions';
import { Header } from './components/header';
import { createDefaultMeetingInput } from './meeting-creator/models';
import { FormattedMessage } from 'react-intl';
import { translate } from './localization/translate';

import calendar from './images/calendar.svg';

const boldStyle = { root: { fontWeight: FontWeights.semibold } };


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
  });
  
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
        src={calendar}
        alt={translate('createLandingPage.splash.altText')}
      />
      <Text variant="large" styles={boldStyle}>
        <FormattedMessage id="createLandingPage.schedule.header" />
      </Text>
      <Text variant="medium" >
        <FormattedMessage id="createLandingPage.subheader" />
      </Text>
      <PrimaryButton 
        className="teamsButton"
        onClick={() => props.onNewMeeting()}
        ariaLabel={translate('createLandingPage.create.meeting.ariaLabel')}
      >
        <FormattedMessage id="createLandingPage.create.meeting" />
      </PrimaryButton>
    </Stack>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateLandingPageComponent);

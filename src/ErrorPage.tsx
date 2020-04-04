import React from 'react';
import {
  Stack,
  Text,
  FontWeights,
  PrimaryButton,
  DefaultButton
} from 'office-ui-fabric-react';
import { AppState } from './RootReducer';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { goBack, replace } from 'connected-react-router';
import { OnlineMeetingInput } from './meeting-creator/models';
import {
  CREATE_MEETING_COMMAND,
  CreateMeetingCommand
} from './meeting-creator/actions';
import { Header } from './components/header';
import errorImage from './images/genericError.svg';
import { FormattedMessage } from 'react-intl';
import { translate } from './localization/translate';

const boldStyle = { root: { fontWeight: FontWeights.semibold } };

interface ErrorPageProps {
  meeting: OnlineMeetingInput;
  goBack: () => void;
  retryCreateMeeting: (meeting: OnlineMeetingInput) => void;
}

const mapStateToProps = (state: AppState) => ({
  meeting: state.meeting.inputMeeting
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  goBack: () => dispatch(goBack()),
  retryCreateMeeting: (meeting: OnlineMeetingInput) => {
    dispatch(replace('/createMeeting'));
    dispatch({
      type: CREATE_MEETING_COMMAND,
      meeting
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
        }}
      >
        <img
          className="splashImage"
          src={errorImage}
          alt={translate('errorPage.splash.altText')}
          />
        <Text variant="xLargePlus" styles={boldStyle}>
          <FormattedMessage id="errorPage.heading" />
        </Text>
        <Text variant="medium" className="uTextCenter">
          <FormattedMessage id="errorPage.subheading" />
        </Text>
        <Stack horizontal tokens={{ childrenGap: 10 }}>
          <DefaultButton
            className="teamsButtonInverted"
            onClick={() => props.goBack()}
            ariaLabel={translate('errorPage.back.ariaLabel')}
          >
            <FormattedMessage id="errorPage.back" />
          </DefaultButton>
          <PrimaryButton
            className="teamsButton"
            onClick={() => props.retryCreateMeeting(props.meeting)}
            ariaLabel={translate('errorPage.try.again')}
          >
            <FormattedMessage id="errorPage.try.again" />
          </PrimaryButton>
        </Stack>
      </Stack>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorPageComponent);

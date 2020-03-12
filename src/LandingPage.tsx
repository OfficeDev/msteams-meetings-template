import React from 'react';
import { Stack, Text, FontWeights, PrimaryButton } from 'office-ui-fabric-react';
import { AppState } from './RootReducer'
import { Dispatch } from 'redux';
import { OPEN_SIGNIN_DIALOG_COMMAND } from './auth/actions';
import { connect } from 'react-redux';

import './index.css';

const boldStyle = { root: { fontWeight: FontWeights.semibold } };

interface LandingPageProps {
  onSignIn: () => void
}

const mapStateToProps = (state : AppState) => ({

}) as Partial<LandingPageProps>;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSignIn: () => dispatch({
    type: OPEN_SIGNIN_DIALOG_COMMAND
  }),

}) as Partial<LandingPageProps>;

function LandingPageComponent(props: Partial<LandingPageProps>) {
  const onSignIn = props.onSignIn ?? (() => {});
  
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
    <Text variant="xxLarge" styles={boldStyle}>
      Welcome to Microsoft Teams
    </Text>
    <Text variant="large" className="uTextCenter">Sign in to Microsoft Teams using your school account to get started.</Text>
    <PrimaryButton className="teamsButton" text="Sign in" onClick={() => onSignIn()}/>
  </Stack>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPageComponent);

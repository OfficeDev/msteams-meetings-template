import React from 'react';
import { Stack, Text, FontWeights, PrimaryButton } from 'office-ui-fabric-react';
import { AppState } from './RootReducer'
import { Dispatch } from 'redux';
import { OPEN_SIGNIN_DIALOG_COMMAND } from './auth/actions';
import { connect } from 'react-redux';
import signInImage from './images/signin.svg';
import { FormattedMessage } from 'react-intl';
import { translate } from './localization/translate';

import './index.css';

const boldStyle = { root: { fontWeight: FontWeights.semibold } };

interface SigninPageProps {
  onSignIn: () => void;
}

const mapStateToProps = (state : AppState) => ({
}) as Partial<SigninPageProps>;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSignIn: () => dispatch({
    type: OPEN_SIGNIN_DIALOG_COMMAND
  }),
}) as Partial<SigninPageProps>;

function SigninPageComponent(props: Partial<SigninPageProps>) {
  const onSignIn = props.onSignIn ?? (() => {});

  return (
    <>
    <div className="microsoftLogo">
      <svg xmlns="http://www.w3.org/2000/svg" width="108" height="24">
        <path d="M44.836 4.6v13.8h-2.4V7.583H42.4L38.119 18.4h-1.588L32.142 7.583h-.029V18.4H29.9V4.6h3.436L37.3 14.83h.058L41.545 4.6zm2 1.049a1.268 1.268 0 01.419-.967 1.413 1.413 0 011-.39 1.392 1.392 0 011.02.4 1.3 1.3 0 01.4.958 1.248 1.248 0 01-.414.953 1.428 1.428 0 01-1.01.385A1.4 1.4 0 0147.25 6.6a1.261 1.261 0 01-.409-.948M49.41 18.4h-2.329V8.507h2.329zm7.064-1.694a3.213 3.213 0 001.145-.241 4.811 4.811 0 001.155-.635V18a4.665 4.665 0 01-1.266.481 6.886 6.886 0 01-1.554.164 4.707 4.707 0 01-4.918-4.908 5.641 5.641 0 011.4-3.932 5.055 5.055 0 013.955-1.545 5.414 5.414 0 011.324.168 4.431 4.431 0 011.063.39v2.233a4.763 4.763 0 00-1.1-.611 3.184 3.184 0 00-1.15-.217 2.919 2.919 0 00-2.223.9 3.37 3.37 0 00-.847 2.416 3.216 3.216 0 00.813 2.338 2.936 2.936 0 002.209.837m8.92-8.371a2.952 2.952 0 01.5.039 2.1 2.1 0 01.375.1v2.358a2.04 2.04 0 00-.534-.255 2.646 2.646 0 00-.852-.12 1.808 1.808 0 00-1.448.722 3.467 3.467 0 00-.592 2.223v4.99h-2.324V8.507h2.329v1.559h.038a2.729 2.729 0 01.963-1.266 2.611 2.611 0 011.545-.457m1 5.254a5.358 5.358 0 011.392-3.887 5.1 5.1 0 013.85-1.434 4.742 4.742 0 013.623 1.381 5.212 5.212 0 011.3 3.729 5.257 5.257 0 01-1.386 3.83 5.019 5.019 0 01-3.772 1.424 4.935 4.935 0 01-3.652-1.352 4.987 4.987 0 01-1.349-3.688m2.425-.077a3.535 3.535 0 00.7 2.368 2.505 2.505 0 002.011.818 2.345 2.345 0 001.934-.818 3.783 3.783 0 00.664-2.425 3.651 3.651 0 00-.688-2.411 2.389 2.389 0 00-1.929-.813 2.44 2.44 0 00-1.988.852 3.707 3.707 0 00-.707 2.43m11.2-2.416a1 1 0 00.318.785 5.426 5.426 0 001.4.717 4.767 4.767 0 011.959 1.256 2.6 2.6 0 01.563 1.689 2.715 2.715 0 01-1.068 2.239 4.558 4.558 0 01-2.9.847 6.978 6.978 0 01-1.362-.149 6.047 6.047 0 01-1.265-.38v-2.29a5.733 5.733 0 001.367.7 4 4 0 001.328.26 2.365 2.365 0 001.164-.221.79.79 0 00.375-.741 1.029 1.029 0 00-.39-.813 5.768 5.768 0 00-1.477-.765 4.564 4.564 0 01-1.829-1.213 2.655 2.655 0 01-.539-1.713 2.706 2.706 0 011.063-2.2 4.243 4.243 0 012.765-.86 6.663 6.663 0 011.164.115 5.161 5.161 0 011.078.3v2.214a4.974 4.974 0 00-1.078-.529 3.6 3.6 0 00-1.222-.221 1.781 1.781 0 00-1.034.26.824.824 0 00-.371.712m5.241 2.493a5.358 5.358 0 011.386-3.89 5.1 5.1 0 013.849-1.434 4.743 4.743 0 013.624 1.381 5.212 5.212 0 011.3 3.729 5.259 5.259 0 01-1.386 3.83 5.02 5.02 0 01-3.773 1.424 4.934 4.934 0 01-3.652-1.352 4.987 4.987 0 01-1.348-3.688m2.425-.077a3.537 3.537 0 00.7 2.368 2.506 2.506 0 002.011.818 2.345 2.345 0 001.934-.818 3.783 3.783 0 00.664-2.425 3.651 3.651 0 00-.688-2.411 2.39 2.39 0 00-1.93-.813 2.439 2.439 0 00-1.987.852 3.707 3.707 0 00-.707 2.43m15.464-3.109H99.7V18.4h-2.359v-7.988h-1.655V8.507h1.655V7.13a3.423 3.423 0 011.015-2.555 3.561 3.561 0 012.6-1 5.807 5.807 0 01.751.043 2.993 2.993 0 01.577.13v2.016a2.422 2.422 0 00-.4-.164 2.107 2.107 0 00-.664-.1 1.407 1.407 0 00-1.126.457 2.017 2.017 0 00-.394 1.356v1.194h3.469V6.283l2.339-.712v2.936h2.358v1.906h-2.358v4.629a1.951 1.951 0 00.332 1.29 1.326 1.326 0 001.044.375 1.557 1.557 0 00.486-.1 2.294 2.294 0 00.5-.231V18.3a2.737 2.737 0 01-.736.231 5.029 5.029 0 01-1.015.106 2.887 2.887 0 01-2.209-.784 3.341 3.341 0 01-.736-2.363z" fill="#737373"/>
        <path fill="#f25022" d="M0 0h10.931v10.931H0z"/>
        <path fill="#7fba00" d="M12.069 0H23v10.931H12.069z"/>
        <path fill="#00a4ef" d="M0 12.069h10.931V23H0z"/>
        <path fill="#ffb900" d="M12.069 12.069H23V23H12.069z"/>
      </svg>
    </div>

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
        src={signInImage}
        alt={translate('signin.logo')}
      />
      <Text variant="xxLarge" styles={boldStyle} className="signinHeader">
        <FormattedMessage id="signin.header"
          defaultMessage="Welcome to Microsoft Teams"
          description="Header text"
        />
      </Text>

      <Text variant="medium" className="uTextCenter signinSubHeader">
        <FormattedMessage id="signin.subheader.lead"
          defaultMessage="Bring educators and students together with online meetings in Teams."
          description="Welcome message to sign in"
        />
      </Text>
      <Text variant="medium" className="uTextCenter signinSubHeader">
        <FormattedMessage id="signin.subheader.signin"
          defaultMessage="Sign in to Microsoft Teams using your school account to get started."
          description="Welcome message to sign in"
        />
      </Text>

      <PrimaryButton
        className="teamsButton"
        onClick={() => onSignIn()}
        ariaLabel={translate('signin.button.ariaLabel')}
      >
        <FormattedMessage id="signin.button"
         defaultMessage="Sign in"
         description="Sign in button for app"
        />
      </PrimaryButton>
    </Stack>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SigninPageComponent);

import { Middleware } from 'redux';
import { msalApp } from './msalApp'
import { 
    CHECK_FOR_SIGNEDIN_USER_COMMAND,
    OPEN_SIGNIN_DIALOG_COMMAND,
    SIGNIN_COMPLETE_EVENT,
    SigninCompleteEvent,
    SIGNOUT_COMMAND,
    SIGNOUT_COMPLETE_EVENT
} from './actions'
import { replace } from 'connected-react-router';

export function createAuthMiddleware() : Middleware
{
    return store => next => action => {
        console.log('ACTION', action);
        if (action.type === CHECK_FOR_SIGNEDIN_USER_COMMAND) {
            if (!msalApp.getAccount()) {
                store.dispatch(replace('/signin'));
            };
        }

        if (action.type === OPEN_SIGNIN_DIALOG_COMMAND) {
            msalApp
                .loginPopup({
                    scopes: [
                        'OnlineMeetings.ReadWrite'
                    ]
                })
                .then((response) => {
                    console.log('Login succeeded');
                    store.dispatch({
                        type: SIGNIN_COMPLETE_EVENT,
                        idToken: response.idToken
                    } as SigninCompleteEvent);
                })
                .catch((error) => {
                    console.log('Login failed:', error);
                });
        }

        if (action.type === SIGNIN_COMPLETE_EVENT) {
            store.dispatch(replace('/'));
        }

        if (action.type === SIGNOUT_COMMAND) {
            msalApp.logout();
            store.dispatch({
                type: SIGNOUT_COMPLETE_EVENT
            })
            console.log('logged out?');
        }

        next(action);
    }
}
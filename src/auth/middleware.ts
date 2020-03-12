import { Middleware } from "redux";
import { msalApp } from './msalApp'
import { OPEN_SIGNIN_DIALOG_COMMAND, SIGNIN_COMPLETE_EVENT, SigninCompleteEvent } from './actions'
import { push } from "connected-react-router";

export function createAuthMiddleware() : Middleware
{
    return store => next => action => {
        if (action.type == OPEN_SIGNIN_DIALOG_COMMAND) {
            // TODO: handle multiple logins
            msalApp
                .loginPopup({
                    scopes: [
                        'OnlineMeetings.ReadWrite'
                    ]
                })
                .then((response) => {
                    console.log('AUTH RESPONSE', response);
                    store.dispatch({
                        type: SIGNIN_COMPLETE_EVENT,
                        idToken: response.idToken
                    } as SigninCompleteEvent)
                })
                // TODO: handle auth failures
        }

        if (action.type == SIGNIN_COMPLETE_EVENT) {
            store.dispatch(push("/createLanding"))
        }

        next(action);
    }
}
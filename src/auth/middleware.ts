import { Middleware } from "redux";
import { msalApp } from './msalApp'
import { OPEN_SIGNIN_DIALOG_COMMAND, SIGNIN_COMPLETE_EVENT, SigninCompleteEvent } from './actions'
import { push } from "connected-react-router";

export function createAuthMiddleware() : Middleware
{
    return store => next => action => {
        console.log('ACTION', action);
        if (action.type == OPEN_SIGNIN_DIALOG_COMMAND) {
            msalApp
                .loginPopup({
                    scopes: [
                        'OnlineMeetings.ReadWrite'
                    ]
                })
                .then((response) => {
                    store.dispatch({
                        type: SIGNIN_COMPLETE_EVENT,
                        idToken: response.idToken
                    } as SigninCompleteEvent)
                })
        }

        if (action.type == SIGNIN_COMPLETE_EVENT) {
            console.log('Create event!', action);
            store.dispatch(push("/createEvent"))
        }
    }
}
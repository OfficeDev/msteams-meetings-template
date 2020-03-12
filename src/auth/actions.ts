import { IdToken } from "msal/lib-commonjs/IdToken"

export const OPEN_SIGNIN_DIALOG_COMMAND = "OpenSigninDialogCommand"
export interface OpenSigninDialogCommand {
    type: typeof OPEN_SIGNIN_DIALOG_COMMAND
}

export const SIGNIN_COMPLETE_EVENT = "SigninCompleteEvent"
export interface SigninCompleteEvent {
    type: typeof SIGNIN_COMPLETE_EVENT,
    idToken: IdToken
}

export type AuthAction = OpenSigninDialogCommand | SigninCompleteEvent
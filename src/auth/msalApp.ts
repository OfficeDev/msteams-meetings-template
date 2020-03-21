//shamelessly stolen from: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/samples/react-sample-app/src/auth-utils.js
import { UserAgentApplication } from "msal";

function isIE() {
    const ua = window.navigator.userAgent;
    const msie = ua.indexOf("MSIE ") > -1;
    const msie11 = ua.indexOf("Trident/") > -1;

    // If you as a developer are testing using Edge InPrivate mode, please add "isEdge" to the if check
    // const isEdge = ua.indexOf("Edge/") > -1;
    return msie || msie11;
};

export const msalApp = new UserAgentApplication({
    auth: {
        // clientId: "2005d3ee-3dc1-471d-9641-85d7886478a6", // PROD: TODO: move this into a cfg value from composition root 9cbc57a5-3f93-4444-863d-81a275c9ab7b
        clientId: "828302d0-de68-48d5-9ca2-ae666c27d8b2", // Dev
        // clientId: "eb3fa81b-eb63-46bf-8c01-cd54498d3c3a", // Local
        authority: "https://login.microsoftonline.com/common",
        validateAuthority: true,
        postLogoutRedirectUri: "http://localhost:3000",
        navigateToLoginRequestUrl: false
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: isIE()
    },
    system: {
        navigateFrameWait: 0
    }
});

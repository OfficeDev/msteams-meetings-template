import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

function isMsalRedirect()
{
    const msalParameters = ["access_token", "id_token", "code", "error", "error_description"];
    const hash = window.location.hash;
    return msalParameters.some(param => hash.indexOf(param) >= 0);
}

// hack to fix MSAL fighting with hash routing
if (!isMsalRedirect()) {
    ReactDOM.render(<App />, document.getElementById('root'));
}

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// hack to fix MSAL fighting with hash routing
if (window.location.hash.indexOf("token") < 0 || window.location.hash.indexOf("error_message") < 0) {
    ReactDOM.render(<App />, document.getElementById('root'));
}

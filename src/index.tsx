import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import App from './App';
import { getUserLocale, getMessages } from './localization/translate';

const userLocale = getUserLocale();

function isMsalRedirect() {
  const msalParameters = [
    'access_token',
    'id_token',
    'code',
    'error',
    'error_description'
  ];
  const hash = window.location.hash;
  return msalParameters.some(param => hash.indexOf(`${param}=`) >= 0);
}

// hack to fix MSAL fighting with hash routing
if (!isMsalRedirect()) {
  getMessages().then(messages => {
    ReactDOM.render(
      <IntlProvider locale={userLocale} messages={messages}>
        <App />
      </IntlProvider>,
      document.getElementById('root')
    );
  });
}

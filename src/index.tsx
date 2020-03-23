import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import locale_en from './translations/en.json';
import App from './App';

const data = {
  en: locale_en
};

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
  ReactDOM.render(
    <IntlProvider locale="en" messages={data['en']}>
      <App />
    </IntlProvider>,
    document.getElementById('root')
  );
}

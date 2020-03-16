import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

if (!window.location.pathname.endsWith('/signinComplete')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}

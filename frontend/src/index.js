import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Amplify from 'aws-amplify';
import config from './config.json';
import App from './App';
import reportWebVitals from './reportWebVitals';

Amplify.configure({
  Auth: {
    mandotorySignId: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

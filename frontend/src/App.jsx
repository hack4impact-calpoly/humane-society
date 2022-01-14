import React from 'react';
import woods from './imgs/signupLogo.svg';
import './css/signup.css';

function App() {
  return (
    <div className="App">
      <img src={woods} className="woods-logo" alt="woods" />
      <div className="account_header">Create an account</div>
    </div>
  );
}

export default App;

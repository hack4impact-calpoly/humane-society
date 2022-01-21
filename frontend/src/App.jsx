import React from 'react';
import woods from './imgs/signupLogo.svg';
import Signup from './components/signup';

function App() {
  return (
    <div className="App">
      <img src={woods} className="woods-logo" alt="woods" />
      {/* <div className="account_header">Create an account</div>
      <div className="mini_header">Name</div> */}
      <Signup />
    </div>
  );
}
export default App;

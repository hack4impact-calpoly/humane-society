/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import logo from './imgs/logo.svg';
import Signup from "signup.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './css/App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/signup">
          <Signup />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

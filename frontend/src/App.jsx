/* eslint-disable react/jsx-filename-extension */
import React from "react";
import logo from "./imgs/logo.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/login/login";

import "./css/App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupFormComponent from "./components/signup/signup-form-component";
import LoginComponent from './components/login/login-component';
export default function Root(props) {
  return (
      <Router>
    <Routes>
      <Route path="/login" element={<LoginComponent />}></Route>
      <Route path="/signup" element={<SignupFormComponent />}></Route>
    </Routes>
  </Router>
  )
}




import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Default from './components/home.js';
import MainPage from './components/Mainpage.js';
import HeightAndWeight from './components/HeightAndWeight.js';
import Home1 from './components/home1.js';
import Home from './components/home.js';
import About from './components/about.js';
import Contact from './components/contact.js';
import Service from './components/service.js';
import Login from './components/login.js';
import Options from './components/options.js';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Dashboard from './components/dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Default />} />
        <Route path="/HeightAndWeight" element={<HeightAndWeight />} />
        <Route path="/Home1" element={<Home1 />} /> 
        <Route path="/Home" element={<Home />} /> 
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Options" element={<Options />} />
        <Route path="/MainPage" element={<MainPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/password-reset" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

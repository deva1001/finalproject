import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../styles/style1.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [signupData, setSignupData] = useState({
    email: '',
    username: '',
    password: '',
  });

  const [loginData, setLoginData] = useState({
    emailOrUsername: '',
    password: '',
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const formType = queryParams.get('form');
    if (formType === 'signup') {
      toggleSignup();
    } else {
      toggleLogin();
    }
  }, [location.search]);

  const toggleSignup = () => {
    document.getElementById('login-toggle').style.backgroundColor = '#fff';
    document.getElementById('login-toggle').style.color = '#222';
    document.getElementById('signup-toggle').style.backgroundColor = '#57b846';
    document.getElementById('signup-toggle').style.color = '#fff';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
  };

  const toggleLogin = () => {
    document.getElementById('login-toggle').style.backgroundColor = '#57B846';
    document.getElementById('login-toggle').style.color = '#fff';
    document.getElementById('signup-toggle').style.backgroundColor = '#fff';
    document.getElementById('signup-toggle').style.color = '#222';
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // 🔥 Save the token to localStorage
        localStorage.setItem('token', data.token); // <- Assuming token is returned as `data.token`
  
        Swal.fire('Success!', 'Login successful', 'success');
        navigate('/HeightAndWeight');
      } else {
        Swal.fire('Error', data.message || 'Login failed', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Server error. Please try again later.', 'error');
    }
  };
  

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();
      if (response.ok) {
        Swal.fire('Success!', 'Registration successful. You can log in now.', 'success');
        toggleLogin(); // switch to login
      } else {
        Swal.fire('Error', data.message || 'Registration failed', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Server error. Please try again later.', 'error');
    }
  };

  return (
    <div>
      <div className="navbar">
        <Link to="/home1">
          <button className="back-button">&#8592; Back</button>
        </Link>
      </div>

      <div className="form-modal">
        <div className="form-toggle">
          <button id="login-toggle" onClick={toggleLogin}>log in</button>
          <button id="signup-toggle" onClick={toggleSignup}>sign up</button>
        </div>

        <div id="login-form">
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Enter email or username"
              value={loginData.emailOrUsername}
              onChange={(e) => setLoginData({ ...loginData, emailOrUsername: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Enter password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              required
            />
            <button type="submit" className="btn login">login</button>
            <p><Link to="/forgot-password">Forgotten password?</Link></p>
            <hr />
          </form>
        </div>

        <div id="signup-form">
          <form onSubmit={handleSignup}>
            <input
              type="email"
              placeholder="Enter your email"
              value={signupData.email}
              onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Choose username"
              value={signupData.username}
              onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Create password"
              value={signupData.password}
              onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
              required
            />
            <button type="submit" className="btn signup">create account</button>
            <p>
              Clicking <strong>create account</strong> means that you agree to our <a href="#">terms of services</a>.
            </p>
            <hr />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useEffect, useState } from 'react';
import '../styles/style1.css';

function Login() {
  const [isSignup, setIsSignup] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const formType = urlParams.get('form');
    if (formType === 'signup') {
      setIsSignup(true);
    } else {
      setIsSignup(false);
    }
  }, []);

  const handleLoginToggle = () => setIsSignup(false);
  const handleSignupToggle = () => setIsSignup(true);

  const goBack = () => {
    window.location.href = 'PreviousPage.html'; // Change if needed
  };

  return (
    <div>
      <div className="navbar">
        <button className="back-button" onClick={goBack}>&#8592; Back</button>
      </div>

      <div className="form-modal">
        <div className="form-toggle">
          <button
            id="login-toggle"
            onClick={handleLoginToggle}
            style={{
              backgroundColor: !isSignup ? '#57B846' : '#fff',
              color: !isSignup ? '#fff' : '#222',
            }}
          >
            log in
          </button>
          <button
            id="signup-toggle"
            onClick={handleSignupToggle}
            style={{
              backgroundColor: isSignup ? '#57B846' : '#fff',
              color: isSignup ? '#fff' : '#222',
            }}
          >
            sign up
          </button>
        </div>

        {isSignup ? (
          <div id="signup-form">
            <form>
              <input type="email" placeholder="Enter your email" />
              <input type="text" placeholder="Choose username" />
              <input type="password" placeholder="Create password" />
              <a href="HeightAndWeight.html">
                <button type="button" className="btn signup">create account</button>
              </a>
              <p>
                Clicking <strong>create account</strong> means that you agree to our{" "}
                <a href="javascript:void(0)">terms of services</a>.
              </p>
              <hr />
            </form>
          </div>
        ) : (
          <div id="login-form">
            <form>
              <input type="text" placeholder="Enter email or username" />
              <input type="password" placeholder="Enter password" />
              <a href="HeightAndWeight.html">
                <button type="button" className="btn login">login</button>
              </a>
              <p><a href="javascript:void(0)">Forgotten account</a></p>
              <hr />
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;

import React from 'react';
import '../styles/landing.css';
import { Link } from 'react-router-dom';

const Home1 = () => {
  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="nav-left">Calorie Counter</div>
        <div className="nav-right">
          <Link to="/home">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/service">Service</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </nav>

      <div className="main-content">
        <h1 className="welcome-message">Welcome to Your Personal Calorie Tracker</h1>
        <p className="sub-text">Track your calories, set your goals, and eat smartly.</p>

        <div className="image-container">
          <img src="/cycle.jpg" alt="Cycling" />
          <img src="/fruits.jpg" alt="Healthy Food" />
          <img src="/gym.jpeg" alt="Gym" />
        </div>

        <div className="button-box">
          <h2>Start Tracking Smartly</h2>
          <div className="buttons">
            <Link to="/login?form=login">
              <button className="btn login">Login</button>
            </Link>
            <Link to="/login?form=signup">
              <button className="btn signup">Sign Up</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-left">
            <h3>Calorie Counter</h3>
            <p>Track smart. Eat smart. Stay fit.</p>
          </div>
          <div className="footer-right">
            <Link to="/home">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/service">Service</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Calorie Counter. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home1;

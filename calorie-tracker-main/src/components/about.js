import React from 'react';
import '../styles/about.css';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <>
      <header>
        <div className="logo">
          {/* Add logo if needed */}
        </div>
        <nav>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/service">Services</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>
      </header>

      <section id="about" className="about dark-theme">
        <div className="about-content">
          <h2>About Calorie Counter</h2>
          <p>
            Easily track your daily calorie intake and stay on top of your nutrition goals with our powerful calorie counter. 
            Get detailed insights and personalized recommendations to fuel your healthy lifestyle.
          </p>
          <p>
            Easily log your meals and snacks to get a clear picture of your daily calorie consumption. 
            Understand where your calories are coming from and make adjustments to support your health goals.
          </p>
          <Link to="/service" className="btn">Explore Our Services</Link>
        </div>
        <div className="about-image">
          <img 
            src="https://img.freepik.com/free-photo/full-shot-woman-stretching-arm_23-2149036383.jpg?w=1380&t=st=1713339689~exp=1713340289~hmac=c696957c2706f690f6f371c535ee1c6cdcc3f6ba3a3025d938ee336943195d21" 
            alt="Stretching Woman" 
          />
        </div>
      </section>
    </>
  );
};

export default About;

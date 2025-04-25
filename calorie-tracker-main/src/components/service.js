import React from 'react';
import '../styles/about.css';
import { Link } from 'react-router-dom';

const Service = () => {
  return (
    <div>
      <header>
        <div className="logo"></div>
        <nav>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>
      </header>

      <section id="services" className="menu">
        <h2>Our Services</h2>
        <div className="menu-items">
          <div className="menu-item">
            <img
              src="https://img.freepik.com/free-photo/flay-lay-scale-weights_23-2148262188.jpg"
              alt="Food"
            />
            <h3>Caloric and Nutritional Tracking:</h3>
            <p>
              Calorie and nutritional tracking are central features of any calorie counter
              service. They help users monitor their food intake, manage their diet, and achieve
              health goals.
            </p>
          </div>

          <div className="menu-item">
            <img
              src="https://img.freepik.com/free-photo/athlete-running-training_342744-394.jpg"
              alt="Diet"
            />
            <h3>Personalized Diet</h3>
            <p>
              Personalized diet features in a calorie counter service can significantly enhance
              user experience by tailoring dietary recommendations and plans to individual needs
              and preferences.
            </p>
          </div>

          <div className="menu-item">
            <img
              src="https://img.freepik.com/premium-photo/using-smartp…-calories-concept-diet-management_585982-6317.jpg"
              alt="Interface"
            />
            <h3>User-Friendly Interface:</h3>
            <p>
              Creating a user-friendly interface for a calorie counter is crucial for ensuring
              that users can easily navigate the app and utilize its features to achieve their
              dietary and health goals.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Service;

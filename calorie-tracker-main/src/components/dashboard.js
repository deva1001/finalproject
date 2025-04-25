import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaAppleAlt,
  FaDrumstickBite,
  FaBreadSlice,
  FaPlus,
} from "react-icons/fa";
import "../styles/dashboard.css";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [foodLogs, setFoodLogs] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);

  const BASE_URL = process.env.REACT_APP_API_URL; // Update this if your backend URL is different

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");

      try {
        // Fetch user personal data
        const userResponse = await axios.get(`http://localhost:5000/api/userData`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(userResponse.data);

        // Fetch food log data
        const foodResponse = await axios.get(`http://localhost:5000/api/foodLog`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFoodLogs(foodResponse.data);
        const total = foodResponse.data.reduce((sum, log) => sum + log.calories, 0);
        setTotalCalories(total);

      } catch (error) {
        console.error("Error loading dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard">
      <div className="header">
        <div className="welcome">
          <h1>
            Welcome, <span style={{ color: "var(--accent)" }}>User</span>
          </h1>
          <p>Track your nutrition and stay healthy</p>
        </div>
        <div className="user-avatar">
          <div className="avatar-circle">U</div>
        </div>
      </div>

      {userData && (
        <div className="user-stats">
          <div className="stat-card"><h3>Email</h3><p>{userData.email || "user@example.com"}</p></div>
          <div className="stat-card"><h3>Height</h3><p>{userData.height} cm</p></div>
          <div className="stat-card"><h3>Weight</h3><p>{userData.weight} kg</p></div>
          <div className="stat-card"><h3>Goal</h3><p>{userData.goal}</p></div>
        </div>
      )}

      <div className="calorie-progress">
        <div className="progress-header">
          <h2>Daily Calories</h2>
          <h2>{totalCalories} / {userData?.DCI || 0} kcal</h2>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${(totalCalories / userData?.DCI) * 100}%`,
            }}
          ></div>
        </div>
        <div className="progress-details">
          <span>Consumed</span>
          <span>
            Remaining: {(userData?.DCI || 0) - totalCalories} kcal
          </span>
        </div>
      </div>

      <div className="food-log">
        <h2>Today's Food Log</h2>
        <div className="food-items">
          {foodLogs.length > 0 ? (
            foodLogs.map((item, idx) => (
              <div className="food-item" key={idx}>
                <span className="food-name">
                  {item.name.includes("chicken") ? (
                    <FaDrumstickBite style={{ marginRight: "0.5rem" }} />
                  ) : item.name.includes("rice") ? (
                    <FaBreadSlice style={{ marginRight: "0.5rem" }} />
                  ) : (
                    <FaAppleAlt style={{ marginRight: "0.5rem" }} />
                  )}
                  {item.name}
                </span>
                <span className="food-calories">{item.calories} kcal</span>
              </div>
            ))
          ) : (
            <p>No food logged yet today.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

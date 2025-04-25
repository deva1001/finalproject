import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../styles/height.css';

const HeightAndWeight = () => {
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    age: '',
    goal: '',
  });

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isEditable, setIsEditable] = useState(false); // Initially not editable
  const [isEditing, setIsEditing] = useState(false);   // Flag for update mode
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Fetch existing data on mount
  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      try {
        const response = await axios.get('http://localhost:5000/api/userData', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data) {
          setFormData({
            height: response.data.height || '',
            weight: response.data.weight || '',
            age: response.data.age || '',
            goal: response.data.goal || '',
          });
          setIsDataLoaded(true);
        }
      } catch (err) {
        console.error('No previous data found:', err.message);
        setIsDataLoaded(false);
      }
    };

    fetchData();
  }, [token]);

  const calculateDCI = () => {
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);
    const age = parseInt(formData.age);
    let DCI = 66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age);
    if (formData.goal === 'gain') DCI += 1000;
    if (formData.goal === 'loss') DCI -= 500;
    return DCI.toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const roundedDCI = calculateDCI();
    const fullData = { ...formData, DCI: roundedDCI };

    const result = await Swal.fire({
      title: isEditing ? 'Update your data?' : 'Submit your data?',
      html: `
        <b>Height:</b> ${formData.height} cm<br/>
        <b>Weight:</b> ${formData.weight} kg<br/>
        <b>Age:</b> ${formData.age}<br/>
        <b>Goal:</b> ${formData.goal === 'gain' ? 'Weight Gain' : 'Weight Loss'}<br/>
        <b>Calculated DCI:</b> ${roundedDCI} kcal
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, proceed',
    });

    if (!result.isConfirmed) return;

    try {
      await axios.post('http://localhost:5000/api/userData', fullData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      Swal.fire('Success!', isEditing ? 'Data updated.' : 'Data submitted again.', 'success');
      navigate('/MainPage');
    } catch (err) {
      console.error('Error:', err.message);
      Swal.fire('Error', err.response?.data?.message || err.message, 'error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleEdit = () => {
    setIsEditable(true);
    setIsEditing(true);
  };

  return (
    <div className="page-wrapper">
      <div className="navbar">
        <button onClick={() => navigate('/dashboard')} className="nav-btn">Dashboard</button>
        <button onClick={handleLogout} className="nav-btn">Logout</button>
      </div>

      <div className="main-container">
        <div className="left-panel">
          <h1>Welcome to Calorie Tracker</h1>
          <h2>Your data is <span className="safe-text">safe</span> with us.</h2>
          <p>We do not share your personal health data with anyone.</p>
          <img src="/images/safe-data.png" alt="Health Illustration" style={{ width: '80%', marginTop: '20px' }} />
        </div>

        <div className="form-panel">
          <h2>{isDataLoaded ? 'Your Information' : 'Enter Your Information'}</h2>

          {isDataLoaded && !isEditable && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ color: '#555' }}>Your data is already saved.</p>
              <button onClick={handleEdit} className="edit-btn">Edit</button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label>Height (cm):</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              disabled={!isEditable && isDataLoaded}
              required
            />

            <label>Weight (kg):</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              disabled={!isEditable && isDataLoaded}
              required
            />

            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              disabled={!isEditable && isDataLoaded}
              required
            />

            <label>Goal:</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="goal"
                  value="gain"
                  checked={formData.goal === 'gain'}
                  onChange={handleChange}
                  disabled={!isEditable && isDataLoaded}
                  required
                />
                Weight Gain
              </label>
              <label>
                <input
                  type="radio"
                  name="goal"
                  value="loss"
                  checked={formData.goal === 'loss'}
                  onChange={handleChange}
                  disabled={!isEditable && isDataLoaded}
                  required
                />
                Weight Loss
              </label>
            </div>

            {/* Button logic */}
            {isEditable && isDataLoaded ? (
              <button type="submit" className="submit-btn">Update Data</button>
            ) : (
              <button type="submit" className="submit-btn">Submit</button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default HeightAndWeight;

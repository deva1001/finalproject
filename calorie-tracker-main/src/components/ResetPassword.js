import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../styles/style1.css';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire('Success!', data.message, 'success');
        navigate('/login');
      } else {
        Swal.fire('Error', data.message || 'Reset failed', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Server error. Please try again later.', 'error');
    }
  };

  return (
    <div>
      <div className="navbar">
        <Link to="/login">
          <button className="back-button">&#8592; Back</button>
        </Link>
      </div>

      <div className="form-modal">
        <h2 style={{ textAlign: 'center' }}>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn login">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

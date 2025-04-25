import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import '../styles/ForgotPassword.css';


const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      Swal.fire('Success', res.data.message, 'success');
      setStep(2);
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'Failed to send OTP', 'error');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp });
      Swal.fire('Success', res.data.message, 'success');
      setToken(res.data.token);
      setStep(3);
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'OTP verification failed', 'error');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/reset-password', {
        token,
        newPassword
      });
      Swal.fire('Success', res.data.message, 'success');
      setStep(1);
      setEmail('');
      setOtp('');
      setNewPassword('');
      navigate('/login'); // Redirect to login after success
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'Reset failed', 'error');
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={
        step === 1 ? handleSendOtp : step === 2 ? handleVerifyOtp : handleResetPassword
      }>
        <h2 style={styles.title}>Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={step > 1}
          style={{ ...styles.input, width: '100%' }}
        />

        {step >= 2 && (
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            disabled={step > 2}
            style={styles.input}
          />
        )}

        {step === 3 && (
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={styles.input}
          />
        )}

<button type="submit" className="animated-button">
  {step === 1 ? 'Send OTP' : step === 2 ? 'Verify OTP' : 'Reset Password'}
</button>

      </form>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f9fafb'
  },
  form: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '450px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  title: {
    textAlign: 'center',
    fontSize: '1.7rem',
    marginBottom: '0.5rem',
    color: '#111827'
  },
  input: {
    padding: '12px 16px',
    fontSize: '1rem',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    width: '100%'
  },
  button: {
    padding: '12px',
    background: '#2563eb',
    color: 'white',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
    transform: 'scale(1)',
  },
};

export default ForgotPassword;

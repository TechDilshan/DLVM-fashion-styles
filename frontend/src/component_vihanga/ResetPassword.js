// src/components/ResetPassword.js
import React, { useState } from 'react';
import './CSS/resetPassword.css'; // Ensure to create this CSS file
import { useNavigate, useLocation } from 'react-router-dom';

const ResetPassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage('New password and confirmation do not match.');
      return;
    }

    // Simulate password reset process
    // In a real implementation, you would call your backend API
    setSuccessMessage('Password has been reset successfully!');
    setErrorMessage('');

    // Optionally navigate back to the profile page or another page
    setTimeout(() => {
      navigate('/profile'); // Redirecting to profile after a short delay
    }, 2000);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className="reset-password-dashboard">
      <div className="sidebar">
        <div className="profile-overview">
          <h3>Account Navigation</h3>
        </div>
        <ul className="nav-list">
          <li className={isActive('/profile')} onClick={() => navigate('/profile')}>Profile Info</li>
          <li className={isActive('/ShoppingCart')} onClick={() => navigate('/ShoppingCart')}>Wishlist</li>
          <li className={isActive('/reset-password')} onClick={() => navigate('/reset-password')}>Reset Password</li>
          <li onClick={() => { alert('Logged out'); navigate('/login'); }}>Logout</li>
        </ul>
      </div>

      <div className="reset-password-container">
        <h2>Reset Password</h2>
        <div className="form-group">
          <label>Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <div className="error">{errorMessage}</div>}
        {successMessage && <div className="success">{successMessage}</div>}
        <button onClick={handleResetPassword}>Reset Password</button>
      </div>
    </div>
  );
};

export default ResetPassword;

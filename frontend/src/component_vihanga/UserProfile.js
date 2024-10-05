// src/components/UserProfile.js
import React, { useState } from 'react';
import './CSS/userProfile.css';
import { useNavigate, useLocation } from 'react-router-dom';

const UserProfile = () => {
  const [user, setUser] = useState({
    firstName: 'Sample',
    lastName: 'Sample',
    email: 'Sample',
    phone: 'Sample',
    address: 'Sample',
    profilePic: 'https://via.placeholder.com/150' // Placeholder image for profile pic
  });

  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    alert('Logged out');
    navigate('/login');
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, profilePic: reader.result });
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className="profile-dashboard">
      <div className="sidebar">
        <div className="profile-overview">
          <img className="profile-pic" src={selectedImage ? URL.createObjectURL(selectedImage) : user.profilePic} alt="Profile" />
          {!isEditing && <h3>{user.firstName} {user.lastName}</h3>}
          {isEditing && (
            <div>
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
          )}
        </div>
        <ul className="nav-list">
          <li className={isActive('/profile')} onClick={() => navigate('/profile')}>Profile Info</li>
          <li className={isActive('/ShoppingCart')} onClick={() => navigate('/ShoppingCart')}>Wishlist</li>
          <li className={isActive('/reset-password')} onClick={() => navigate('/reset-password')}>Reset Password</li> {/* Added Reset Password */}
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>

      <div className="profile-details-section">
        <h2>Profile Information</h2>
        {!isEditing ? (
          <div className="profile-details">
            <div className="info-group">
              <label>First Name:</label>
              <p>{user.firstName}</p>
            </div>
            <div className="info-group">
              <label>Last Name:</label>
              <p>{user.lastName}</p>
            </div>
            <div className="info-group">
              <label>Email:</label>
              <p>{user.email}</p>
            </div>
            <div className="info-group">
              <label>Phone:</label>
              <p>{user.phone}</p>
            </div>
            <div className="info-group">
              <label>Address:</label>
              <p>{user.address}</p>
            </div>
            <button className="edit-btn" onClick={handleEditClick}>Edit Profile</button>
          </div>
        ) : (
          <div className="profile-details">
            <div className="info-group">
              <label>First Name:</label>
              <input
                type="text"
                value={user.firstName}
                onChange={(e) => setUser({ ...user, firstName: e.target.value })}
              />
            </div>
            <div className="info-group">
              <label>Last Name:</label>
              <input
                type="text"
                value={user.lastName}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              />
            </div>
            <div className="info-group">
              <label>Email:</label>
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className="info-group">
              <label>Phone:</label>
              <input
                type="text"
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
              />
            </div>
            <div className="info-group">
              <label>Address:</label>
              <input
                type="text"
                value={user.address}
                onChange={(e) => setUser({ ...user, address: e.target.value })}
              />
            </div>
            <button className="save-btn" onClick={handleSaveClick}>Save Changes</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;

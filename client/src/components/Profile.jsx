import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './Layout/authContext';
import { FaUser, FaEnvelope, FaLock, FaEdit, FaSave, FaEye, FaEyeSlash } from 'react-icons/fa';

function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/profile/${user._id}`);
        const { username, email } = response.data.user;
        setFormData({ username, email, password: '', confirmPassword: '' });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [user]);

  const handleEdit = () => {
    setEditing(!editing);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirming) {
      if (formData.password === formData.confirmPassword) {
        try {
          await axios.put(`http://localhost:8000/api/profile/${user._id}`, formData);
          setEditing(false);
          setConfirming(false);
          setSuccessMessage('Changes saved successfully');
          setTimeout(() => {
            setSuccessMessage('');
          }, 3000); // Clear success message after 3 seconds
        } catch (error) {
          console.error('Error updating user profile:', error);
        }
      } else {
        alert('Passwords do not match');
      }
    } else {
      setConfirming(true);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1 className="profile-name">
        <FaUser className="flag-icon" />
        Profile
        <div className="underline"></div>
      </h1>
      {successMessage && (
        <div className="alert alert-success alert-dismissible fade show mx-auto" style={{ width: "15%" }} role="alert">
          {successMessage}
          <button type="button" className="btn-close" onClick={() => setSuccessMessage('')} aria-label="Close"></button>
        </div>
      )}
      <div className="profile-container">
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="profile-field">
            <label className="profile-label">
              <FaUser className="profile-icon" />
              Username:
            </label>
            {editing ? (
              <div className="edit-field">
                <input type="text" name="username" value={formData.username} onChange={handleChange} className="profile-input" />
                <button type="submit" className="edit-btn">
                  <FaSave className="btn-icon" />
                </button>
              </div>
            ) : (
              <>
                <div className="profile-text">{formData.username}</div>
                <button type="button" className="edit-btn" onClick={handleEdit}>
                  <FaEdit className="btn-icon" />
                </button>
              </>
            )}
          </div>
          <div className="profile-field">
            <label className="profile-label">
              <FaEnvelope className="profile-icon" />
              Email:
            </label>
            {editing ? (
              <div className="edit-field">
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="profile-input" />
                <button type="submit" className="edit-btn">
                  <FaSave className="btn-icon" />
                </button>
              </div>
            ) : (
              <>
                <div className="profile-text">{formData.email}</div>
                <button type="button" className="edit-btn" onClick={handleEdit}>
                  <FaEdit className="btn-icon" />
                </button>
              </>
            )}
          </div>
          <div className="profile-field">
            <label className="profile-label">
              <FaLock className="profile-icon" />
              Password:
            </label>
            {editing ? (
              <div className="edit-field">
                <div className="password-input-container">
                  <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} className="profile-input password-input" />
                  <button type="button" className="password-toggle-btn" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
                {confirming && (
                  <div className="confirm-password">
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="profile-input" placeholder="Confirm Password" />
                  </div>
                )}
                <button type="submit" className="edit-btn">
                  {confirming ? 'Confirm' : 'Save'}
                </button>
              </div>
            ) : (
              <>
                <div className="profile-text">********</div>
                <button type="button" className="edit-btn" onClick={handleEdit}>
                  <FaEdit className="btn-icon" />
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default ProfilePage;

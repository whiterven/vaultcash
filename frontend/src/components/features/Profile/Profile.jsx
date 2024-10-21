// src/components/features/Profile/Profile.jsx
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { updateProfile, getProfile } from '../../../services/userService';
import Input from '../../common/Input';
import Button from '../../common/Button';
import './Profile.css';

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const profileData = await getProfile();
      setFormData(profileData);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProfile = await updateProfile(formData);
      setUser({ ...user, ...updatedProfile });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <form onSubmit={handleSubmit} className="profile-form">
        <Input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          label="First Name"
          disabled={!isEditing}
        />
        <Input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          label="Last Name"
          disabled={!isEditing}
        />
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          label="Email"
          disabled={!isEditing}
        />
        <Input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          label="Phone Number"
          disabled={!isEditing}
        />
        {isEditing ? (
          <Button type="submit">Save Changes</Button>
        ) : (
          <Button type="button" onClick={() => setIsEditing(true)}>Edit Profile</Button>
        )}
      </form>
    </div>
  );
};

export default Profile;
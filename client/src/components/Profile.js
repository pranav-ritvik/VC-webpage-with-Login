// src/components/Profile.js
import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="profile">
      <h2>Welcome, {user?.firstName}</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;

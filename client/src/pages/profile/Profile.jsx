import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector((store) => store.user);

  if (!user?.token) {
    return <Navigate to="/login" state={{ from: "/profile" }} />;
  }

  return <div style={{overflow:"hidden"}}>{JSON.stringify(user)}</div>;
};

export default Profile;

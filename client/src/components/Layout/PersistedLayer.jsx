import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { setUser } from "../../features/user/userSlice";
import Loading from "../common/Loading";

const PersistedLayer = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let user = sessionStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      dispatch(setUser(user));
    }
    setLoading(false);
  }, [dispatch]);

  if (loading) return <Loading text="loading" />;

  return <Outlet />;
};

export default PersistedLayer;

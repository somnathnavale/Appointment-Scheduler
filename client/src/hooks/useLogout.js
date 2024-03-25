import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem("user");
    dispatch(setUser({}));
    navigate("/login");
  }, [dispatch, navigate]);

  return handleLogout;
};

export default useLogout;

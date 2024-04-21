import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { resetUser } from "../features/user/userSlice";
import useRouting from "./useRouting";
import { Severity } from "../constants/common";
import { AppRoutes } from "../constants/routes";

const useLogout = () => {
  const dispatch = useDispatch();
  const { navigate } = useRouting();

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem("user");
    dispatch(resetUser({}));
    navigate(AppRoutes.LOGIN, {
      state: {
        navigate: true,
        message: "Logged out successfully",
        severity: Severity.SUCCESS,
      },
    });
  }, [dispatch, navigate]);

  return handleLogout;
};

export default useLogout;

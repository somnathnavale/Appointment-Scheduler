import React, { useCallback, useEffect, useState } from "react";
import { Severity, defaultAsyncInfo } from "../../constants/common";
import { useDispatch, useSelector } from "react-redux";
import { Action, defaultRegisterUserForm } from "../../constants/userConstants";
import useAxios from "../../hooks/useAxios";
import axiosPublic from "../../config/axios";
import { setUser } from "../../features/user/userSlice";
import { ErrorHandler } from "../../helpers/asyncHandler";
import { Endpoints } from "../../constants/endpoints";

export const useUserService = () => {
  const [asyncInfo, setAsyncInfo] = useState(defaultAsyncInfo);
  const [editToggle, setEditToggle] = useState(false);
  const [formData, setFormData] = useState(defaultRegisterUserForm);

  const { user } = useSelector((store) => store.user);
  const axios = useAxios(axiosPublic);
  const dispatch = useDispatch();

  useEffect(() => {
    setFormData((prev) => ({ ...prev, ...user }));
  }, [user]);

  const handleChange = useCallback(
    (e) =>
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value })),
    []
  );

  const handleUpdate = useCallback(
    async (e) => {
      e.preventDefault();
      if (!editToggle) {
        setEditToggle(true);
        return;
      }
      setAsyncInfo({
        ...defaultAsyncInfo,
        loading: true,
        message: "Updating user...",
        action: Action.UPDATE,
      });
      const updatedUserObj = {
        userId: formData.userId,
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
      };
      try {
        await axios.put(Endpoints.UPDATE_USER(formData.userId), updatedUserObj);
        setAsyncInfo({
          ...defaultAsyncInfo,
          message: "User updated successfully",
          severity: Severity.SUCCESS
        });
        dispatch(setUser(updatedUserObj));
      } catch (error) {
        console.log(error);
        const errObj = ErrorHandler(error);
        setAsyncInfo({
          ...defaultAsyncInfo,
          message: errObj.message,
          severity: Severity.ERROR
        });
      }
    },
    [formData, axios, dispatch, editToggle]
  );

  const handleUpdatePassword = useCallback(
    async (e) => {
      e.preventDefault();
      setAsyncInfo({
        ...defaultAsyncInfo,
        loading: true,
        message: "Changing user password...",
        action: Action.CHANGE_PASSWORD,
      });
      const updatedUserObj = { ...formData };
      try {
        await axios.put(
          Endpoints.CHANGE_PASSWORD(formData.userId),
          updatedUserObj
        );
        setAsyncInfo({
          ...defaultAsyncInfo,
          severity: Severity.SUCCESS,
          message: "Password changed successfully",
        });
        setFormData((prev) => ({ ...prev, password: "" }));
      } catch (error) {
        const errObj = ErrorHandler(error);
        setAsyncInfo({
          ...defaultAsyncInfo,
          message: errObj.message,
          severity: Severity.ERROR
        });
      }
    },
    [axios, formData]
  );

  const onClose = useCallback(() => setAsyncInfo(defaultAsyncInfo), []);

  return {
    asyncInfo,
    formData,
    editToggle,
    handleChange,
    handleUpdate,
    handleUpdatePassword,
    onClose,
  };
};

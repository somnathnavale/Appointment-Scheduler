import axiosPublic from "../config/axios";
import { Endpoints } from "../constants/endpoints";

const useAuthService = () => {
  const userRegistration = async (data) => {
    try {
      const response = axiosPublic.post(Endpoints.REGISTER_USER, data);
    } catch (error) {
      console.log(error);
    }
  };

  const userLogin = async (data) => {
    try {
      const response = axiosPublic.post(Endpoints.LOGIN, data);
    } catch (error) {
      console.log(error);
    }
  };

  return { userRegistration, userLogin };
};

export default useAuthService;

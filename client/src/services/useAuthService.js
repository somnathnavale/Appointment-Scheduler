import axiosPublic from "../config/axios";
import { ENDPOINTS } from '../constants/endpoints';

const useAuthService = () => {
    
    const userRegistration=async(data)=>{
        try {
            const response=axiosPublic.post(ENDPOINTS.registerUser,data);
        } catch (error) {
            console.log(error);
        }
    }

    const userLogin=async(data)=>{
        try {
            const response=axiosPublic.post(ENDPOINTS.login,data);
        } catch (error) {
            console.log(error);
        }
    }

  return {userRegistration,userLogin};
}

export default useAuthService
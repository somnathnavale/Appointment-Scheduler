import { useState, useEffect } from "react";
import useAxios from "./useAxios";
import axiosPublic from "../config/axios";
import { defaultAsyncInfo } from "../constants/common";

const useApi = (apiFunction) => {
  const [asyncInfo, setAsyncInfo] = useState(defaultAsyncInfo);
  const [data, setData] = useState([]);

  const axios = useAxios(axiosPublic);
  // console.log(apiFunction.arguments);
  useEffect(() => {
    const fetchData = async () => {
      // await apiFunction(setData, setAsyncInfo, axios);
    };

    fetchData();
  }, [apiFunction, axios]);

  return { data, asyncInfo };
};

export default useApi;

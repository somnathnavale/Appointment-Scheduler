import { useEffect } from 'react';
import { useSelector } from 'react-redux'

const useAxios = (axiosInstance) => {
    const {token} = useSelector(store=>store?.user?.user);
    
    useEffect(() => {
        const requestInterceptor = axiosInstance.interceptors.request.use(
          (config) => {
            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
          },
          (error) => {
            return Promise.reject(error);
          }
        );
    
        const responseInterceptor = axiosInstance.interceptors.response.use(
          (response) => response,
          async (error) => {
            if (error?.response && error.response.status === 401) {
            //   await dispatch(logout()).unwrap();
              return Promise.reject(error);
            }
            if (
              error?.response &&
              error?.response?.status === 403 &&
              !error.config?.prevRequest
            ) {
              error.config.prevRequest = true;
            //   await dispatch(generateToken()).unwrap().then(()=>{
            //     return Promise.reject(error);
            //   }).catch((e)=>{
            //     return Promise.reject(e);
            //   })
            }
            return Promise.reject(error);
          }
        );
    
        return () => {
          axiosInstance.interceptors.request.eject(requestInterceptor);
          axiosInstance.interceptors.response.eject(responseInterceptor);
        };
      }, [axiosInstance, token]);
    
      return axiosInstance;
  
}

export default useAxios
import { useNavigate, useLocation } from "react-router-dom";

const useRouting = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return {
    navigate,
    location,
  };
};

export default useRouting;

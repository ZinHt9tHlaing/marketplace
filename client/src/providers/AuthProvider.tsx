import { useEffect, type ReactNode } from "react";
import { checkCurrentUser } from "../api/auth/authAxios";
import { useNavigate } from "react-router-dom";

type ChildrenProps = {
  children: ReactNode | ReactNode[];
};

const AuthProvider = ({ children }: ChildrenProps) => {
  const navigate = useNavigate();

  const getCurrentUser = async () => {
    try {
      const response = await checkCurrentUser();
      if (response?.isSuccess) {
        // code
      } else {
        navigate("/");
        throw new Error(response.message);
      }
    } catch (error: any) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return <section>{children}</section>;
};

export default AuthProvider;

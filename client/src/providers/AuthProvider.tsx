import { useEffect, type ReactNode } from "react";
import { checkCurrentUser } from "../api/auth/authAxios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slice/userSlice";

type ChildrenProps = {
  children: ReactNode | ReactNode[];
};

type checkCurrentUserType = {
  isSuccess: boolean;
  message: string;
  userDoc: {
    username: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    _id: string;
  };
};

const AuthProvider = ({ children }: ChildrenProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getCurrentUser = async () => {
    try {
      const response: checkCurrentUserType = await checkCurrentUser();
      if (response?.isSuccess) {
        dispatch(setUser(response.userDoc));
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
